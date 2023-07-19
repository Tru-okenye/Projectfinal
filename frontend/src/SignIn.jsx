import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Outbox from './Outbox';
import { useGlobalContext } from './Context';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const { alert, showAlert } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform the login logic here, based on your backend API or authentication service
    // Once the login is successful, update the userLoggedIn state in the SignIn component
    // For this example, I'm assuming the login is successful
    setUserLoggedIn(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/users?email=${email}&password=${password}`);

      if (response.ok) {
        const data = await response.json();
        if (data) {
          showAlert(true, 'success', 'You have logged in.');
          setTimeout(() => {
            handleLogin(); // Call the handleLogin function after successful login
            navigate('/booking', { state: { userLoggedIn: true } });
          }, 2000); // Navigate after 2 seconds
         
        } else {
          showAlert(true, 'danger', 'Invalid email or password.');
        }
      } else if (response.status === 401) {
        showAlert(true, 'danger', 'Invalid email or password.');
      } else {
        showAlert(true, 'danger', 'An error occurred. Please try again.');
      }
    } catch (error) {
      showAlert(true, 'danger', 'An error occurred. Please try again.');
    }
  };
  return (
    <>
      <div className='form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
          <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit'>Submit</button><br></br>
         
          <br />
          <span>
            Don't have an account? <Link to='/signup'>SignUp</Link>
          </span>
        </form>
      </div>
    </>
  );
};
// J0s7AtHczs88RwLEFkfGbfRGL51cPRxd-CONSUMER KEY
  // yppP8V6RgVbhUAgl-consumer secret
  // Safaricom999!*! -initial password
  // bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919 -passkey
  // "CheckoutRequestID": "ws_CO_20062023170901870799784529",
export default SignIn;
