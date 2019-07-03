import React, { useState, useEffect } from "react";
import de1 from "de1";
import "./App.css";

const { REACT_APP_HUE_API, REACT_APP_HUE_SECRET } = process.env;
const switchApi = `${REACT_APP_HUE_API}${REACT_APP_HUE_SECRET}/lights/12`;

function useDe1Connection(): [boolean, boolean, () => Promise<void>] {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const connect = async () => {
    try {
      setIsConnecting(true);
      await de1.connect();
      setIsConnecting(false);
      const newIsConnected = await de1.isConnected();
      setIsConnected(newIsConnected);
    } catch (error) {
      console.error(error);
    }
  };
  return [isConnected, isConnecting, connect];
}

function useCoffeeSwitch(
  initialValue = false
): [boolean, (on: boolean) => Promise<void>] {
  const [isSwitchOn, setIsSwitchOn] = useState(initialValue);

  const getSwitchState = async () => {
    try {
      const response = await fetch(switchApi);
      const { state } = await response.json();
      setIsSwitchOn(state.on);
    } catch (error) {
      console.error(error);
    }
  };

  const setSwitchState = async (on: boolean) => {
    try {
      await fetch(`${switchApi}/state`, {
        method: "PUT",
        body: JSON.stringify({ on })
      });
      getSwitchState();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSwitchState();
  }, []);

  return [isSwitchOn, setSwitchState];
}

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
