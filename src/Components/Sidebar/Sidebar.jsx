import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setChatId } from "../../redux/slices/chat";

const Sidebar = ({ isOpen, setIsOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const chatHistory = useSelector((state) => state?.chat?.chatHistory);
  const dispatch = useDispatch();

  const [filteredChats, setFilteredChats] = useState(chatHistory);

  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);

  useEffect(() => {
    setFilteredChats(chatHistory);
  }, [chatHistory]);

  const handleChatClick = (chatId) => {
    dispatch(setChatId(chatId));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();
    const filteredChats = chatHistory.filter((chat) =>
      chat?.messages[0]?.question?.toLowerCase().includes(searchTerm)
    );
    setFilteredChats(filteredChats);
  };

  const checkScreenSize = () => {
    const mobile = window.innerWidth <= 576;
    if (mobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    checkScreenSize();
  }, []);

  return (
    <>

    <div className={`sidebar ${!isOpen ? "closed" : ""}`}>
      {isMobile && (
        <div className="sidebar-header">
          <h2 className="sidebar-title">AI Chatbot</h2>
          <div className="close-button" onClick={onClose}>
            <div className="hamburger-lines">
              <span className="linesidebar"></span>
            <span className="linesidebar"></span>
            <span className="linesidebar"></span>
          </div>
          </div>
          </div>
      )}
      <div className="searchbar-container">
        <div className="searchbar-wrapper">
          <input
            type="text"
            placeholder="Search chats..."
            className="searchbar"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      <div className="chat-history">
          <h2 className="chat-history-title">Chats</h2>
        <ul>
          <li className="activeChat" onClick={() => handleChatClick(null)}>
            New Chat
          </li>
          {filteredChats?.length > 0 &&
            filteredChats
            ?.slice()
              ?.reverse()
              ?.map((chat) => (
                <li onClick={() => handleChatClick(chat?._id)} key={chat._id}>
                {chat?.messages[0]?.question?.slice(0, 20)}{" "}
                {chat?.messages[0]?.question?.length > 20 && "....."}{" "}
              </li>
            ))}
        </ul>
      </div>
    </div>
            </>
  );
};

export default Sidebar;
