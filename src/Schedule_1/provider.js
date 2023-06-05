import React, { createContext, useState, useRef } from 'react';

const initialSharedState = {
  tripList: [],
  inputValue: "",
  displayValue: "",
  departure: [],
  option: 0,
  option2: 0,
  finalDeparture: "",
  transport: "",
  departureDate1: "",
  departureDate2: "",
  touchHome: 0,
  touchProfile: 0,
  mapRef: null,
  value1: "",
  value2: "",
  bakil: 0,
  allowButton: false,
  setTripList: () => {},
  deleteTripList: () => {},
  setInputValue: () => {},
  setDisplayValue: () => {},
  setDeparture: () => {},
  setOption: () => {},
  setOption2: () => {},
  setFinalDeparture: () => {},
  setTransport: () => {},
  setDepartureDate1: () => {},
  setDepartureDate2: () => {},
  setTouchHome: () => {},
  setTouchProfile: () => {},
  setValue1: () => {},
  setValue2: () => {},
  setBakil: () => {},
  setAllowButton: () => {},
};

export const MyContext = createContext(initialSharedState);

export const MyScheduleContextProvider = ({ children }) => {
  const [tripList, setTripList] = useState(initialSharedState.tripList);
  const [inputValue, setInputValue] = useState(initialSharedState.inputValue);
  const [displayValue, setDisplayValue] = useState(initialSharedState.displayValue);
  const [departure, setDeparture] = useState(initialSharedState.departure);
  const [option, setOption] = useState(initialSharedState.option);
  const [option2, setOption2] = useState(initialSharedState.option);
  const [finalDeparture, setFinalDeparture] = useState(initialSharedState.finalDeparture);
  const [departureDate1, setDepartureDate1] = useState(initialSharedState.departureDate1);
  const [departureDate2, setDepartureDate2] = useState(initialSharedState.departureDate2);
  const [touchHome, setTouchHome] = useState(initialSharedState.touchHome);
  const [touchProfile, setTouchProfile] = useState(initialSharedState.touchProfile);
  const [transport, setTransport] = useState(initialSharedState.transport);
  const [value1, setValue1] = useState(initialSharedState.value1);
  const [value2, setValue2] = useState(initialSharedState.value2);
  const [bakil, setBakil] = useState(initialSharedState.bakil);
  const mapRef = useRef(null); // useRef를 사용하여 mapRef 생성
  const [allowButton, setAllowButton] = useState(initialSharedState.allowButton);

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
    option,
    option2,
    finalDeparture,
    departureDate1,
    departureDate2,
    touchHome,
    touchProfile,
    mapRef, // mapRef 추가
    transport,
    value1,
    value2,
    bakil,
    allowButton,
    setTripList,
    deleteTripList,
    setInputValue,
    setDisplayValue,
    setDeparture,
    setOption,
    setOption2,
    setFinalDeparture,
    setDepartureDate1,
    setDepartureDate2,
    setTouchHome,
    setTouchProfile,
    setTransport,
    setValue1,
    setValue2,
    setBakil,
    setAllowButton,
  };
  
  return (
    <MyContext.Provider value={sharedState}>
      {children}
    </MyContext.Provider>
  );
};
