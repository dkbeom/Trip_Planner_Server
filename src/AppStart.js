import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchedulePage from './Schedule_1/SchedulePage';
import MainPage from './mainpage/MainPage';



function AppStart() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppStart;
