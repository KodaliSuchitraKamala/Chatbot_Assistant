import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  onToggleSidebar: () => void;
  user?: { name: string; email: string } | null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, user, onSignOut }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="chatbot-header">
      <div className="header-content">
        <div className="header-left">
          <button className="hamburger-btn" onClick={onToggleSidebar} aria-label="Open sidebar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="header-title">Chatbot Assistant</h1>
        </div>

        <div className="header-right">
          <div className="user-profile">
            {user ? (
              <div className="profile-container">
                <div className="profile-avatar" title={user.name} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                  {getInitials(user.name)}
                </div>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-user-info">
                      <span className="profile-name">{user.name}</span>
                      <span className="profile-email">{user.email}</span>
                    </div>
                    <div className="profile-actions">
                      <button className="sign-out-btn" onClick={() => {
                        setIsProfileOpen(false);
                        onSignOut();
                      }}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="profile-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
