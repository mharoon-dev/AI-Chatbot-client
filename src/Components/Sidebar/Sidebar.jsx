import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      {isMobile && (
        <div className="close-button" onClick={onClose}>
            <div className="hamburger-lines">
            <span className="linesidebar"></span>
            <span className="linesidebar"></span>
            <span className="linesidebar"></span>
          </div>
        </div>
      )}
      <div className="chat-history">
        <ul>
          <li className='activeChat'>New Chat</li>
          <li>JS overview</li>
          <li>Capital of Pakistan</li>
          <li>About Deepseek</li>
          <li>Capital of USA</li>
          <li>Capital of UK</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
