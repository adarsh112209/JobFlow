import React, { useState, useContext } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await API.put('/api/users/profile/change-password', { currentPassword, newPassword }, config);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  return (
    <div>
      <Navbar />
      {/* --- ADDED CENTERING WRAPPER --- */}
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="form-container">
            <h2>Change Password</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <p className="password-criteria">
                  6-15 characters, with one uppercase, one lowercase, one number, and one special character.
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
