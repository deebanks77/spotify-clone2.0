import React from "react";
import classes from "./Footer.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RepeatIcon from "@mui/icons-material/Repeat";
// import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import VolumeDown from "@mui/icons-material/VolumeDown";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import axios from "axios";
import { useSpotifyContextValue } from "../../store/spotify_context";

function CurrentTrack() {
  const [{ token, playing, playerState }, dispatch] = useSpotifyContextValue();

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

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: "SET_PLAYER_STATE", playerState: true });

    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response1.data !== "") {
      const playing = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      dispatch({ type: "SET_PLAYING", playing });
    } else {
      dispatch({ type: "SET_PLAYING", playing: null });
    }
  };

  const handleVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <div className={classes.footer} id={playing.id}>
      <div className={classes.footer__left}>
        <img
          className={classes.footer__albumLogo}
          src={playing.image}
          alt={playing.name}
        />
        <div className={classes.footer__songInfo}>
          <h4>{playing.name}</h4>
          <p>{playing.artists.join(", ")}</p>
        </div>
        <FavoriteIcon fontSize="small" className={classes.footer__icon} />
      </div>

      <div className={classes.footer__center}>
        <ShuffleIcon className={classes.footer__icon} />
        <SkipPreviousIcon
          className={classes.footer__icon}
          onClick={() => changeTrack("previous")}
        />
        {!playerState ? (
          <PlayCircleIcon
            onClick={changeState}
            fontSize="large"
            className={`${classes.footer__icon}  ${classes.footer__playIcon}`}
          />
        ) : (
          <PauseCircleIcon
            onClick={changeState}
            fontSize="large"
            className={`${classes.footer__icon}  ${classes.footer__playIcon}`}
          />
        )}
        <SkipNextIcon
          className={classes.footer__icon}
          onClick={() => changeTrack("next")}
        />
        <RepeatIcon className={classes.footer__icon} />
      </div>

      <div className={classes.footer__right}>
        <Box sx={{ width: 300 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <QueueMusicIcon
              fontSize="x-small"
              className={classes.footer__icon}
            />
            <CastConnectedIcon
              fontSize="x-small"
              className={classes.footer__icon}
            />
            <VolumeDown className={classes.footer__icon} />
            <input
              type="range"
              onMouseUp={(e) => handleVolume(e)}
              min={0}
              max={100}
              className={classes.volume}
            />
            <OpenInFullIcon fontSize="small" className={classes.footer__icon} />
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default CurrentTrack;
