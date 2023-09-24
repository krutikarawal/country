// components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    // Clear authentication tokens or state here
    // For example, if you are using JWT tokens, you might clear the token from local storage:
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="container text-center ">
      <button
        onClick={handleLogout}
        className="btn btn-danger"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
