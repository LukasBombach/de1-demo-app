import { useState, useEffect } from "react";

const { REACT_APP_HUE_API, REACT_APP_HUE_SECRET } = process.env;
const switchApi = `${REACT_APP_HUE_API}${REACT_APP_HUE_SECRET}/lights/12`;

export default function useDe1Switch(
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
