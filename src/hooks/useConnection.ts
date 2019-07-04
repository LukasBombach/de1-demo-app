import { useState, useEffect } from "react";
import de1 from "de1";

const { remote } = window.require("electron");
const { webContents } = remote.getCurrentWindow();

export type ConnectionState = "disconnected" | "connected" | "connecting";

type DispatchSetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type ConnectFunction = () => Promise<void>;

export default function useConnection(
  initialState = false
): [ConnectionState, ConnectFunction] {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const connect = getConnectFn(setIsConnecting, setIsConnected);
  useEffect(() => {
    if (initialState === true && !isConnecting) {
      const div = document.createElement("div");
      const event = { x: 0, y: 0, button: "left" };
      div.style.position = "fixed";
      div.style.top = "0";
      div.style.left = "0";
      div.style.width = "1px";
      div.style.height = "1px";
      document.body.appendChild(div);
      div.addEventListener("mousedown", () => {
        connect();
        document.body.removeChild(div);
      });
      webContents.sendInputEvent(
        Object.assign({}, event, { type: "mouseDown" })
      );
      webContents.sendInputEvent(Object.assign({}, event, { type: "mouseUp" }));
    }
  }, [connect, initialState, isConnecting]);
  const connectionState = getConnectionState(isConnecting, isConnected);
  return [connectionState, connect];
}

function getConnectFn(
  setIsConnecting: DispatchSetBoolean,
  setIsConnected: DispatchSetBoolean
): ConnectFunction {
  return async () => {
    try {
      console.log("Trying to connect to DE1...");
      setIsConnecting(true);
      await de1.connect();
      setIsConnecting(false);
      const newIsConnected = await de1.isConnected();
      setIsConnected(newIsConnected);
      console.log("Connection successful");
    } catch (error) {
      console.error(error.message, error);
      console.log("Connection failed");
    }
  };
}

function getConnectionState(
  isConnecting: boolean,
  isConnected: boolean
): ConnectionState {
  return isConnecting
    ? "connecting"
    : isConnected
    ? "connected"
    : "disconnected";
}
