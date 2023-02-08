import React from "react";
import classes from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSpotifyContextValue } from "../../store/spotify_context";
import axios from "axios";

function Header({ headerBackground, headerPlayer }) {
  const [{ token, user, playerState }, dispatch] = useSpotifyContextValue();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: "SET_PLAYER_STATE",
      playerState: !playerState,
    });
  };

  return (
    <div
      className={`${classes.header} ${
        headerBackground ? classes.background : ""
      } ${headerPlayer ? classes.paddingTop : ""}`}
    >
      <div className={classes.header__left}>
        <div className={classes.header__arrowCOntainer}>
          <ArrowBackIosNewIcon className={classes.header__arrow} />
          <ArrowForwardIosIcon className={classes.header__arrow} />
        </div>
        <div>
          {headerPlayer ? (
            !playerState ? (
              <PlayCircleIcon
                onClick={changeState}
                fontSize="large"
                className={classes.header__player}
              />
            ) : (
              <PauseCircleIcon
                onClick={changeState}
                fontSize="large"
                className={classes.header__player}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={classes.header__right}>
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src={user && user.images[0].url} />
        </Stack>
        <h4>{user && user.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
