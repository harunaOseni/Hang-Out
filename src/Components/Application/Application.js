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
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import { SnackbarContent } from "@material-ui/core";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";

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
    backgroundColor: "rgba(43, 72, 158, 0.946)",
    color: "#dcddde",
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
  },
  sideToolBarImage: {
    height: "35px",
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
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
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
      padding: "7.1px",
      //   height: "65px",
    },
    backgroundColor: "rgba(43, 72, 158, 0.99)",
    color: "#dcddde",
    boxShadow:
      "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  title: {
    flex: "1",
  },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flex: 0,
    },
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgba(43, 72, 158, 0.99)",
    color: "#dcddde",
    overflowX: "hidden",
  },
}));

function Application({ userId }) {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alert, setAlert] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const open = Boolean(anchorEl);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleAlert() {
    setAlert(!alert);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleEditProfile() {
    setEditProfileModal(!editProfileModal);
  }

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
    <div>
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

      <Snackbar
        open={alert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Fade}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#191751",
          }}
          action={
            <IconButton color="inherit" onClick={handleAlert}>
              <CloseIcon />
            </IconButton>
          }
          message="Profile Edited Succesfully"
        />
      </Snackbar>

      {editProfileModal ? (
        <EditProfileDialog
          handleEditProfileToggle={handleEditProfile}
          handleSnackbarToggle={handleAlert}
        />
      ) : null}

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ minHeight: "50px" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
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
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditProfile}>
                <FaUserEdit /> &nbsp; Edit Profile
              </MenuItem>

              <MenuItem onClick={handleSignOut}>
                <GoSignOut /> &nbsp; Sign Out Of Hangout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown>
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Application;
