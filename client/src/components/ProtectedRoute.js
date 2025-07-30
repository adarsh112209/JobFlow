import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useContext(AuthContext);

  if (!userInfo) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/welcome" />;
  }

  return children; // If user is logged in, show the protected component
};

export default ProtectedRoute;