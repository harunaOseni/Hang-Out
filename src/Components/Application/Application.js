import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { GoSignOut } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { auth, database } from "../../Firebase/firebase";

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
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#14265E",
    color: "#dcddde",
    boxShadow: 
        "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
    
}, 
   menuButton: {
       marginRight: theme.spacing(2)
       [theme.breakpoints.up("sm")]: {
           display: "none",
       }
   }

}));

function Application({ userId, window }) {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    database
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        setUserDetails(doc.data());
        localStorage.setItem("userDetails", JSON.stringify(doc.data()));
      });
  }, [userId]);

  const handleSignOut = () => {
    auth.signOut();
  };
  const drawer = userDetails && (
    <div
      style={{ maxWidth: "290px", backgroundColor: "#14265E", height: "100vh" }}
    >
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
            <Avatar alt={userDetails.name} src={userDetails.photoUrl} />
          </StyledBadge>
          <Typography variant="h6" className={classes.avatarDisplayName}>
            {userDetails.displayName}
          </Typography>
        </div>
        <div>
          <Typography variant="h4" className={classes.avatarName}>
            {userDetails.name}
          </Typography>
          <Typography variant="h4" className={classes.avatarName}>
            {userDetails.email}
          </Typography>
        </div>
      </Grid>
      <Divider />
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "50px" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={"handleDrawerToggle"}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <h3 to="/" style={{ textDecoration: "none", color: "#dcddde" }}>
              Home
            </h3>
          </Typography>

          <div>
            <IconButton
              onClick={"a handle menu function goes in here..."}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu>
              <MenuItem onClick={"a function goes in here"}>
                <FaUserEdit /> &nbsp; Edit Profile
              </MenuItem>

              <MenuItem onClick={"a function goes in here"}>
                <GoSignOut /> &nbsp; Sign Out of Hangout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            container={"container variable goes in here"}
            variant="temporary"
            anchor={"anchor goes in here"}
            open={"something goes in here also"}
            onClose={"a function goes in here"}
            classes={
              {
                //a style goes in here
              }
            }
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Application;
