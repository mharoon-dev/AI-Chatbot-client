import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar.jsx";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInitialView, setIsInitialView] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleSend = async () => {
    if (input.trim()) {
      setIsInitialView(false);
      // Add user message
      setMessages([
        ...messages,
        { id: messages.length + 1, text: input, type: "user" },
      ]);

      // Show "Generating..." message
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: "Generating...", type: "ai" },
      ]);

      setIsGenerating(true);

      try {
        // Call the API to get AI response
        const response = await axios.post("ai-chatbot-server-phi.vercel.app/generate", {
          prompt: input,
        });

        const data = response.data;

        if (data && data.response) {
          // Replace "Generating..." with AI response
          setMessages((prev) =>
            prev.map((msg) =>
              msg.text === "Generating..."
                ? { ...msg, text: data.response }
                : msg
            )
          );
        } else {
          console.error("Error fetching AI response:", data.error);
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
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose}
      />
      <div className={`chat-container ${!isSidebarOpen ? 'sidebar-closed' : ''} ${isInitialView ? 'initial-view' : ''}`}>
        <Navbar 
          onHamburgerClick={handleSidebarToggle} 
          isSidebarOpen={isSidebarOpen} 
        />
        {isInitialView ? (
          <div className="chatbot-text">AI-Chatbot</div>
        ) : (
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.type === "user" ? "user-message" : "ai-message"
                }`}
              >
                <div className="message-content">
                  <span className="message-type">
                    {message.type === "user" ? "You" : "AI"}
                  </span>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={`chat-input-container ${isInitialView ? 'centered' : ''}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="chat-send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
