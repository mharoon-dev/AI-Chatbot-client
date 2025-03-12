import React, { useState } from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import  { logoutUser } from '../../redux/slices/user.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onHamburgerClick, isSidebarOpen }) => {
  const user = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const removeToken = localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
      <div className="user-profile" onClick={toggleDropdown}>
          <img 
            src={user?.user?.img || "/assets/icons/profile.png"} 
            alt="User" 
            className="user-avatar"
          />
          <span className="user-name">{user?.user?.name.split(" ")[0]}</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </div>
             
              <div className="dropdown-item logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </div>
            </div>
          )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;