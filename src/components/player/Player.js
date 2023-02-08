import React from "react";
import classes from "./Player.module.css";
import Sidebar from "../sidebar/Sidebar";
import Body from "../body/Body";
import Footer from "../footer/Footer";

function Player(props) {
  const { spotify } = props.spotify;
  return (
    <div className={classes.player}>
      <div className={classes.player_body}>
        <Sidebar />
        <Body spotify={spotify} />
      </div>

      <Footer />
    </div>
  );
}

export default Player;
