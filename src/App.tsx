import React from "react";
import DE1 from "de1";
import "./App.css";

const de1 = new DE1();

const App: React.FC = () => {
  de1.isConnected().then(issit => {
    console.log("DE1 is currently connected?", issit);
  });

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            try {
              console.log("Connecting to DE1...");
              await de1.connect();
              console.log("connected!");
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Connect to DE1
        </button>
      </header>
    </div>
  );
};

export default App;
