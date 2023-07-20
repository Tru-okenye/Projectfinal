
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Map } from './Map';
import Seats from './Seats';

const Booked = () => {
  const location = useLocation();
  const { filteredBuses, origin, destination } = location.state || {};
  const navigate = useNavigate();

  if (!filteredBuses || filteredBuses.length === 0) {
    return <p>No available buses found.</p>;
  }

  const handleSelectSeat = (bus) => {
    navigate(`/seats/${bus.seats}`, {
      state: {
        selectedBus: {
          from: bus.from,
          to: bus.to,
          date: bus.date,
          time: bus.time,
          Driver: bus.driver_name,
          NoPlate: bus.number_plate,
          PhoneNo: bus.driver_phone_number
        },
        amount: bus.amount,
      },
    });
  };

  return (
    <div>
      <h2>Available Buses:</h2>
      {filteredBuses.map((bus) => (
        <div key={bus.id}>
          <p>From: {bus.from}</p>
          <p>To: {bus.to}</p>
          <p>Date: {bus.date}</p>
          <p>Time: {bus.time}</p>
          <p>Available Seats: {bus.seats}</p>
          <p>Price: {bus.amount}</p>
         <p>Driver: {bus.driver_name}</p> 
         <p> NoPlate: {bus.number_plate}</p>
         
          <button type="button" onClick={() => handleSelectSeat(bus)}>
            Select Seat
          </button>
        </div>
      ))}
      {origin && destination && (
        <Map origin={origin} destination={destination} />
      )}
    </div>
  );
};

export default Booked;
