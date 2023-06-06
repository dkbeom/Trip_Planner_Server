
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './mainpage/MainPage';
import MyPage from './mainpage/MyPage';
import MyProfile from './mainpage/MyProfile';
import SamplePage from './Sample/SamplePage';
import { MyContextProvider } from './provider';
import SurveyPage from './Survey/SurveyPage';
import Departure from './Schedule_1/Departure/Departure';
import Survey from './Schedule_1/Pre-Survey/Survey';
import { MyScheduleContextProvider } from './Schedule_1/provider';
import Destination from './Schedule_1/Destination/Destination';
import PostSurvey from './Schedule_1/Post-Survey/SurveyPage'



function AppStart() {
  return (
    <MyScheduleContextProvider>
    <MyContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/departure" element={<Departure/>} />
          <Route path="/pre-survey" element={<Survey/>}/>
          <Route path="/destination" element={<Destination/>}/>
          <Route path="/post-survey" element={<PostSurvey/>}/>
        </Routes>
    </MyContextProvider>
    </MyScheduleContextProvider>
  );
}

export default AppStart;