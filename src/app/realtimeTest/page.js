"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function Page() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:3001"); // WebSocket server

    socket.on("receive_message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessage("");
  };

  return (
    <div>
      <h1>🔴 Real-time Chat</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {chat.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
