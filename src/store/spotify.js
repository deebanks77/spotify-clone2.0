// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

import { useEffect, useState } from "react";

// click login button
// redirect to spotify login page
// redirect to home page once logged in

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = `${window.location.href}`;
// const redirectUri = "http://localhost:3000/";
console.log(redirectUri);

export const useComponent = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    setState(redirectUri);
  }, []);

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${state}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return { loginUrl };
};

const clientId = "406049f597844c91b8791d7f901654ec";

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-playback-position",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "playlist-modify-private",
];

// get the access hash from the url >> token
export const getTokenUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

// export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;

// generate token method2
// export const getTokenUrl2 = () => {
//   return window.location.hash
//     .substring(1)
//     .split("&")
//     .find((elem) => elem.startsWith("access_token"))
//     .split("=")[1];
// };
