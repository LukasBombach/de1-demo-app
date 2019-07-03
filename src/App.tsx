import React, { useState } from "react";
import DE1 from "de1";
import "./App.css";

const de1 = new DE1();

const App: React.FC = () => {
  de1.isConnected().then(issit => {
    console.log("DE1 is currently connected?", issit);
  });

  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        {connected ? "connected" : "disconnected"}
        <button
          disabled={connecting || connected}
          onClick={async () => {
            try {
              setConnecting(true);
              await de1.connect();
              setConnected(await de1.isConnected());
              setConnecting(false);
            } catch (error) {
              setConnecting(false);
              console.error(error);
            }
          }}
        >
          {connecting
            ? "Connecting..."
            : connected
            ? "Connected"
            : "Connect to DE1"}
        </button>{" "}
      </header>
    </div>
  );
};

export default App;
