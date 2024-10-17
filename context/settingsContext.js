import React, { createContext, useReducer } from "react";

const initialSettingsState = {
  isMuted: false,
  isDarkMode: false,
};

export const settingsActionTypes = {
  TOGGLE_MUTE: "TOGGLE_MUTE",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case settingsActionTypes.TOGGLE_MUTE:
      return { ...state, isMuted: !state.isMuted };
    case settingsActionTypes.TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settingsState, settingsDispatch] = useReducer(
    settingsReducer,
    initialSettingsState
  );

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        settingsDispatch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
