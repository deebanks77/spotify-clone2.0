import React, { useEffect } from "react";
import classes from "./Sidebar.module.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import QueueIcon from "@mui/icons-material/Queue";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSpotifyContextValue } from "../../store/spotify_context";
import axios from "axios";

function Sidebar() {
  const [{ playlists, token, playlistId }, dispatch] = useSpotifyContextValue();

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({
      type: "SET_PLAYLIST_ID",
      playlistId: selectedPlaylistId,
    });
  };

  useEffect(() => {
    if (playlistId) {
      const getNewPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const _playlist = response.data;
        // console.log("playlist sidebar", _playlist);
        dispatch({
          type: "SET_PLAYLIST",
          playlist: _playlist,
        });
      };
      getNewPlaylist();
    }
  }, [token, dispatch, playlistId]);

  return (
    <div className={classes.sidebar}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify-logo"
        className={classes.sidebar_logo}
      />
      <SidebarOptions title="Home" Icon={HomeIcon} />
      <SidebarOptions title="Search" Icon={SearchIcon} />
      <SidebarOptions title="Your Library" Icon={LibraryMusicIcon} />
      <SidebarOptions title="Create Playlist" Icon={QueueIcon} bold />
      <SidebarOptions title="Liked Song" Icon={FavoriteIcon} bold />
      <hr className={classes.horizontalLine} />

      {playlists ? (
        playlists.map((playlist) => (
          <SidebarOptions
            key={playlist.id}
            title={playlist.name}
            id={playlist.id}
            changeCurrentPlaylist={changeCurrentPlaylist}
          />
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Sidebar;
