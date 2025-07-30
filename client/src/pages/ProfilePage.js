import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2'; // Import the new component
import 'react-phone-input-2/lib/style.css'; // Import the component's CSS
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CountrySelector from '../components/CountrySelector';
import CustomDateInput from '../components/CustomDateInput';

const ProfilePage = () => {
  const { userInfo } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: null, phone: '', nationality: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.get('/api/users/profile', config);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          dob: data.dob ? new Date(data.dob) : null,
          phone: data.phone || '',
          nationality: data.nationality || '',
        });
      } catch (error) {
        toast.error('Failed to fetch profile data.');
      }
    };
    if (userInfo) {
      fetchUserProfile();
    }
  }, [userInfo]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhoneChange = (phoneValue) => {
    setFormData({ ...formData, phone: phoneValue });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
      await API.put('/api/users/profile', formData, config);
      toast.success('Profile Updated Successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-content-centered">
        <div className="auth-form-wrapper">
          <div className="form-container">
            <h2>Edit Profile</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={onChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <DatePicker selected={formData.dob} onChange={handleDateChange} dateFormat="yyyy-MM-dd" customInput={<CustomDateInput placeholder="YYYY-MM-DD" />} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={40} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                {/* --- USE THE NEW PHONE INPUT HERE --- */}
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  inputProps={{ name: 'phone' }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <CountrySelector name="nationality" value={formData.nationality} onChange={onChange} />
              </div>
              <button type="submit" className="btn">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;