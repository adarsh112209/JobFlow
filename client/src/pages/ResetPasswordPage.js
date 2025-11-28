import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resettoken } = useParams(); 
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await axios.put(`/api/auth/resetpassword/${resettoken}`, { password });
      setMessage(data.message + ' Redirecting to login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="logo-container"> <Logo /> <h1>Job Tracker</h1> </div>
        <div className="form-container">
          <h2>Enter New Password</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn">Reset Password</button>
            {message && <p className="form-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;