import React, { useState, useEffect } from 'react';

const ApplicationForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    status: 'Wishlist',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.companyName || '',
        role: initialData.role || '',
        status: initialData.status || 'Wishlist',
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <div className="form-group">
        <label>Company Name</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Role</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Wishlist">Wishlist</option>
          <option value="Applied">Applied</option>
          <option value="Online Assessment">Online Assessment</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="form-group">
        <label>Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ApplicationForm;