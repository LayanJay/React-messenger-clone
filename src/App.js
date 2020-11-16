import React, { useEffect, useState } from "react";
import firebase from "firebase";
import db from "./firebase";
import "./App.css";
import {
  Button,
  Container,
  Fade,
  Grid,
  Grow,
  IconButton,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import SendRounded from "@material-ui/icons/SendRounded";
import logo from "./Assets/messenger-logo.png";
import Header from "./Components/Header";
import Message from "./Components/Message";
import { InfoRounded } from "@material-ui/icons";

function App() {
  // Home page functions
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #00BAFF",
      borderRadius: "0.3rem",
      outline: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const [openChat, setOpenChat] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };
  // Home page functions end

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [user, setUser] = useState("");

  const handleUsername = (e) => {
    e.preventDefault();
    setUser(inputUsername);
    setInputUsername("");
    handleCloseChat();
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            user: doc.data().user,
            text: doc.data().text,
          }))
        );
      });
  }, []);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      user: user,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, input]);
    setInput("");
    // eslint-disable-next-line no-restricted-globals
    window.scrollBy(0, screen.height);
  };

  return (
    <>
      {user ? (
        <Container maxWidth="lg" className="container">
          {/* header */}
          <Header />

          {/* messages */}

          <Grid
            className="message__grid"
            // container
            direction="column-reverse"
            justify="center"
            // alignItems="flex-start"
          >
            {messages.map((message) => (
              <Message key={message.id} user={user} values={message} />
            ))}
          </Grid>

          <form className="form">
            <TextField
              id="outlined-basic"
              autoComplete="off"
              label="Type a message"
              variant="outlined"
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <IconButton
              color="primary"
              type="submit"
              disabled={!input}
              onClick={sendMessageHandler}
            >
              <SendRounded />
            </IconButton>
          </form>
        </Container>
      ) : (
        <Container style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
          <div className="header__info">
            <IconButton onClick={handleOpenInfo}>
              <InfoRounded />
            </IconButton>
          </div>
          <div className="home">
            <img style={{ width: "9rem" }} src={logo} alt="logo" />
            <div className="header__logo-name">Messenger clone</div>
            <div className="header__greet">Welcome!</div>
            <Button variant="contained" onClick={handleOpenChat}>
              Get started
            </Button>
          </div>

          {/* info modal */}
          <Modal
            className={classes.modal}
            open={openInfo}
            onClose={handleCloseInfo}
            closeAfterTransition
          >
            <Fade in={openInfo}>
              <div className={classes.paper}>
                <h3>Developed by Layan Jayasinghe</h3>
                <div>
                  Ckeckout my Github. <br />
                  <a href="https://github.com/LayanJay">Click here</a>
                </div>
              </div>
            </Fade>
          </Modal>

          {/* get started modal */}
          <Modal
            className={classes.modal}
            open={openChat}
            onClose={handleCloseChat}
            closeAfterTransition
          >
            <Grow
              in={openChat}
              style={{ transformOrigin: "0 0 0" }}
              {...(openChat ? { timeout: 500 } : {})}
            >
              <div className={classes.paper}>
                <h3 style={{ textAlign: "center" }}>Join with the username</h3>
                <form className="form__chat">
                  <TextField
                    autoComplete="off"
                    label="Enter an username"
                    variant="outlined"
                    size="small"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                  />
                  <Button
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    variant="contained"
                    color="primary"
                    onClick={handleUsername}
                  >
                    Join
                  </Button>
                </form>
              </div>
            </Grow>
          </Modal>
        </Container>
      )}
    </>
  );
}

export default App;
