import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ onScanGmail, onStopScan, onOpenAddModal, isScanning }) => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <Logo />
          <span>JobFlow</span>
        </Link>

        {/* --- ACTION BUTTONS MOVED HERE --- */}
        {userInfo && (
          <div className="navbar-actions">
            <a href="http://localhost:5000/api/auth/google" className="btn btn-secondary">Connect Gmail</a>
            {!isScanning ? (
              <button onClick={onScanGmail} className="btn btn-secondary">Scan Gmail</button>
            ) : (
              <button onClick={onStopScan} className="btn btn-danger">Stop Scan</button>
            )}
          </div>
        )}
      </div>

      {/* --- RIGHT SECTION REMAINS THE SAME --- */}
      {userInfo && (
        <div className="navbar-right">
          <button className="btn" onClick={onOpenAddModal}>+ Add Application</button>
          <ProfileDropdown userInfo={userInfo} onLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;