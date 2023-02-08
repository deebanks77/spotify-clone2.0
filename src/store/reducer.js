export const initialState = {
  user: null,
  token: null,
  playlists: [],
  playing: "",
  playlist: null,
  playerState: false,
  playlistId: null,
};

export const reducer = (state, action) => {
  // console.log(action);
  // Action -> type , [payload]
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_TOKEN":
      return { ...state, token: action.token };
    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists };
    case "SET_PLAYING":
      return { ...state, playing: action.playing };
    case "SET_PLAYLIST":
      return { ...state, playlist: action.playlist };
    case "SET_PLAYER_STATE":
      return { ...state, playerState: action.playerState };
    case "SET_PLAYLIST_ID":
      return { ...state, playlistId: action.playlistId };
    default:
      return state;
  }
};
