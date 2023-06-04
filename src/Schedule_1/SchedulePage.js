import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import Departure from './Departure/Departure';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';
import { MyContext, MyScheduleContextProvider } from './provider'
import Survey from './Survey/Survey'
import '../mainpage/font.css'
import { Link } from 'react-router-dom';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function MainPage() {
  const { finalDeparture, touchHome, touchProfile, setTouchHome, setTouchProfile } = useContext(MyContext);
  const handleTabSelect = (selectedTab) => {
    if (selectedTab === "home") {
      console.log("Touched Home")
      setTouchHome(touchHome + 1);
    }
    if (selectedTab === "profile") {
      console.log("Touched Profile")
      setTouchProfile(touchProfile + 1);
    }
  };

  return (
    <Background>
      <NavBar />
    <Nav fill variant="tabs" defaultActiveKey="/departure">
      <Nav.Item>
        <Nav.Link href="/departure">출발지 선택</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/survey" eventKey="link-1" disabled>여행 사전 정보</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" disabled>여행지 선택</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
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
          <Tab eventKey="profile" title="여행 사전 정보" disabled />
        ) : (
            <Tab eventKey="profile" title="여행 사전 정보" Link="/sample">
                  <Survey />
            </Tab>
          )}
        <Tab eventKey="longer-tab" title="여행지" disabled>
          <Tab.Pane>
            Tab content for Loooonger Tab
          </Tab.Pane>
        </Tab>
        <Tab eventKey="contact" title="추가 입력 2" disabled>
          <Tab.Pane>
            <div className="sd">
              Tab content for Contact
            </div>
          </Tab.Pane>
        </Tab>
      </Tabs>
    </Background>
  );
}

function MainPageWithContext() {
  return (
    <MyScheduleContextProvider>
      <MainPage />
    </MyScheduleContextProvider>
  );
}

export default MainPageWithContext;
