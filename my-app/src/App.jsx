import React, { useState } from "react";
import namer from "color-namer";
import { RandomColorButton, Color } from "./components/RandomColorButton";


function App() {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("white");
  const [colorHistory, setColorHistory] = useState([]);

  const generateRandomColor = () => {
    const hex = "#" + Math.floor(Math.random() * 16777215).toString(16);
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
      setColorHistory((prev) => [colorObj, ...prev.slice(0, 9)]);
    }
  };

  // When clicking a history color, we mark it as 'passedIn' so it doesn’t add again
  const handleHistoryClick = (colorObj) => {
    changeColor({ ...colorObj, passedIn: true });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>
        Background color: <span>{colorName}</span>
      </h1>
      <button onClick={() => changeColor()}>Random color</button>

      <h3>History:</h3>
      <ul style={{ listStyle: "none", padding: 0, maxWidth: 200, margin: "1rem auto" }}>
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
  );
}

export default App;
