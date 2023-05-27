import React, { createContext, useState } from 'react';

const initialSharedState = {
  tripList: [],
  inputValue: "",
  displayValue: "",
  departure: "",
  setTripList: () => {},
  deleteTripList: () => {},
  setInputValue: () => {},
  setDisplayValue: () => {},
  setDeparture: () => {},
};

export const MyContext = createContext(initialSharedState);

export const MyContextProvider = ({ children }) => {
  const [tripList, setTripList] = useState(initialSharedState.tripList);
  const [inputValue, setInputValue] = useState(initialSharedState.inputValue);
  const [displayValue, setDisplayValue] = useState(initialSharedState.displayValue);
const [departure, setDeparture] = useState(initialSharedState.departure);
  const deleteTripList = (index) => {
    // 해당 인덱스의 항목을 삭제하고 새로운 배열 생성
    const updatedTripList = tripList.filter((_, i) => i !== index);
    setTripList(updatedTripList);
  };

  const sharedState = {
    tripList,
    inputValue,
    displayValue,
    departure,
    setTripList,
    deleteTripList,
    setInputValue,
    setDisplayValue,
    setDeparture,
  };
  
  return (
    <MyContext.Provider value={sharedState}>
      {children}
    </MyContext.Provider>
  );
};
