import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './Context';
import Outbox from './Outbox';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { alert, showAlert } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { name, email, password },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully!', data);
        showAlert(true, 'success', 'Success! You have successfully signed up.');
        navigate('/signin');
      } else {
        const errorData = await response.json();
        showAlert(true, 'danger', errorData.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      showAlert(true, 'danger', 'Error signing up. Please try again later.');
    }
  };

  return (
    <div>
      <div className="form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
           {alert.show && <Outbox {...alert} removeAlert={showAlert} />}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password must be at least 6 characters</span>
          </div>

          <div>
            <button type="submit">Continue</button>
          </div>

          {alert.show && (
            <div className={`alert alert-${alert.type}`}>
              {alert.message}
            </div>
          )}
          {/* {showAlert(true, 'danger', 'email already exists!')} */}
        </form>

        <div>
          Already registered? <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
