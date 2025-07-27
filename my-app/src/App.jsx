import React, { useEffect, useState } from "react";

 const API_BASE_URL = window.location.hostname === 'localhost'
   ? "http://localhost:8000"
   : "http://backend:8000";

  console.log("API Base URL:", API_BASE_URL);

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
fetch(`${API_BASE_URL}/hello`)
  .then(res => res.json())
  .then(data => setMessage(data.message))
  .catch(console.error);
  }, []);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333"
    }}>
      {message || "Loading..."}
    </div>
  );
}

export default App;
