import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { AiFillLike } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    position: "relative",
    padding: "8px",
    color: "white",
  },

  message__content: {
    display: "flex",
    width: "100%",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#fff4",
    },
    paddingBottom: "20px",
  },

  user__avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    alignItems: "center",
  },

  top__messageContent: {
    display: "flex",
    fontSize: "1rem",
  },

  message__info: {
    alignItems: "center",
    marginLeft: "10px",
    paddingTop: "3px",
  },

  message__image: {
    height: "30vh",
    borderRadius: "5px",
  },

  message__imageContainer: {
    paddingTop: "10px",
  },

  message__emojiBtnContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "rgba(35,40,158,0.99)",
    borderRadius: "5px",
    width: "40px",
    textAlign: "center",
  },

  emoji__button: {
    fontSize: "1rem",
    color: "rgb(255 195 54)",
  },
}));

function Message() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.message__content}>
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/hangout-application.appspot.com/o/profilePictures%2F38b2c1b8b4703be9005df0dd694b2ae9.jpg?alt=media&token=b9b9b93f-0f00-41e9-a3b2-beb443c0b8e8"
          className={classes.user__avatar}
        />

        <div className={classes.message__info}>
          <div className={classes.top__messageContent}>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                paddingRight: "4px",
              }}
            >
              Rick
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "500",
              }}
            >
              30/5/2021 11:19
            </Typography>
          </div>
          <div className={classes.bottom__messageContent}>
            Well, I am Rick and you cannot do a damn thing about it.
          </div>
          <div className={classes.message__imageContainer}>
            <img
              src="https://i.pinimg.com/originals/9e/0c/d2/9e0cd25afaefd1993664eeb0d17f7171.jpg"
              alt=""
              className={classes.message__image}
            />
          </div>
        </div>

        <div className={classes.message__emojiBtnContainer}>
          <IconButton>
            <AiFillLike className={classes.emoji__button} />
          </IconButton>
          <IconButton>
            <AiFillFire className={classes.emoji__button} />
          </IconButton>
          <IconButton>
            <AiFillHeart className={classes.emoji__button} />
          </IconButton>
          <IconButton>
            <AiFillDelete className={classes.emoji__button} style={{color: "red"}} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Message;
