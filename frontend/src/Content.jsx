import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useGlobalContext } from './Context';
import Outbox from './Outbox';

export const Content = () => {
  const [buses, setBuses] = useState([]);
  const { alert, showAlert } = useGlobalContext();

  useEffect(() => {
    fetch('http://localhost:3000/api/buses', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBuses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteBus = (id) => {
    fetch(`http://localhost:3000/api/buses/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        showAlert(true, 'success', 'Bus deleted successfully!');
        console.log('Bus deleted successfully:', data);
        // Refresh the bus list after deletion
        fetchBuses();
      })
      .catch((error) => {
        console.log('Error deleting bus:', error);
      });
  };

  const fetchBuses = () => {
    fetch('http://localhost:3000/api/buses')
      .then((response) => response.json())
      .then((data) => {
        setBuses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        {Array.isArray(buses) &&
          buses.map((bus) => (
            <div key={bus.id}>
              {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
              {/* Display bus details */}
              <p>{bus.from} to {bus.to}</p>
              <p>Amount: {bus.amount}</p>
              <p>Seats: {bus.seats}</p>
              <p>Time: {bus.time}</p>
              <p>Date: {bus.date}</p>
              <p>Driver Name: {bus.driver_name}</p> {/* Existing field */}
              <p>Number Plate: {bus.number_plate}</p> {/* Existing field */}
              <p>Driver Phone Number: {bus.driver_phone_number}</p> {/* New field */}
              <button onClick={() => deleteBus(bus.id)}>Delete</button>

              <button>
                <Link to={`/update/${bus.id}`}>Edit</Link>
              </button>
            </div>
          ))}
      </div>
      <button>
        <Link to="/create">Create Bus</Link>
      </button>
    </>
  );
};
