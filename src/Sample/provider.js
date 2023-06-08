import React, { createContext, useState } from 'react';

const initialSharedState = {
  sharedVariable: '처음에는 이겁니다',
  setSharedVariable: () => {},
  itemList: [],
  setItemList: () => {},
  showmap: false,
  setShowMap: () => {},
};

export const MyContext = createContext(initialSharedState);

export const MyContextProvider = ({ children }) => {
  const [sharedVariable, setSharedVariable] = useState(initialSharedState.sharedVariable);
  const [itemList, setItemList] = useState(initialSharedState.itemList);
  const [showmap, setShowMap] = useState(initialSharedState.showmap);

  const updateSharedVariable = (value) => {
    setSharedVariable(value);
  };

  const sharedState = {
    sharedVariable,
    setSharedVariable: updateSharedVariable,
    itemList,
    setItemList,
    showmap,
    setShowMap,
  };

  return (
    <MyContext.Provider value={sharedState}>
      {children}
    </MyContext.Provider>
  );
};
