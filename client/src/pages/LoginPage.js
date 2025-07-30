import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import Logo from '../components/Logo';

const LoginPage = () => {
  // ... (logic remains the same)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password';
      toast.error(message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="logo-container">
          <Logo />
          {/* --- NAME UPDATED HERE --- */}
          <h1>JobFlow</h1>
        </div>
        <div className="form-container">
          <h2>Welcome Back!</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn">Login</button>
            <p className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></p>
            <p className="form-link">Don't have an account? <Link to="/register">Register</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;