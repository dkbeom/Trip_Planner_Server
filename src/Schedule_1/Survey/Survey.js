import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Forms from './Forms'
import Report from './Report';
import Nav from 'react-bootstrap/Nav';
import NavBar from '../../mainpage/NavBar';

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
`;


const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function Departure() {

  return (
    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link href="/departure">출발지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/pre-survey" eventKey="link-1">여행 사전 정보</Nav.Link>
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
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <Forms />
          </Col>
          <Col xs={6}>
            <MapWrapper>
              <Report />
            </MapWrapper>
          </Col>
        </Row>
      </MainWrapper>
    </Background>
  );
}

export default Departure;
