import React, { useState, useRef } from "react";
import { useSpotifyContextValue } from "../../store/spotify_context";
import classes from "./Body.module.css";
import Header from "../header/Header";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SongRow from "../songRow/SongRow";
import axios from "axios";

function Body(props) {
  const spotify = props;

  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [headerPlayer, setHeaderPlayer] = useState(false);
  const [{ token, playlist, playing, playerState }, dispatch] =
    useSpotifyContextValue();

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 200
      ? setHeaderBackground(true)
      : setHeaderBackground(false);

    bodyRef.current.scrollTop >= 290
      ? setHeaderPlayer(true)
      : setHeaderPlayer(false);

    bodyRef.current.scrollTop >= 380
      ? setNavBackground(true)
      : setNavBackground(false);
  };

  let track;
  if (playlist) {
    track = playlist.tracks.items;
  }

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

  const playTrack = async ({
    id,
    name,
    artists,
    image,
    context_uri,
    track_number,
  }) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const playing = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: "SET_PLAYING", playing });
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else {
      dispatch({ type: "SET_PLAYER_STATE", playerState: true });
    }
    // console.log(playing);
    // console.log(playerState);
  };

  return (
    <div className={classes.body} ref={bodyRef} onScroll={bodyScrolled}>
      <Header
        spotify={spotify}
        headerBackground={headerBackground}
        headerPlayer={headerPlayer}
      />

      <div className={classes.body__info}>
        <img src={playlist && playlist.images[0].url} alt="Banky" />
        <div className={classes.body__infoText}>
          <strong>{playlist && playlist.type}</strong>
          <h2>{playlist && playlist.name}</h2>
          <p>{playlist && playlist.description}</p>
        </div>
      </div>

      <div className={classes.body__songs}>
        <div className={classes.body__icons}>
          {!playerState ? (
            <PlayCircleIcon
              onClick={changeState}
              fontSize="large"
              className={classes.body__play}
            />
          ) : (
            <PauseCircleIcon
              onClick={changeState}
              fontSize="large"
              className={classes.body__play}
            />
          )}
          <MoreHorizIcon />
        </div>
        <div
          className={`${classes.playlist} ${
            navBackground ? classes.background : ""
          } ${!playing ? classes.sticky : ""} `}
        >
          <div className={classes.playlist_index}>
            <span>#</span>
          </div>
          <div className={classes.playlist_title}>
            <span>TITLE</span>
          </div>
          <div className={classes.playlist_album}>
            <span>ALBUM</span>
          </div>
          <div className={classes.playlist_time}>
            <AccessTimeIcon />
          </div>
        </div>
        <hr className={classes.horizontalLine} />
        {track && (
          <div className={classes.body__songList}>
            {track.map((item, index) => (
              <SongRow
                key={index}
                track={item.track}
                index={index}
                playTrack={playTrack}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
