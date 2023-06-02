
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchedulePage from './Schedule_1/SchedulePage';
import MainPage from './mainpage/MainPage';
import MyPage from './mainpage/MyPage';
import MyProfile from './mainpage/MyProfile';
import SamplePage from './Sample/SamplePage';
import { MyContextProvider } from './provider';



function AppStart() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
  );
}

export default AppStart;