import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://localhost:4000");

    socketIo.on("data", (data) => {
      setMessage(data.message);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleGetData = () => {
    if (socket) {
      socket.emit("getData");
    }
  };

  return (
    <div className="App">
      <h1>React with Socket.io</h1>
      <button onClick={handleGetData}>Get Data from Backend</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
