import React, { useState } from "react";
import DE1 from "de1";
import "./App.css";

const de1 = new DE1();

function useDe1Connection(): [boolean, () => Promise<void>] {
  const [isConnected, setIsConnected] = useState(false);
  const connect = async () => {
    await de1.connect();
    const newIsConnected = await de1.isConnected();
    setIsConnected(newIsConnected);
  };
  return [isConnected, connect];
}

// function useDe1State() {}

const App: React.FC = () => {
  const [isConnected, connect] = useDe1Connection();

  console.log("Is DE1 currently connected?", isConnected);

  return (
    <div className="App">
      <header className="App-header">
        <p>{isConnected ? "connected" : "disconnected"}</p>
        <button
          disabled={isConnected}
          onClick={async () => {
            try {
              await connect();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {isConnected ? "Connected" : "Connect to DE1"}
        </button>{" "}
      </header>
    </div>
  );
};

export default App;
