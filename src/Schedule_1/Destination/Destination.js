import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavBar from '../../mainpage/NavBar';
import TMap from './Map'
import ScheduleTable from './ScheduleTable';
import Table from './Table'
import { MyContext, MyScheduleContextProvider } from '../provider';
import { useContext } from 'react';

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
  margin-left: 10vh
`;


const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function Destination() {
  return (
    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-2">
        <Nav.Item>
          <Nav.Link href="/departure">출발지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/pre-survey" eventKey="link-1">여행 사전 정보</Nav.Link>
        </Nav.Item>
          <Nav.Link href="/destination" eventKey="link-2">여행지 선택</Nav.Link>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <Table/>
          </Col>
          <Col xs={6}>
            <MapWrapper>
                <TMap/>
            </MapWrapper>
          </Col>
        </Row>
      </MainWrapper>
    </Background>
  );
}

export default Destination;
