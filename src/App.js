import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Player from "./components/player/Player";
import { getTokenUrl } from "./store/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useSpotifyContextValue } from "./store/spotify_context";
import axios from "axios";

// Client ID 406049f597844c91b8791d7f901654ec

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token, playlists, playing, playlistId }, dispatch] =
    useSpotifyContextValue();

  useEffect(() => {
    // get access hash from url
    const hash = getTokenUrl();
    console.log("I have a token >>>", hash);
    console.log(window.location.href);
    console.log(`${window.location.origin}/`);
    const _token = hash.access_token;

    //  clear access token
    window.location.hash = "";

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        const _user = user;
        dispatch({
          type: "SET_USER",
          user: _user,
        });
      });

      // Get playlist data
      spotify.getUserPlaylists().then((playlists) => {
        const { items } = playlists;

        const idInfo = items.map((item) => {
          return { id: item.id, href: item.href };
        });

        dispatch({
          type: "SET_PLAYLISTS",
          playlists: items,
        });
        dispatch({
          type: "SET_PLAYLIST_ID",
          playlistId: idInfo[0].id,
        });
      });

      // Get Playing data
      const getPlayingData = async () => {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;

        if (data !== "") {
          const { item } = data;
          const playing = {
            id: item.id,
            name: item.name,
            artists: item.artists.map((artist) => artist.name),
            image: item.album.images[2].url,
          };
          dispatch({
            type: "SET_PLAYING",
            playing: playing,
          });
        }
      };

      getPlayingData();
    }
  }, [user, token, playing, playlists, dispatch]);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
