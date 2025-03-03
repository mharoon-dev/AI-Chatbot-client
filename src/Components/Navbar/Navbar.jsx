import React from 'react';
import './Navbar.css';

const Navbar = ({ onHamburgerClick, isSidebarOpen }) => {
  return (
    <div className={`navbar ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <div className="navbar-left">
        <button className="hamburger-button" onClick={onHamburgerClick}>
          <div className="hamburger-lines">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </button>
      </div>
      <div className="navbar-right">
        <div className="user-profile">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="user-avatar"
          />
          <span className="user-name">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;