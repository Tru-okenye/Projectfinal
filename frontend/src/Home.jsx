import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ userLoggedIn, handleLogout }) => (
  <nav className="navbar">
    <div className="container-fluid bg-danger mt-0">
      <Link to="/" className="navbar-brand">Navbar</Link>
      <div className="">
        <ul className="navbar-nav me-auto d-flex">
          {!userLoggedIn && (
            <>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
                <Link to="/signin">SignIn</Link>
              </li>
            </>
          )}
          {userLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  </nav>
);

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.userLoggedIn) {
      // User is logged in based on the state from the SignIn component
      console.log('User is logged in');
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div>
      <Navbar userLoggedIn={location.state?.userLoggedIn} handleLogout={handleLogout} />
      <Outlet />
    </div>
  );
};

export default Home;
