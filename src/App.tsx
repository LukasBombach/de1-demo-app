import React, { useCallback } from "react";
import { useConnection, useSwitch, useCharacteristics } from "./hooks";
import "./App.css";

const { remote } = window.require("electron");
const { webContents } = remote.getCurrentWindow();

const App: React.FC = () => {
  const [isConnected, isConnecting, connect] = useConnection();
  const [isSwitchOn, setSwitchOn] = useSwitch();
  const [characteristics] = useCharacteristics("state", "water");

  if (isConnected) {
    console.log("state", characteristics.state);
    console.log("water", characteristics.water);
  }

  const connectBtnRef = useCallback(node => {
    if (node !== null) {
      const { left: x, top: y } = node.getBoundingClientRect();
      const button = "left";
      const o = { x, y, button };
      webContents.sendInputEvent(Object.assign({}, o, { type: "mouseDown" }));
      webContents.sendInputEvent(Object.assign({}, o, { type: "mouseUp" }));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{isSwitchOn ? "on" : "off"}</p>
        <p>{isConnected ? "connected" : "disconnected"}</p>
        <button onClick={() => setSwitchOn(!isSwitchOn)}>
          {!isSwitchOn ? "On" : "Off"}
        </button>
        <button
          ref={connectBtnRef}
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
