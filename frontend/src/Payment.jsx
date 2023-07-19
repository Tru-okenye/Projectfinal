import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context';
import Outbox from './Outbox';

const Payment = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { alert, showAlert } = useGlobalContext();

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, amount, from, to, date, time } = location.state || {};

  const handleFormSubmit = (event) => {
    event.preventDefault();

    showAlert(true, 'success', 'Payment details stored successfully!');
    
    navigate('/mpesa', {
      state: {
        paymentDetails: {
          name,
          email,
          phone,
          seats: selectedSeats,
          amount,
          from,
          to,
          date,
          time,
            payment_phone_number: '0725669781',
        },
      },
    });
  };

  return (
    <div>
      {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
      <h2>Payment Details</h2>
      <p>From: {from}</p>
      <p>To: {to}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br></br>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br></br>

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Payment;
