
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchedulePage from './Schedule_1/SchedulePage';
import MainPage from './mainpage/MainPage';
import SamplePage from './Sample/SamplePage'
import { MyContextProvider } from './provider';



function AppStart() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/sample" element={<SamplePage />} />
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default AppStart;