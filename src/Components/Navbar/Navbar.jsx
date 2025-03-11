import React from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = ({ onHamburgerClick, isSidebarOpen }) => {
  const user = useSelector((state) => state.user);
  // console.log(user);
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
            src={user?.user?.img || "/assets/icons/profile.png"} 
            alt="User" 
            className="user-avatar"
          />
          <span className="user-name">{user?.user?.name.split(" ")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;