import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [ws, setWS] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:6000");

    websocket.onopen = () => {
      console.log("Connected to the server");
    };

    websocket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
      const data = JSON.parse(event.data);
      setMessage(data.message);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    websocket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `Closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("Connection died");
      }
    };

    setWS(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleGetData = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("getData"); // Request the mock data when button is clicked.
    }
  };

  return (
    <div className="App">
      <h1>React WebSockets</h1>
      <button onClick={handleGetData}>Get Data from Backend</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
