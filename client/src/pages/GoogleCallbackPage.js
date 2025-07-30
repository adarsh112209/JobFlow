import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';

const GoogleCallbackPage = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      const decoded = jwtDecode(token);
      // In a real app, you'd fetch the user data from a /me endpoint
      // But for this project, we can create a placeholder userInfo object
      const userData = {
        token,
        _id: decoded.id,
        // name and email are not in this token, but AuthContext can handle it
      };
      login(userData);
      navigate('/', { replace: true }); // Redirect to the main dashboard
    } else {
      navigate('/login', { replace: true }); // Redirect to login if no token
    }
  }, [location, login, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallbackPage;