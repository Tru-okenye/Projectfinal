import React from 'react';
import { useGlobalContext } from "./Context";

const Ticket = () => {
    const{payDetails} = useGlobalContext();
  if (!payDetails || payDetails.length === 0) {
    return <p>No ticket details available.</p>;
  }

  return (
    <div>
      <h2>Ticket Details</h2>
      {payDetails.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Mpesa Number: {item.number}</p>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
