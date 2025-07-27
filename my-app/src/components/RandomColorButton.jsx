// src/components/RandomColorButton.jsx

import React from "react";

function RandomColorButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Random color
    </button>
  );
}

class Color {
  constructor(hex, name) {
    this.hex = hex;
    this.name = name;
  }
}

export {RandomColorButton, Color};
