import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import Departure from './Departure/Departure';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {MyContext, MyContextProvider} from './provider'
import Survey from './Survey/Survey'
import '../mainpage/font.css'

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function MainPage() {
  const handleTabSelect = (selectedTab) => {
    console.log(selectedTab);
  };
  const { finalDeparture } = useContext(MyContext);

  return (
    <Background>
      <NavBar />
      <Tabs
        style={{ background: "#FFFFFFAA" }}
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-4"
        fill
        onSelect={handleTabSelect}
      >
        <Tab eventKey="home" title="출발지 선택">
          <Departure />
        </Tab>
        {finalDeparture === "" ? (
          <Tab eventKey="profile" title="여행 사전 정보" disabled/>
        ) : (
          <Tab eventKey="profile" title="여행 사전 정보">
            <Survey/>
          </Tab>
        )}
        <Tab eventKey="longer-tab" title="여행지" disabled>
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="contact" title="추가 입력 2" disabled>
          <div className = "sd">

          Tab content for Contact
          </div>
        </Tab>
      </Tabs>
    </Background>
  );
}

function MainPageWithContext() {
  return (
    <MyContextProvider>
      <MainPage />
    </MyContextProvider>
  );
}

export default MainPageWithContext;
