/* eslint-disable eqeqeq */
import { Avatar, makeStyles } from "@material-ui/core";
import React from "react";

function Message(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  return (
    <div
      className={
        // eslint-disable-next-line eqeqeq
        props.values.user == props.user ? "message__right" : "message__left"
      }
    >
      {props.values.user != props.user ? (
        <Avatar
          style={{ marginRight: ".5rem", backgroundColor: "#00BDFF" }}
          alt={props.values.user}
          src="no.img"
          className={classes.small}
        />
      ) : (
        ""
      )}

      <div
        className={
          // eslint-disable-next-line eqeqeq
          props.values.user == props.user
            ? "message__text-blue"
            : "message__text-grey"
        }
      >
        {props.values.text}
      </div>
    </div>
  );
}

export default Message;
