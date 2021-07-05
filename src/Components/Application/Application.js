import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { CssBaseline } from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { Grid } from "@material-ui/core";
import { auth } from "../../Firebase/firebase";

const drawerWidth = 240;

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  sideToolBar: {
    display: "flex",
    width: drawerWidth,
    backgroundColor: "#14265E",
    color: "#dcddde",
  },
  sideToolBarImage: {
    height: "32px",
  },
  sideToolBarText: {
    letterSpacing: "0.2em",
    fontWeight: "900",
    alignItems: "center",
  },
  avatarGrid: {
    paddingTop: "20px",
    paddingLeft: "5px",
    paddingBottom: "20px",
    color: "#fff",
  },
  avatarIcon: {
    display: "flex",
    paddingLeft: "15px",
  },
  avatarDisplayName: {
    alignSelf: "center",
    paddingLeft: "10px",
    fontWeight: "600",
  },
  avatarName: {
    fontSize: "1em",
    paddingLeft: "12px",
    paddingTop: "8px",
  },
}));

function Application({ currentlySignedInUser }) {
  const classes = useStyles();
  const handleSignOut = () => {
    auth.signOut();
  };
  const drawer = currentlySignedInUser && (
    <div style={{maxWidth:"290px", backgroundColor: "#14265E", height: "100vh"}}>
      <Toolbar className={classes.sideToolBar}>
        <img
          src={
            "https://emojigraph.org/media/facebook/call-me-hand-medium-dark-skin-tone_1f919-1f3fe.png"
          }
          className={classes.sideToolBarImage}
          alt="App logo"
        />
        <Typography variant="h6" className={classes.sideToolBarText}>
          HANGOUT
        </Typography>
      </Toolbar>
      <Divider />
      <Grid className={classes.avatarGrid}>
        <div className={classes.avatarIcon}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={currentlySignedInUser.name}
              src={currentlySignedInUser.photoURL}
            />
          </StyledBadge>
          <Typography variant="h6" className={classes.avatarDisplayName}>
            {currentlySignedInUser.displayName}
          </Typography>
        </div>
        <div>
          <Typography variant="h4" className={classes.avatarName}>
            {currentlySignedInUser.displayName}
          </Typography>
          <Typography variant="h4" className={classes.avatarName}>
            {currentlySignedInUser.email}
          </Typography>
        </div>
      </Grid>
      <Divider />
    </div>
  );
  return <div>{drawer}</div>;
}

export default Application;
