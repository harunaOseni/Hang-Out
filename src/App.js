import React, { useState } from "react";
import "./App.css";
import { LoginPage } from "./Components";

function App() {
  const [user, setUser] = useState(false);
  return (
    <div className="app">
      {!user ? <LoginPage /> : <h1> Welcome to HangOut Enjoy!</h1>}
    </div>
  );
}

export default App;
