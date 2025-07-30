import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ProfileDropdown = ({ userInfo, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false); // Changed to false to close
      }
    };
    if (isOpen) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    }
  }, [isOpen]);

  const firstName = userInfo ? userInfo.name.split(' ')[0] : '';

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="profile-trigger">
        <div className="user-icon">
          <svg xmlns="http://www.w.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </div>
        <span>{firstName}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            {/* Replace <a> tags with <Link> */}
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/change-password">Password</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li className="divider"></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;