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

  console.log(messageData);

  // const userId = JSON.parse(localStorage.getItem("userDetails")).uid;
  // const messageUserId = messageData.userId;
  // const date = messageData.timestamp.toDate();
  // const day = date.getDate();
  // const year = date.getFullYear();
  // const month = date.getMonth();
  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // const time = `${day}/${month}/${year} ${hour}:${minute}`;

  // const numLikes = messageData.likeCount;
  // const numFire = messageData.fireCount;
  // const numHeart = messageData.heartCount;

  // const userLiked = messageData.likes[userId];
  // const userFire = messageData.fire[userId];
  // const userHeart = messageData.heart[userId];

  // const messageMedia = messageData.messageMedia;
  // const messageAudio = messageData.audio;
  // const hangoutId = useParams().id;

  // const selectedLike = userLiked ? { color: "green" } : null;

  // const selectedHeart = userHeart ? { color: "red" } : null;

  // const selectedFire = userFire ? { color: "orange" } : null;

  // function handleHeartClick() {
  //   const hangoutMessage = database
  //     .collection("hangouts")
  //     .doc(hangoutId)
  //     .collection("messages")
  //     .doc(hangoutMessageId);

  //   //Note: Transaction is used when you need to get some data
  //   // from the database then make some calculation with it and store it back to the db.

  //   if (userHeart) {
  //     return () => {
  //       database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newHeartCount = doc.data().heartCount - 1;
  //             let newHeart = doc.data().heart;
  //             newHeart[userId] = false;

  //             transaction.update(hangoutMessage, {
  //               hearCount: newHeartCount,
  //               heart: newHeart,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Hearted");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   } else {
  //     return () => {
  //       database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newHeartCount = doc.data().heartCount + 1;
  //             let newHeart = doc.data().heart;
  //             newHeart[userId] = true;

  //             transaction.update(hangoutMessage, {
  //               hearCount: newHeartCount,
  //               heart: newHeart,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Dishearted");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   }
  // }

  // function handleFireClick() {
  //   const hangoutMessage = database
  //     .collection("hangouts")
  //     .doc(hangoutId)
  //     .collection("messages")
  //     .doc(hangoutMessageId);

  //   if (userFire) {
  //     return () => {
  //       database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newFireCount = doc.data().fireCount - 1;
  //             let newFire = doc.data().fire;
  //             newFire[userId] = false;

  //             transaction.update(hangoutMessage, {
  //               fireCount: newFireCount,
  //               fire: newFire,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Disliked With a Fire");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   } else {
  //     return () => {
  //       database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newFireCount = doc.data().fireCount + 1;
  //             let newFire = doc.data().fire;
  //             newFire[userId] = true;

  //             transaction.update(hangoutMessage, {
  //               fireCount: newFireCount,
  //               fire: newFire,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Liked With a Fire");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   }
  // }

  // function handleLikeClick() {
  //   const hangoutMessage = database
  //     .collection("hangouts")
  //     .doc(hangoutId)
  //     .collection("messages")
  //     .doc(hangoutMessageId);

  //   if (userLiked) {
  //     return () => {
  //       return database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newLikeCount = doc.data().likeCount - 1;
  //             let newLikes = doc.data().likes;
  //             newLikes[userId] = false;

  //             transaction.update(hangoutMessage, {
  //               likeCount: newLikeCount,
  //               likes: newLikes,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Disliked");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   } else {
  //     return () => {
  //       database
  //         .runTransaction((transaction) => {
  //           return transaction.get(hangoutMessage).then((doc) => {
  //             if (!doc) {
  //               console.log("No Document Found");
  //               return;
  //             }

  //             let newLikeCount = doc.data().likeCount + 1;
  //             let newLikes = doc.data().likes;
  //             newLikes[userId] = true;

  //             transaction.update(hangoutMessage, {
  //               likeCount: newLikeCount,
  //               likes: newLikes,
  //             });
  //           });
  //         })
  //         .then(() => {
  //           console.log("Succesfully Liked");
  //         })
  //         .catch((error) => {
  //           console.log("We found and error", error);
  //         });
  //     };
  //   }
  // }

  // function handleDeleteMessage(id) {
  //   database
  //     .collection("hangouts")
  //     .doc(hangoutId)
  //     .collection("messages")
  //     .doc(id)
  //     .delete()
  //     .then(() => {
  //       console.log("Succesfully Deleted Message");
  //     })
  //     .catch((error) => {
  //       console.log("We found and error", error);
  //     });
  // }

  // function handleDeleteModal() {
  //   setDeleteModal(!deleteModal);
  // }

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
          {/* <div className={classes.bottom__messageContent}>
            Well, I am Rick and you cannot do a damn thing about it.
          </div> */}
          {/* <div className={classes.message__imageContainer}>
            <img
              src="https://i.pinimg.com/originals/9e/0c/d2/9e0cd25afaefd1993664eeb0d17f7171.jpg"
              alt=""
              className={classes.message__image}
            />
          </div> */}

          {/* <div className={classes.video__container}>
            <ReactPlayer
              id="myVedio"
              url={"https://youtu.be/sjvlW0AzKlY"}
              width="65%"
              height="90%"
              playing={true}
              controls={true}
              volume={1}
              progressInterval={5000}
              pip={true}
            />
          </div> */}

          <ThemeProvider theme={muiTheme}>
            <div className={classes.audio__container}>
              <AudioPlayer
                elevation={1}
                width="100%"
                variation="default"
                spacing={2}
                order="standart"
                preload="auto"
                src={""}
                useStyles={audioPlayerStyle}
              />
            </div>
          </ThemeProvider>

          <div className={classes.emoji__countButtonContainer}>
            <div className={classes.emoji__countButtondiv}>
              <IconButton style={{ color: "green" }} size="small">
                <AiFillLike className={classes.emoji__countButton} />
                <Typography
                  variant="subtitle2"
                  className={classes.emoji__count}
                >
                  1
                </Typography>
              </IconButton>
            </div>
            <div className={classes.emoji__countButtondiv}>
              <IconButton style={{ color: "red" }} size="small">
                <AiFillHeart className={classes.emoji__countButton} />
                <Typography
                  variant="subtitle2"
                  className={classes.emoji__count}
                >
                  1
                </Typography>
              </IconButton>
            </div>
            <div className={classes.emoji__countButtondiv}>
              <IconButton style={{ color: "orange" }} size="small">
                <AiFillFire className={classes.emoji__countButton} />
                <Typography
                  variant="subtitle2"
                  className={classes.emoji__count}
                >
                  1
                </Typography>
              </IconButton>
            </div>
          </div>
        </div>

        <div className={classes.message__emojiBtnContainer} style={style}>
          <IconButton size="small">
            <AiFillLike className={classes.emoji__button} />
          </IconButton>
          <IconButton size="small">
            <AiFillFire className={classes.emoji__button} />
          </IconButton>
          <IconButton size="small">
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
