import React, { useEffect, useState } from "react";
import logo from "./Assets/messenger-logo.png";
import "./App.css";
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import SendRounded from "@material-ui/icons/SendRounded";

function App() {
  const [messages, setMessages] = useState(["what's up", "how are you"]);
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   setMessages([...messages, input]);
  // }, []);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <Container maxWidth="sm" className="container">
      {/* header */}
      <div className="header">
        <img style={{ width: "5rem" }} src={logo} alt="logo" />
        <div className="header__logoName">Messenger-clone</div>
        <div className="header__greet">Welcome</div>
        <Button variant="contained">Get started</Button>
      </div>

      {/* messages */}

      <Grid
        className="message__grid"
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        {messages.map((message) => (
          <div className="message">
            <div className="message__text">{message}</div>
          </div>
        ))}
      </Grid>

      {/* input and button */}
      <form className="form">
        <TextField
          id="outlined-basic"
          autoComplete="off"
          label="Type a message"
          variant="outlined"
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
  );
}

export default App;
