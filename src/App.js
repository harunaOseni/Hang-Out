import React, { useState } from "react";
import "./App.css";
import { LoginPage } from "./Components";
import { useSelector } from "react-redux";
import { selectUser } from "./features/User/UserSlice";
import { Application } from "./Components";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="app">
      {!user ? <LoginPage /> : <Application currentlySignedInUser={user} />}
    </div>
  );
}

export default App;
