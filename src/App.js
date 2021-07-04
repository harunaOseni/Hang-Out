import React, { useState } from "react";
import "./App.css";
import { LoginPage } from "./Components";
import { useSelector } from "react-redux";
import { selectUser } from "./features/User/UserSlice";

function App() {
  const user = useSelector(selectUser);
  
  return (
    <div className="app">
      {!user ? <LoginPage /> : <h1> Welcome to HangOut Enjoy!</h1>}
    </div>
  );
}

export default App;
