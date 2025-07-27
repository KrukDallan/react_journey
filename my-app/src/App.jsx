import React, { useState, useEffect } from "react";
import namer from "color-namer";
import { RandomColorButton, Color } from "./components/RandomColorButton";
import "./App.css";

function App() {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("white");
  const [colorHistory, setColorHistory] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("colorHistory");
    if (stored) {
      try {
        return JSON.parse(stored).map(
          (c) => new Color(c.hex, c.name)
        );
      } catch (err) {
        console.error("Error loading from localStorage:", err);
      }
    }
    return [];
  });

  const generateRandomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");;
    const name = namer(hex).ntc[0].name;
    return { hex, name };
  };

  const changeColor = (colorObj = generateRandomColor()) => {
    const { hex, name } = colorObj;

    document.body.style.backgroundColor = hex;
    setColor(hex);
    setColorName(name);

    // Only add to history if colorObj came from generateRandomColor (i.e. no param passed)
    if (!colorObj.passedIn) {
      setColorHistory((prev) => [colorObj, ...prev]);
    }
  };

  // When clicking a history color, we mark it as 'passedIn' so it doesn’t add again
  const handleHistoryClick = (colorObj) => {
    changeColor({ ...colorObj, passedIn: true });
  };

  // Save to localStorage every time colorHistory changes
  useEffect(() => {
    localStorage.setItem("colorHistory", JSON.stringify(colorHistory));
  }, [colorHistory]);

  function resetHistory() {
    setColorHistory([]);
    localStorage.removeItem("colorHistory");
    colorHistory.length = 0; // Clear the array
  }

  return (
    <div className="app-container">
      <div className="header" style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>
          Background color: <span>{colorName}</span>
        </h1>
        <div className="buttons-container">
        <button className="color-button" onClick={() => changeColor()}>Random color</button>
        <button className="color-button" onClick={() => resetHistory()}>Reset History</button>
        </div>
      </div>
      <div className="history-container" style={{ textAlign: "center", marginTop: "2rem" }}>
        <h3>History:</h3>
        <ul className="color-history" style={{ listStyle: "none", padding: 0, maxWidth: 200, margin: "1rem auto" }}>
          {colorHistory.map((c, i) => (
            <li
              key={i}
              onClick={() => handleHistoryClick(c)}
              style={{
                backgroundColor: c.hex,
                color: "#fff",
                padding: "0.5rem",
                marginBottom: "0.25rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {c.name} ({c.hex})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
