
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SchedulePage from './Schedule_1/SchedulePage';
import MainPage from './mainpage/MainPage';
import MyPage from './mainpage/MyPage';
import MyProfile from './mainpage/MyProfile';
import SamplePage from './Sample/SamplePage';
import { MyContextProvider } from './provider';
import SurveyPage from './Survey/SurveyPage';
import Departure from './Schedule_1/Departure/Departure';
import Survey from './Schedule_1/Survey/Survey';
import { MyScheduleContextProvider } from './Schedule_1/provider';
import Destination from './Schedule_1/Destination/Destination';



function AppStart() {
  return (
    <MyScheduleContextProvider>
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/departure" element={<Departure/>} />
          <Route path="/pre-survey" element={<Survey/>}/>
          <Route path="/destination" element={<Destination/>}/>
        </Routes>
      </BrowserRouter>
    </MyContextProvider>
    </MyScheduleContextProvider>
  );
}

export default AppStart;