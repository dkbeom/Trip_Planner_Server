import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import MapAPI from './Tmap';
import ScheduleTable from './ScheduleTable';
import SmallExample from './Table';
import TableComponent from './Table';
import TripList from './tripList';
import { Row, Col } from 'react-bootstrap';
import { MyContextProvider } from './provider';
import Departure from './Departure/Departure';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function MainPage() {
  return (
    <Background>
      <NavBar />
      <Tabs
        style={{background: "#FFFFFFAA"}}
        defaultActiveKey="home"
        id="fill-tab-example"
        className="mb-4"
        fill
      >
        <Tab eventKey="home" title="출발지 고르기">
          <Departure/>
        </Tab>
        <Tab eventKey="profile" title="여행지 고르기">
        </Tab>
        <Tab eventKey="longer-tab" title="추가 입력 1">
          Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="contact" title="추가 입력 2">
          Tab content for Contact
        </Tab>
      </Tabs>
    </Background>
  );
}

export default MainPage;
