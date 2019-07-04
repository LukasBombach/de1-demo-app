import { useState, useEffect } from "react";
import de1 from "de1";
import inMouseDownEvent from "./inMouseDownEvent";

export type ConnectionState = "disconnected" | "connected" | "connecting";
type DispatchSetBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type ConnectFunction = () => Promise<void>;

export default function useConnection(
  initialState = false
): [ConnectionState, ConnectFunction] {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const connect = getConnectFn(setIsConnecting, setIsConnected);
  const connectionState = getConnectionState(isConnecting, isConnected);

  useEffect(() => {
    if (initialState && !isConnecting && !isConnected)
      inMouseDownEvent(connect);
  }, []);

  return [connectionState, connect];
}

function getConnectFn(
  setIsConnecting: DispatchSetBoolean,
  setIsConnected: DispatchSetBoolean
): ConnectFunction {
  return async () => {
    try {
      setIsConnecting(true);
      await de1.connect();
      setIsConnecting(false);
      setIsConnected(await de1.isConnected());
    } catch (error) {
      console.error(error.message, error);
    }
  };
}

function getConnectionState(
  isConnecting: boolean,
  isConnected: boolean
): ConnectionState {
  if (isConnecting) return "connecting";
  if (isConnected) return "connected";
  return "disconnected";
}
