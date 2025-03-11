import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setChatId } from "../../redux/slices/chat";

const Sidebar = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const chatHistory = useSelector((state) => state?.chat?.chatHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(chatHistory);
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

  return (
    <div className={`sidebar ${!isOpen ? "closed" : ""}`}>
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
          <li className="activeChat" onClick={() => handleChatClick(null)}>
            New Chat
          </li>
          {chatHistory?.length > 0 &&
            chatHistory
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
  );
};

export default Sidebar;
