import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavBar from '../../mainpage/NavBar';
import TMap from './Map'
import Table from './Table'
import { MyContext, MyScheduleContextProvider } from '../provider';
import { useContext } from 'react';
import TripList from './TripList';

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

const TripListWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
`;

function Destination() {
  const {advancedTripList} = useContext(MyContext);
  return (
    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-2" >
          <Nav.Link href="/departure" style={{ backgroundColor: 'white', border: '1px solid black'}}>출발지 선택</Nav.Link>
          <Nav.Link href="/pre-survey" eventKey="link-1" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행 사전 정보</Nav.Link>
          <Nav.Link href="/destination" eventKey="link-2" style={{ backgroundColor: '#BBBBBB', border: '1px solid black', fontWeight: 'bold' }}>여행지 선택</Nav.Link>
        {advancedTripList.length === 0 ? (
          <Nav.Link href="/post-survey" eventKey="link-3" disabled style={{border: '1px solid black'}}>여행 추가 정보</Nav.Link>
        ) : (
          <Nav.Link href="/post-survey" eventKey="link-3" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행 추가 정보</Nav.Link>
        )}
      </Nav>
      <MainWrapper>
        <Row>
          <Col xs={6} style={{marginLeft: "10vh", width: "70vh"}}>
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
