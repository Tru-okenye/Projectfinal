import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Mpesa = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentDetails } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const sendPaymentDetails = async () => {
      try {
        if (paymentDetails) {
          const { ...restPaymentDetails } = paymentDetails;

          const response = await fetch('http://localhost:3000/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...restPaymentDetails,
              seats: restPaymentDetails.seats.join(','),
            }),
          });

          if (response.ok) {
            initiateSTKPush(paymentDetails.phone); // Pass the user's phone number to initiate STK push
          } else {
            const errorResponse = await response.json();
            console.error('Failed to store payment details:', errorResponse);

            if (errorResponse.errors) {
              for (const key in errorResponse.errors) {
                console.error(`${key} validation error:`, errorResponse.errors[key]);
              }
            }

            setPaymentStatus('Payment failed. Please try again.');
          }
        }
      } catch (error) {
        console.error('Failed to store payment details:', error);
        setPaymentStatus('Payment failed. Please try again.');
      }
    };

    sendPaymentDetails();
  }, [paymentDetails]);

  const initiateSTKPush = async (phoneNumber) => {
    try {
      const response = await fetch('http://localhost:3000/api/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: paymentDetails.phone, amount: paymentDetails.amount }),
      });
       console.log('phoneNumber:', paymentDetails.phone);
    console.log('amount:', paymentDetails.amount);

      if (response.ok) {
        setPaymentStatus('STK push sent to your phone. Please enter your M-Pesa PIN to accept the payment.');
        // navigate('/success'); // Replace '/success' with the appropriate URL for the success page
      } else {
        throw new Error('Failed to initiate STK push');
      }
    } catch (error) {
      console.error('Failed to initiate STK push:', error);
      setPaymentStatus('Failed to initiate payment. Please try again later.');
    }
  };

  return (
    <main>
      <h3>Payment Details</h3>
      {paymentDetails && (
        <div>
          <div>
            <p>{paymentDetails.name}</p>
            <p>{paymentDetails.phone}</p>

            <h5>Payment Method</h5>
            <p>Pay with Mpesa</p>
            <p>An STK push will be sent to your mobile number. Before you proceed, please confirm you have enough money in your MPESA</p>

            {/* Display other payment details */}
          </div>
          <div>
            <h5>
              <small>
                {paymentDetails.from} - {paymentDetails.to}
              </small>
            </h5>
            <p>
              <small>{paymentDetails.date}</small>
            </p>
            <p>Departure</p>
            <p>
              <small>{paymentDetails.time}</small>
            </p>
          </div>

          <div>
            <p>One-Way Ticket</p>
            <p>
              <small>Selected seat(s) No: {paymentDetails.seats.join(', ')}</small>
            </p>
            <p>
              <strong>Total Ksh{paymentDetails.amount}</strong>
            </p>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: 'red', width: '16rem', border: 'none' }}
            onClick={() => initiateSTKPush(paymentDetails.phone)} // Pass the user's phone number to initiate STK push
          >
            PAY
          </button>
        </div>
      )}
      {/* Other Mpesa component content */}
    </main>
  );
};

export default Mpesa;
