import React, { createContext, useState } from 'react';

const initialSharedState = {
    joinsuccess: false,
    setJoinsuccess: () => {},
    isLogin: false,
    setIsLogin: () => {},
    accountEmail: "",
    setaccountEmail: () => {},
};

export const MyContext = createContext(initialSharedState);

export const MyContextProvider = ({ children }) => {
  const [joinsuccess, setJoinsuccess] = useState(initialSharedState.joinsuccess);
  const [isLogin, setIsLogin] = useState(initialSharedState.isLogin);
  const [accountEmail, setaccountEmail] = useState(initialSharedState.accountEmail);

  const sharedState = {
    joinsuccess,
    setJoinsuccess,
    isLogin,
    setIsLogin,
    accountEmail,
    setaccountEmail,
  };

  return (
    <MyContext.Provider value={sharedState}>
      {children}
    </MyContext.Provider>
  );
};
