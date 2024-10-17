import React, { createContext, useReducer } from "react";

const initialState = {
  userName: "",
  score: 0,
  validWords: [],
};

export const actionTypes = {
  SET_USER_NAME: "SET_USER_NAME",
  SET_SCORE: "SET_SCORE",
  SET_VALID_WORDS: "SET_VALID_WORDS",
  RESET_VALID_WORDS: "RESET_VALID_WORDS",
  RESET_USER: "RESET_USER",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_NAME:
      return { ...state, userName: action.payload };
    case actionTypes.SET_SCORE:
      return { ...state, score: state.score + action.payload };
    case actionTypes.SET_VALID_WORDS:
      return { ...state, validWords: [...state.validWords, action.payload] };
    case actionTypes.RESET_VALID_WORDS:
      return { ...state, validWords: [] };
    case actionTypes.RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
