import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { AiFillLike } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import ReactPlayer from "react-player/lazy";
import AudioPlayer from "material-ui-audio-player";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { database } from "../../Firebase/firebase";

const muiTheme = createMuiTheme({});

const audioPlayerStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    width: "100%",
  },

  playIcon: {
    color: "rgba(43, 72, 158, 0.99)",
    "&:hover": {
      color: "rgba(43, 72, 158, 0.92)",
    },
  },

  pauseIcon: {
    color: "rgba(43, 72, 158, 0.99)",
    "&:hover": {
      color: "rgba(43, 72, 158, 0.92)",
    },
  },

  volumeIcon: {
    color: "rgba(43, 72, 158, 0.99)",
    "&:hover": {
      color: "rgba(43, 72, 158, 0.92)",
    },
  },
  volumeSlider: {
    color: "rgba(43, 72, 158, 0.99)",
  },

  mainSlider: {
    color: "#3f51b5",
    "& .MuiSlider-rail": {
      color: "#7986cb",
    },
  },
}));

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
    width: "100%",
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

  emoji__countButtonContainer: {
    display: "flex",
    marginTop: "5px",
  },

  emoji__countButtondiv: {
    backgroundColor: "rgba(35,40,158,0.99)",
    position: "relative",
    marginRight: "5px",
    borderRadius: "5px",
    alignItems: "center",
    fontSize: "3px",
  },

  emoji__count: {
    fontWeight: "bold",
    paddingLeft: "5px",
  },

  emoji__countButton: {
    padding: 0,
  },

  video__container: {
    paddingTop: "5px",
  },

  audio__container: {
    paddingTop: "15px",
    paddingBottom: "10px",
    paddingLeft: "10px",
    width: "100%",
  },
}));

function Message({ messageData, hangoutMessageId }) {
  const classes = useStyles();
  const [style, setStyle] = useState({ display: "none" });
  const [deleteModal, setDeleteModal] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userDetails")).uid;
  const messageUserId = messageData.userId;
  const date = messageData.timestamp.toDate();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = `${day}/${month}/${year} ${hour}:${minute}`;

  function isImage(url) {
    //array of image extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    //check if url includes one of the image extensions
    return imageExtensions.some((ext) => url.includes(ext));
  }

  function isVideo(url) {
    //array of video extensions
    const videoExtensions = ["mp4", "webm", "ogg", "ogv"];
    //check if url includes one of the video extensions
    return videoExtensions.some((ext) => url.includes(ext));
  }

  function isAudio(url) {
    //array of audio extensions
    const audioExtensions = ["mp3", "wav", "flac", "m4a", "aac", "wma"];
    //check if url includes one of the audio extensions
    return audioExtensions.some((ext) => url.includes(ext));
  }

  const numLikes = messageData.likeCount;
  const numFire = messageData.fireCount;
  const numHeart = messageData.heartCount;

  const userLiked = messageData.likes[userId];
  const userFire = messageData.fire[userId];
  const userHeart = messageData.heart[userId];

  const messageMedia = messageData.messageMedia;

  const hangoutId = useParams().id;

  const selectedLike = userLiked ? { color: "green" } : null;

  const selectedHeart = userHeart ? { color: "red" } : null;

  const selectedFire = userFire ? { color: "orange" } : null;

  function handleHeartClick() {
    const hangoutMessage = database
      .collection("hangouts")
      .doc(hangoutId)
      .collection("messages")
      .doc(hangoutMessageId);
  }

  function handleFireClick() {
    const hangoutMessage = database
      .collection("hangouts")
      .doc(hangoutId)
      .collection("messages")
      .doc(hangoutMessageId);
  }

  function handleLikeClick() {
    const hangoutMessage = database
      .collection("hangouts")
      .doc(hangoutId)
      .collection("messages")
      .doc(hangoutMessageId);
  }

  function handleDeleteMessage(id) {
    database
      .collection("hangouts")
      .doc(hangoutId)
      .collection("messages")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Succesfully Deleted Message");
      })
      .catch((error) => {
        console.log("We found and error", error);
      });
  }

  function handleDeleteModal() {
    setDeleteModal(!deleteModal);
  }

  function handleMouseEnter() {
    setStyle({ display: "block" });
  }

  function handleMouseLeave() {
    setStyle({ display: "none" });
  }
  return (
    <div
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.message__content}>
        <Avatar src={messageData.userAvatar} className={classes.user__avatar} />

        <div className={classes.message__info}>
          <div className={classes.top__messageContent}>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                paddingRight: "4px",
              }}
            >
              {messageData.username}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: "500",
              }}
            >
              {time}
            </Typography>
          </div>
          <div className={classes.bottom__messageContent}>
            {messageData.text}
          </div>
          {messageMedia && isImage(messageMedia) === true ? (
            <div className={classes.message__imageContainer}>
              <img
                src={messageMedia}
                alt=""
                className={classes.message__image}
              />
            </div>
          ) : null}

          {messageMedia && isVideo(messageMedia) === true ? (
            <div className={classes.video__container}>
              <ReactPlayer
                id="myVedio"
                url={messageMedia}
                width="65%"
                height="90%"
                playing={true}
                controls={true}
                volume={1}
                progressInterval={5000}
                pip={true}
              />
            </div>
          ) : null}

          {messageMedia && isAudio(messageMedia) === true ? (
            <ThemeProvider theme={muiTheme}>
              <div className={classes.audio__container}>
                <AudioPlayer
                  elevation={1}
                  width="100%"
                  variation="default"
                  spacing={2}
                  order="standart"
                  preload="auto"
                  src={messageMedia}
                  useStyles={audioPlayerStyle}
                />
              </div>
            </ThemeProvider>
          ) : null}

          <div className={classes.emoji__countButtonContainer}>
            {numLikes > 0 ? (
              <div className={classes.emoji__countButtondiv}>
                <IconButton
                  style={selectedLike}
                  onClick={handleLikeClick}
                  size="small"
                >
                  <AiFillLike className={classes.emoji__countButton} />
                  <Typography
                    variant="subtitle2"
                    className={classes.emoji__count}
                  >
                    {numLikes}
                  </Typography>
                </IconButton>
              </div>
            ) : null}

            {numHeart > 0 ? (
              <div className={classes.emoji__countButtondiv}>
                <IconButton
                  style={selectedHeart}
                  size="small"
                  onClick={handleHeartClick}
                >
                  <AiFillHeart className={classes.emoji__countButton} />
                  <Typography
                    variant="subtitle2"
                    className={classes.emoji__count}
                  >
                    {numHeart}
                  </Typography>
                </IconButton>
              </div>
            ) : null}

            {numFire > 0 ? (
              <div className={classes.emoji__countButtondiv}>
                <IconButton
                  style={selectedFire}
                  size="small"
                  onClick={handleFireClick}
                >
                  <AiFillFire className={classes.emoji__countButton} />
                  <Typography
                    variant="subtitle2"
                    className={classes.emoji__count}
                  >
                    {numFire}
                  </Typography>
                </IconButton>
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.message__emojiBtnContainer} style={style}>
          <IconButton size="small" onClick={handleLikeClick}>
            <AiFillLike className={classes.emoji__button} />
          </IconButton>
          <IconButton size="small" onClick={handleFireClick}>
            <AiFillFire className={classes.emoji__button} />
          </IconButton>
          <IconButton size="small" onClick={handleHeartClick}>
            <AiFillHeart className={classes.emoji__button} />
          </IconButton>
          <IconButton size="small">
            <AiFillDelete
              className={classes.emoji__button}
              style={{ color: "red" }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Message;
