import { Fade, IconButton, makeStyles, Modal } from "@material-ui/core";
import InfoRounded from "@material-ui/icons/InfoRounded";
import React, { useState } from "react";
import logo from "../Assets/messenger-logo.png";
import "./Header.css";

function Header() {
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
  const [openInfo, setOpenInfo] = useState(false);

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="header__logoName">Messenger</div>
      <IconButton onClick={handleOpenInfo}>
        <InfoRounded />
      </IconButton>

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
    </div>
  );
}

export default Header;
