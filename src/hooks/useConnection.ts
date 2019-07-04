import { useState } from "react";
import de1 from "de1";

export default function useConnection(): [
  boolean,
  boolean,
  () => Promise<void>
] {
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
