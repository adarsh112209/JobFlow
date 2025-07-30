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
        navigate('/welcome');
      };

      const handleScanClick = () => {
        if (!userInfo.isGmailConnected) {
          alert('Please connect your Gmail account first.');
          return;
        }
        onScanGmail();
      };

      return (
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand"> <Logo /> <span>Job Companion</span> </Link>
          </div>
          <div className="navbar-center">
            {userInfo && (
              <div className="navbar-actions">
                <a href="http://localhost:5000/api/auth/google" className="btn btn-secondary">Connect Gmail</a>
                {!isScanning ? (
                  <button onClick={handleScanClick} className="btn btn-secondary" title={!userInfo.isGmailConnected ? 'Connect Gmail account to enable scanning' : ''} >
                    Scan Gmail
                  </button>
                ) : (
                  <button onClick={onStopScan} className="btn btn-danger">Stop Scan</button>
                )}
              </div>
            )}
          </div>
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
    