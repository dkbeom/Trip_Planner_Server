import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Tmap from './Tmap';
import TripList from './tripList';
import { Row, Col } from 'react-bootstrap';
import PlacementExample from './toast'
import Nav from 'react-bootstrap/Nav';
import NavBar from '../../mainpage/NavBar';
import { MyContext } from '../provider';


const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

const MainWrapper = styled.div`
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
  margin-left: 30%;
`;

const ScheduleWrapper = styled.div`
  width: 40vh;
`;


function Departure() {
  const { finalDeparture, touchHome, touchProfile, setTouchHome, setTouchProfile } = useContext(MyContext);

  return (
    <Background>
      <NavBar/>
      <Nav fill variant="tabs" defaultActiveKey="link-0">
        <Nav.Item style={{ backgroundColor: '#BBBBBB', border: '1px solid black', fontWeight: 'bold' }}>
          <Nav.Link href="/departure" eventKey="link-0" style={{backgroundColor: '#BBBBBB',}}>출발지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        {finalDeparture === "" && localStorage.getItem("finalDeparture") == null ? (
          <Nav.Link href="/pre-survey" eventKey="link-1" disabled style={{border: '1px solid black' }}>여행 사전 정보</Nav.Link>
        ) : (
          <Nav.Link href="/pre-survey" eventKey="link-1" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행 사전 정보</Nav.Link>
        )}
        </Nav.Item>
        <Nav.Item style={{border: '1px solid black' }}>
          <Nav.Link eventKey="link-2" disabled>여행지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{border: '1px solid black' }}>
          <Nav.Link eventKey="link-3" disabled>
            여행 추가 정보
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
              <TripList />
            </ScheduleWrapper>
          </Col>
          <Col xs={6}>
            <MapWrapper>
              <Tmap />
            </MapWrapper>
          </Col>
        </Row>
        <PlacementExample />
      </MainWrapper>
    </Background>
  );
}

export default Departure;
