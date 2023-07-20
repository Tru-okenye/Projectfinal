import React from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');

  // Use the "email" value to verify the user's email

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Verifying email: {email}</p>
      <p>hello</p>
      {/* ...verification logic */}
    </div>
  );
};

export default VerifyEmail;
