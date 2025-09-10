import React from "react";
import markdownit from "markdown-it";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa"; // icons
import "./App.css"; // import CSS file

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]); // store conversation
  const inputText = React.useRef(null);
  const md = markdownit();

  const fetcherFunc = async (promptText) => {
    if (!promptText) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: promptText }]);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:9090/api/chat", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
        }),
        method: "POST",
      });

      const jsonData = md.render(await response.text());

      // Add bot response
      setMessages((prev) => [...prev, { sender: "bot", text: jsonData }]);
    } catch (error) {
      console.warn(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong, please try again." },
      ]);
    } finally {
      setLoading(false);
      inputText.current.value = "";
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Personal Chatbot</h1>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <span className="icon">
              {msg.sender === "user" ? <FaUser /> : <FaRobot />}
            </span>
            <div
              className="message-text"
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}

        {loading && <p className="loading">⏳ Bot is typing...</p>}
      </div>

      <div className="chat-input">
        <input
          ref={inputText}
          type="text"
          placeholder="Type your message..."
          onKeyDown={(e) =>
            e.key === "Enter" && fetcherFunc(inputText.current.value)
          }
        />
        <button onClick={() => fetcherFunc(inputText.current.value)}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default App;

// UI_changes
// New changes
