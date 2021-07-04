import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { googleProvider, auth } from "../../Firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, logAuthUser } from "../../features/User/UserSlice";
import { selectUser } from "../../features/User/UserSlice";

// Note: makeStyles is a function that allows you to use
// JavaScript to style your components

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    boxShadow: "0 0 15px rgb(7 15 63 / 33%)",
    backgroundColor: "rgb(45,74,164, 0.85)",
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#d9d9d9",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
}));

function LoginPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentlySignedInUser = useSelector(selectUser);
  console.log("currentlySignedInUser", currentlySignedInUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          setAuthUser({
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logAuthUser());
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUserSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((authUser) => {
        console.log("User currently signed in: ", authUser);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <img
          src={
            "https://emojigraph.org/media/facebook/call-me-hand-medium-dark-skin-tone_1f919-1f3fe.png"
          }
          className={classes.mainImg}
          alt="signup img"
        />
        <Typography variant="h4" style={{ paddingTop: "15px" }}>
          Wanna Hangout ?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={handleUserSignIn}
        >
          Sign In With Google
        </Button>
      </div>
    </Container>
  );
}

export default LoginPage;