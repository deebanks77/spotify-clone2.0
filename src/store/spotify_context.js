import React, { createContext, useContext, useReducer } from "react";

export const spotifyContext = createContext();

export default function SpotifyContextProvider(props) {
  const { initialState, reducer, children } = props;
  return (
    <spotifyContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </spotifyContext.Provider>
  );
}

export const useSpotifyContextValue = () => useContext(spotifyContext);
