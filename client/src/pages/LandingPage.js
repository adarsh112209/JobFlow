import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-content">
        <div className="logo-container">
          <Logo />
          <h1>JobFlow</h1>
        </div>
        <p className="tagline">Your personal AI-powered assistant for navigating the job market.</p>
        <p className="description">
          Automatically track applications, manage deadlines, and gain insights from your job search, all in one place.
        </p>
        <div className="landing-actions">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;