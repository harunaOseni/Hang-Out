import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginPage } from "./Components";
import { Application } from "./Components";
import { auth, database } from "./Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flex: "1",
    backgroundColor: "rgba(43, 72, 158, 0.946)",
    height: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [currentlySignedInUser, setCurrentlySignedInUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        database
          .collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("user already exists!");
            } else {
              const userDetails = {
                name: authUser.displayName,
                email: authUser.email,
                uid: authUser.uid,
                photoUrl: authUser.photoURL,
                displayName: authUser.displayName.split(" ")[0],
              };

              database
                .collection("users")
                .doc(authUser.uid)
                .set(userDetails)
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        setCurrentlySignedInUser(authUser.uid);
      } else {
        setCurrentlySignedInUser(null);
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
      {!currentlySignedInUser ? (
        <LoginPage />
      ) : (
        <div className={classes.root}>
          <Application userId={currentlySignedInUser} />
        </div>
      )}
      </Router>
    </div>
  );
}

export default App;
