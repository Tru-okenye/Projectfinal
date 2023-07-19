// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useGlobalContext } from './Context';
// import Outbox from './Outbox';

// const UpdateBusForm = () => {
//   const { id } = useParams(); // Get the bus ID from the URL
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     amount: '',
//     date: '',
//     time: '',
//     seats: '',
//     driver_name: '', // New field
//     number_plate: '', // New field
//      driver_phone_number: '', // New field
//   });

//   const { alert, showAlert } = useGlobalContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the bus data using the ID
//     fetch(`http://localhost:3000/api/buses/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setFormData(data);
//       })
//       .catch((error) => {
//         console.log('Error fetching bus:', error);
//       });
//   }, [id]);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform update operation using the form data
//     fetch(`http://localhost:3000/api/buses/${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Bus updated successfully:', data);
//         navigate('/'); // Navigate back to the previous page
//         showAlert(true, 'success', 'Bus updated successfully!');
//       })
//       .catch((error) => {
//         console.log('Error updating bus:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Update Bus</h2>
//       <form onSubmit={handleSubmit}>
//         {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
//         <label>
//           From:
//           <input
//             type="text"
//             name="from"
//             value={formData.from}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           To:
//           <input
//             type="text"
//             name="to"
//             value={formData.to}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Amount:
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Date:
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Time:
//           <input
//             type="text"
//             name="time"
//             value={formData.time}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Seats:
//           <input
//             type="number"
//             name="seats"
//             value={formData.seats}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Driver Name: {/* New field */}
//           <input
//             type="text"
//             name="driver_name"
//             value={formData.driver_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Number Plate: {/* New field */}
//           <input
//             type="text"
//             name="number_plate"
//             value={formData.number_plate}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//          <label>
//           Driver Phone Number: {/* New field */}
//           <input
//             type="text"
//             name="driver_phone_number"
//             value={formData.driver_phone_number}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Update Bus</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateBusForm;
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context';
import Outbox from './Outbox';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const UpdateBusForm = () => {
  const { id } = useParams(); // Get the bus ID from the URL
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    amount: '',
    date: '',
    time: '',
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

  useEffect(() => {
    // Fetch the bus data using the ID
    fetch(`http://localhost:3000/api/buses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.log('Error fetching bus:', error);
      });
  }, [id]);

  const handlePlaceChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform update operation using the form data
    fetch(`http://localhost:3000/api/buses/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bus updated successfully:', data);
        navigate('/'); // Navigate back to the previous page
        showAlert(true, 'success', 'Bus updated successfully!');
      })
      .catch((error) => {
        console.log('Error updating bus:', error);
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
      <h2>Update Bus</h2>
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
            <input type="text" name="to" value={formData.to} onChange={handleInputChange} />
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
        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default UpdateBusForm;

