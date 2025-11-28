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

      const userData = {
        token,
        _id: decoded.id,
      };
      login(userData);
      navigate('/', { replace: true });
    } else {
      navigate('/login', { replace: true }); 
    }
  }, [location, login, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallbackPage;