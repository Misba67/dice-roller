import React, { useState } from "react";
import axios from "axios";

function App() {
  const [dice, setDice] = useState(null);

  const rollDice = async () => {
    try {
      const response = await axios.get("http://localhost:4000/roll");
      setDice(response.data.number);
    } catch (error) {
      console.error("Error rolling dice:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎲 Online Dice Roller 🎲</h1>
      <button
        onClick={rollDice}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Roll Dice
      </button>
      {dice !== null && <h2>You rolled: {dice}</h2>}
    </div>
  );
}

export default App;


