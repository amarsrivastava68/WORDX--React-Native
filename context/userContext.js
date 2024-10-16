import React, { createContext, useState } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('amar');
  const [score, setScore] = useState(0);
  const [validWords, setValidWords] = useState([]);


  const resetUserData = () => {
    setUserName('');
    setScore(0);
    setValidWords([]);
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        score,
        setScore,
        validWords,
        setValidWords,
        resetUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
