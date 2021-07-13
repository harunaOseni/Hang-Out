import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { database } from "../../Firebase/firebase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    textAlign: "center",
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    color: "whiteSmoke",
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "1.8em",
  },
  hangout__media: {
    height: "200px",
    objectFit: "contain",
  },

  hangouts: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    height: "calc(100vh - 185px)",
    overflowY: "scroll",
  },
  hangout__cardContent: {
    backgroundColor: "rgba(43, 72, 158, 0.99) ",
    textAlign: "center",
    color: "#fff9",
  },
  hangout__card: {
    boxShadow:
      "0px 3px 4px -1px rgb(0 0 0 / 17%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  hangout__name: {
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
        textAlign: "left",
    }
  }, 
}));

function Home() {
  const classes = useStyles();
  const [hangouts, setHangouts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    database.collection("hangouts").onSnapshot((snapshot) => {
      setHangouts(
        snapshot.docs.map((hangout) => ({
          hangoutName: hangout.data().hangoutName,
          id: hangout.id,
          hangoutPicture: hangout.data().hangoutPicture,
        }))
      );
    });
  }, []);

  function handleHangoutRoute(id) {
    history.push(`/hangout/${id}`);
  }
  return (
    <div>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heading}>
            Welcome To Hangout
          </Typography>
          <Typography variant="h1" className={classes.subheading}>
            Join live conversations, hangout and have fun!
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.hangouts} spacing={2}>
        {hangouts.map((hangout) => (
          <Grid item key={hangout.id} xs={6} md={4} className={classes.hangout}>
            <Card className={classes.hangout__card}>
              <CardActionArea onClick={() => handleHangoutRoute(hangout.id)}>
                <CardMedia
                  className={classes.hangout__media}
                  image={hangout.hangoutPicture}
                  title={hangout.hangoutName}
                />
                <CardContent className={classes.hangout__cardContent}>
                  <Typography variant="h6" className={classes.hangout__name}>
                    {hangout.hangoutName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
