import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('amar');
  const [score, setScore] = useState(0);
  const [validWords, setValidWords] = useState([]);

  // Function to reset user data (if needed)
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
