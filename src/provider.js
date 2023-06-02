import React, { createContext, useState, useEffect } from 'react';

const initialSharedState = {
  joinsuccess: false,
  setJoinsuccess: () => {},
  accountEmail: '',
  setaccountEmail: () => {},
};

export const MyContext = createContext(initialSharedState);

export const MyContextProvider = ({ children }) => {
  const [joinsuccess, setJoinsuccess] = useState(initialSharedState.joinsuccess);
  const [accountEmail, setaccountEmail] = useState(initialSharedState.accountEmail);

  useEffect(() => {
    // accountEmail 상태가 변경될 때 로컬 스토리지에 저장
    sessionStorage.setItem('accountEmail', accountEmail);
  }, [accountEmail]);

  useEffect(() => {
    // 애플리케이션이 로드될 때 로컬 스토리지에서 값 가져와 초기 상태 설정
    const storedAccountEmail = sessionStorage.getItem('accountEmail');
    if (storedAccountEmail) {
      setaccountEmail(storedAccountEmail);
    }
  }, []);

  const sharedState = {
    joinsuccess,
    setJoinsuccess,
    accountEmail,
    setaccountEmail,
  };

  return (
    <MyContext.Provider value={sharedState}>
      {children}
    </MyContext.Provider>
  );
};
