import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Forms from './Forms'
import Report from './report'
import Nav from 'react-bootstrap/Nav';
import NavBar from '../../mainpage/NavBar';
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
`;


const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function Departure() {

  const {transport, value1, value2, bakil, allowButton} = useContext(MyContext);
  return (

    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link href="/departure" style={{ backgroundColor: 'white', border: '1px solid black' }}>출발지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/pre-survey" eventKey="link-1" style={{ backgroundColor: '#BBBBBB', border: '1px solid black', fontWeight: 'bold'}}>여행 사전 정보</Nav.Link>
        </Nav.Item>
        {(!allowButton) ? (
          <Nav.Link href="/destination" eventKey="link-2" disabled style={{ border: '1px solid black' }}>여행지 선택</Nav.Link>
        ) : (
          <Nav.Link href="/destination" eventKey="link-2" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행지 선택</Nav.Link>
        )}
        <Nav.Item>
          <Nav.Link eventKey="link-3" disabled style={{border: '1px solid black' }}>
            여행 추가 정보
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
