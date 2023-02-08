import React from "react";
import classes from "./Login.module.css";
// import { loginUrl } from "../../store/spotify";
import { useComponent } from "../../store/spotify";

function Login() {
  const { loginUrl } = useComponent();
  console.log(loginUrl);
  return (
    <div className={classes.login}>
      <img
        className={classes.spotifyLogo}
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="spotify logo"
      />

      <button className={classes.loginButton}>
        <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
      </button>
    </div>
  );
}

export default Login;
