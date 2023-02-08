import React from "react";
import { useSpotifyContextValue } from "../../store/spotify_context";
import CurrentTrack from "./CurrentTrack";

function Footer() {
  const [{ playing }] = useSpotifyContextValue();

  return <div>{playing && <CurrentTrack playing={playing} />}</div>;
}

export default Footer;
