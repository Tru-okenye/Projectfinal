// Booking.jsx
import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Booked from './Booked';
import { Map } from './Map';

const libraries = ["places"];
const Booking = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [availableBuses, setAvailableBuses] = useState([]);
  const navigate = useNavigate();

  const autocompleteFromRef = useRef(null);
  const autocompleteToRef = useRef(null);

 const { isLoaded, loadError } = useJsApiLoader({
     googleMapsApiKey: "AIzaSyCivwKyWPJekwIy1H7y4EHkmE3FgC005Ng",
    libraries: libraries,
  });

  if (!isLoaded) {
  return <div>Loading...</div>;
}
  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }
  const handlePlaceChange = (value, field) => {
    if (field === 'from') {
      setFrom(value);
    } else if (field === 'to') {
      setTo(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      console.log('Please provide the source, destination, and date.');
      return;
    }

    // Make an API request to check for available buses
    fetch(`http://localhost:3000/api/buses?from=${from}&to=${to}&date=${date}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setAvailableBuses(data);
          navigate('/booked', { state: { 
            filteredBuses: data,
             origin: from, // Pass the origin value
            destination: to // Pass the destination value
          
          } }); // Pass the data as the state object
        } else {
          console.log("We don't currently serve those routes.");
        }
      })
      .catch(error => {
        console.log('Error checking for available buses:', error);
      });
  };



  return (
    <div>
      <h2>Booking</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">
          From:
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteFromRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange(autocompleteFromRef.current.getPlace().formatted_address, 'from')}
          >
            <input
              type="text"
              id="from"
              name="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter origin"
            />
          </Autocomplete>
        </label>
        <br />

        <label htmlFor="to">
          To:
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteToRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange(autocompleteToRef.current.getPlace().formatted_address, 'to')}
          >
            <input
              type="text"
              id="to"
              name="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter destination"
            />
          </Autocomplete>
        </label>
        <br />

        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />

        <button type="submit">Search Buses</button>
      </form>

      <Map />
      <Booked />
    </div>
  );
};

export default Booking;