import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import API from '../api';
import Logo from '../components/Logo';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await API.post('/api/auth/forgotpassword', { email });
      setMessage(data.message);
      setStage(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await API.put('/api/auth/resetpassword-otp', { email, otp, password });
      setMessage(data.message + ". Redirecting to login page in 3 seconds...");

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="logo-container"> <Logo /> <h1>JobFlow</h1> </div>
        <div className="form-container">
          {stage === 1 ? (
            <>
              <h2>Forgot Password</h2>
              <form onSubmit={handleRequestOtp}>
                <p className="form-link" style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  Enter your email to receive a password reset OTP.
                </p>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Send OTP</button>
                {message && <p className="form-message">{message}</p>}
              </form>
            </>
          ) : (
            <>
              <h2>Reset Password</h2>
              <form onSubmit={handleResetPassword}>
                <p className="form-link" style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  An OTP was sent to your email. Check your backend console to get it for testing.
                </p>
                <div className="form-group">
                  <label htmlFor="otp">OTP</label>
                  <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Reset Password</button>
                {message && <p className="form-message">{message}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;