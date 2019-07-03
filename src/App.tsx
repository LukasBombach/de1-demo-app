import React from "react";
import { useDe1Connection, useCoffeeSwitch } from "./hooks";
import "./App.css";

const App: React.FC = () => {
  const [isConnected, isConnecting, connect] = useDe1Connection();
  const [isSwitchOn, setSwitchOn] = useCoffeeSwitch();

  return (
    <div className="App">
      <header className="App-header">
        <p>{isSwitchOn ? "on" : "off"}</p>
        <p>{isConnected ? "connected" : "disconnected"}</p>
        <button onClick={() => setSwitchOn(!isSwitchOn)}>
          {!isSwitchOn ? "On" : "Off"}
        </button>
        <button
          disabled={isConnected || isConnecting}
          onClick={() => connect()}
        >
          {!isConnected ? "Connect" : "Connected"}
        </button>
      </header>
    </div>
  );
};

export default App;
