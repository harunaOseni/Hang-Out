import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { CssBaseline } from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from "@material-ui/core/Menu";
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import {Grid} from '@material-ui/core';


function Application({ currentlySignedInUser }) {

    const drawer = currentlySignedInUser && (
        <div>
            <Toolbar>
                <Typography>
                    HANGOUT
                </Typography>
            </Toolbar>
        </div>
    )
  return (
    <div>
      <h1>This is the main application, where the magic happens!</h1>
    </div>
  );
}

export default Application;
