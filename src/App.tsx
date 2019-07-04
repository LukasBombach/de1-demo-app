import React from "react";
import { useConnection, useSwitch, useCharacteristics } from "./hooks";
import "./App.css";

const App: React.FC = () => {
  const [connectionState, connect] = useConnection(true);
  const [isSwitchOn, setSwitchOn] = useSwitch();
  const [characteristics] = useCharacteristics("state", "water");

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";

  if (isConnected) {
    console.log("state", characteristics.state);
    console.log("water", characteristics.water);
  }

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
          onMouseDown={() => connect()}
        >
          {!isConnected ? "Connect" : "Connected"}
        </button>
      </header>
    </div>
  );
};

export default App;
