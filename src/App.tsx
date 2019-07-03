import React, { useCallback } from "react";
import de1 from "de1";
import { useDe1Connection, useCoffeeSwitch } from "./hooks";
import "./App.css";

const { remote } = window.require("electron");
const { webContents } = remote.getCurrentWindow();

const App: React.FC = () => {
  const [isConnected, isConnecting, connect] = useDe1Connection();
  const [isSwitchOn, setSwitchOn] = useCoffeeSwitch();

  if (isConnected) {
    (async () => {
      try {
        console.log("querying state");
        const state = await de1.get("state");
        const water = await de1.get("water");
        console.log("state", state);
        console.log("water", water);
      } catch (error) {
        console.error(error);
      }
    })();
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
