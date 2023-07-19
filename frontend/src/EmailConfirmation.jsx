// import React, { useState } from 'react';

// function EmailConfirmation() {
//   const [confirmationToken, setConfirmationToken] = useState('');

//  const handleConfirmation = () => {
//     fetch('/api/confirm-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token: confirmationToken }),
//     })
//       .then(response => {
//         if (response.ok) {
//           // Handle successful confirmation
//           console.log('Email confirmed successfully');
//         } else {
//           // Handle confirmation error
//           console.error('Error confirming email');
//         }
//       })
//       .catch(error => {
//         // Handle network error
//         console.error('Error confirming email', error);
//       });
//   };

//   return (
//     <div className="container">
//       <h2>Email Confirmation</h2>
//       <div className="confirmation-message">
//         <p>Please click the confirmation link or enter the confirmation token to confirm your email:</p>
//       </div>
//       <a href="#" className="confirmation-link">Confirmation Link</a>
//       <input
//         type="text"
//         className="confirmation-input"
//         placeholder="Confirmation Token"
//         value={confirmationToken}
//         onChange={(e) => setConfirmationToken(e.target.value)}
//       />
//       <button className="confirmation-button" onClick={handleConfirmation}>
//         Confirm
//       </button>
//     </div>
//   );
// }

// export default EmailConfirmation;
