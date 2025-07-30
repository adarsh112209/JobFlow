import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

const SettingsPage = () => {
  const [theme, setTheme] = useState('dark');
  const { userInfo } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.put('/api/users/profile/settings', { theme }, config);
      toast.success(data.message);
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };
  
  return (
    <div>
      <Navbar />
      {/* --- ADDED CENTERING WRAPPER --- */}
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="form-container">
            <h2>Settings</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
              </div>
              <button type="submit" className="btn">Save Settings</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
