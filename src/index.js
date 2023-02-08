import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SpotifyContextProvider from "./store/spotify_context";
import { initialState, reducer } from "./store/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SpotifyContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </SpotifyContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// dependicies
// "name": "spotify-app",
// "version": "0.1.0",
// "homepage": "https://deebanks77.github.io/Spotify-clone",
// "private": true,

// scripts
// "predeploy": "npm run build",
//   "deploy": "gh-pages -d build",
