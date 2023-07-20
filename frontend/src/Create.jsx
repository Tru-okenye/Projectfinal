
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context';
import Outbox from './Outbox';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const CreateBusForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    amount: '',
    date: '',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/(:\d{2}| [AP]M)$/, ''), // Set default time value
    seats: '',
    driver_name: '', // New field
    number_plate: '', // New field
    driver_phone_number: '', // New field
  });

  const { alert, showAlert } = useGlobalContext();
  const navigate = useNavigate();

  const autocompleteFromRef = useRef(null);
  const autocompleteToRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
   googleMapsApiKey: "AIzaSyCivwKyWPJekwIy1H7y4EHkmE3FgC005Ng",
    libraries: libraries,
  });

  const handlePlaceChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  for (const field in formData) {
    if (formData[field] === '') {
      showAlert(true, 'danger', 'Please fill in all fields!');
      return;
    }
  }

  // Perform create operation using the form data
  fetch('http://localhost:3000/api/buses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error && data.error.includes('Bus with the same number plate already exists')) {
        showAlert(true, 'danger', 'Bus with the same number plate already exists');
      } else {
        showAlert(true, 'success', 'New bus created!');
        console.log('Bus created successfully:', data);
        navigate('/content'); // Navigate back to the previous page
      }
    })
    .catch((error) => {
      console.log('Error creating bus:', error);
    });
};


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <div>
      <h2>Create Bus</h2>
      <form onSubmit={handleSubmit}>
        {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
        <label>
          From:
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteFromRef.current = autocomplete)}
            onPlaceChanged={() =>
              handlePlaceChange(autocompleteFromRef.current.getPlace().formatted_address, 'from')
            }
          >
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="Enter origin"
            />
          </Autocomplete>
        </label>
        <br />
        <label>
          To:
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteToRef.current = autocomplete)}
            onPlaceChanged={() =>
              handlePlaceChange(autocompleteToRef.current.getPlace().formatted_address, 'to')
            }
          >
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="Enter destination"
            />
          </Autocomplete>
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Seats:
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Driver Name: {/* New field */}
          <input
            type="text"
            name="driver_name"
            value={formData.driver_name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Number Plate: {/* New field */}
          <input
            type="text"
            name="number_plate"
            value={formData.number_plate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Driver Phone Number: {/* New field */}
          <input
            type="text"
            name="driver_phone_number"
            value={formData.driver_phone_number}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Create Bus</button>
      </form>
    </div>
  );
};

export default CreateBusForm;
