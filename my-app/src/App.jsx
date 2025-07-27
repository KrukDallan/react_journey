// src/App.jsx

import React, { useState } from "react";
import {RandomColorButton, Color} from "./components/RandomColorButton";
import namer from "color-namer";
import "./App.css"; // Assuming you have some styles in App.css

function App() {
  const [color, setColor] = useState("#ffffff");
  const [colorName, setColorName] = useState("White");
  const [colorHistory, setColorHistory] = useState([]);


  const changeColor = () => {
    const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = newColor;
    setColor(newColor);
    const name = namer(newColor).ntc[0].name; // you could use .pantone or .html too
    setColorName(name);

    setColorHistory(prev => [newColor, ...prev.slice(0, 9)]);
  };

  return (
    <div>
      <h1>Background color: {color}</h1>
      <h2>Color name: {colorName}</h2>
      <RandomColorButton onClick={changeColor} />
      <h3>History:</h3>
      <ul className="color-history">
        {colorHistory.map((c, index) => (
          <li
            key={index}
            style={{
              backgroundColor: c,
              color: "#fff",
              padding: "0.5rem",
              marginBottom: "0.25rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => {
              document.body.style.backgroundColor = c;
              setColor(c);
              const name = namer(c).ntc[0].name;
              setColorName(name);
            }}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
