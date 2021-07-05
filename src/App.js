import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginPage } from "./Components";
import { Application } from "./Components";
//import auth from firebase
import { auth } from "./Firebase/firebase";

function App() {
  const [currentlySignedInUser, setCurrentlySignedInUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentlySignedInUser(authUser);
        console.log(authUser);
      } else {
        setCurrentlySignedInUser(null);
      }
    });
  });

  return (
    <div className="app">
      {!currentlySignedInUser ? (
        <LoginPage />
      ) : (
        <Application currentlySignedInUser={currentlySignedInUser} />
      )}
    </div>
  );
}

export default App;
