import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginPage, Application, Home, HangoutLiveChat } from "./Components";
import { auth, database } from "./Firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flex: "1",
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
            <main className={classes.content}>
              <div className={classes.toolbar} style={{}} />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hangout/:id" component={HangoutLiveChat} />
              </Switch>
            </main>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
