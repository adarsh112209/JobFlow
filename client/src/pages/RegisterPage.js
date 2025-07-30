import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import PhoneInput from 'react-phone-input-2'; // Import the new component
import 'react-phone-input-2/lib/style.css'; // Import the component's CSS
import AuthContext from '../context/AuthContext';
import Logo from '../components/Logo';
import CountrySelector from '../components/CountrySelector';
import CustomDateInput from '../components/CustomDateInput';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: null, phone: '', nationality: '', email: '', password: '',
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { firstName, lastName, dob, phone, nationality, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Special handler for the phone input
  const handlePhoneChange = (phoneValue) => {
    setFormData({ ...formData, phone: phoneValue });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/register', formData);
      login(data);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-wrapper">
        <div className="logo-container"> <Logo /> <h1>Job Companion</h1> </div>
        <div className="form-container">
          <h2>Create Your Account</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={firstName} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <DatePicker selected={dob} onChange={handleDateChange} dateFormat="yyyy-MM-dd" customInput={<CustomDateInput placeholder="YYYY-MM-DD" />} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={40} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              {/* --- USE THE NEW PHONE INPUT HERE --- */}
              <PhoneInput
                country={'in'} // Default country is India
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{ name: 'phone' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <CountrySelector name="nationality" value={nationality} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={onChange} required />
              <p className="password-criteria">6-15 characters, with one uppercase, one lowercase, one number, and one special character.</p>
            </div>
            <button type="submit" className="btn">Register</button>
            <p className="form-link">Already have an account? <Link to="/login">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;