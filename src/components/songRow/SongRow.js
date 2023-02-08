import React from "react";
import classes from "./SongRow.module.css";

function SongRow(props) {
  const { playTrack, track } = props;
  // console.log(track);

  const trackDetails = {
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => artist.name),
    image: track.album.images[0].url,
    context_uri: track.album.uri,
    track_number: track.track_number,
  };

  const msToMinuteAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className={classes.playlist} onClick={() => playTrack(trackDetails)}>
      <div className={classes.playlist_index}>{props.index + 1}</div>
      <div className={classes.songRow}>
        <img
          className={classes.songRow__album}
          src={track.album.images[0].url}
          alt="song cover"
        />
        <div className={classes.songRow__info}>
          <h1>{track.name}</h1>
          <p>
            {track.artists.map((artist) => artist.name).join(", ")} -{" "}
            {track.album.name}
          </p>
        </div>
      </div>
      <div className={classes.playlist_album}>
        <span>{track.album.name}</span>
      </div>
      <div className={classes.playlist_time}>
        <span>{msToMinuteAndSeconds(track.duration_ms)}</span>
      </div>
    </div>
  );
}

export default SongRow;
