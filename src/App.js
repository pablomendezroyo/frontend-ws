import React, { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const rws = new ReconnectingWebSocket("ws://localhost:6000");

    rws.addEventListener("open", () => {
      console.log("Connected to the server");
      rws.send("getData"); // Request the mock data once connected.
    });

    rws.addEventListener("message", (event) => {
      console.log("Message from server: ", event.data);
      const data = JSON.parse(event.data);
      setMessage(data.message);
    });

    return () => {
      rws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>React WebSockets</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
