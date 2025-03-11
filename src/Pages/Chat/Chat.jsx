import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";
import "./Chat.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { api } from "../../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatHistory,
  setChatId,
  updateChatHistory,
  updateChatHistoryMessages,
} from "../../redux/slices/chat.jsx";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInitialView, setIsInitialView] = useState(true);
  const user = useSelector((state) => state.user.user);
  const chatId = useSelector((state) => state?.chat?.chatId);
  const chatHistory = useSelector((state) => state?.chat?.chatHistory);
  const navigate = useNavigate();
  // console.log(chatHistory);
  const dispatch = useDispatch();
  // console.log(chatId);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user]);

  useEffect(() => {
    if (chatId) {
      console.log(chatHistory);
      const chat = chatHistory?.find((chat) => chat._id === chatId);
      setMessages(chat?.messages);
      setIsInitialView(false);
      // dispatch(setChatId(chatId));
    } else {
      setIsInitialView(true);
    }
  }, [chatId]);

  useEffect(() => {
    console.log(chatId);
  }, [chatId]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSend = async () => {
    if (input.trim()) {
      setIsInitialView(false);

      try {
        setMessages([
          ...messages,
          { question: input, answer: "Generating..." },
        ]);
        setIsGenerating(true);

        const response = await api.post("/generate", {
          prompt: input,
        });
        console.log(response);

        response && setIsGenerating(false);

        if (chatId) {
          console.log("chatId is available");
          dispatch(
            updateChatHistoryMessages({
              chatId: chatId,
              messages: [
                ...messages,
                { question: input, answer: response?.data?.response },
              ],
            })
          );
          const token = JSON.parse(localStorage.getItem("token"));

          const res = await api.put(
            `/api/chat/update/${chatId}`,
            {
              question: input,
              answer: response?.data?.response,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res);

        } else {
          console.log("chatId is not available");
          const token = JSON.parse(localStorage.getItem("token"));

          const res = await api.post(
            "/api/chat/save",
            {
              question: input,
              answer: response?.data?.response,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res);
          dispatch(setChatId(res?.data?.data?._id));
          dispatch(updateChatHistory(res?.data?.data));
          console.log(res);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setIsGenerating(false);
      }

      setInput("");
    }
  };

  useEffect(() => {
    if (isGenerating) {
      // Logic to handle any side effects while generating
    }
  }, [isGenerating]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <div
        className={`chat-container ${!isSidebarOpen ? "sidebar-closed" : ""} ${
          isInitialView ? "initial-view" : ""
        }`}
      >
        <Navbar
          onHamburgerClick={handleSidebarToggle}
          isSidebarOpen={isSidebarOpen}
        />
        {isInitialView ? (
          <div className="chatbot-text">AI-Chatbot</div>
        ) : (
          <div className="chat-messages">
            {messages?.length > 0 &&
              messages?.map((message, index) => (
                <div key={index}>
                  <div className={`chat-message ${"user-message"}`}>
                    <div className="message-content">{message?.question}</div>
                  </div>
                  <div className={`chat-message ${"ai-message"}`}>
                    <div className="message-content">{message?.answer}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
        <div
          className={`chat-input-container ${isInitialView ? "centered" : ""}`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="chat-send-button">
            <img
              src="/assets/icons/top-arrow.png"
              width={18}
              height={18}
              alt="send"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
