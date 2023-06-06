import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../../mainpage/NavBar';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import SurveyPaper from './SurveyPaper';
import Nav from 'react-bootstrap/Nav';


const Background = styled.div`
  position: fixed;
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: auto;

  background-position: center center;
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const MyPage = () => {
  return (
    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-3">
        <Nav.Item>
          <Nav.Link href="/departure">출발지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/pre-survey" eventKey="link-1">여행 사전 정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/destination" eventKey="link-2">여행지 선택</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">
            여행 추가 정보
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <MainWrapper>
        <Row>
          <SurveyPaper />
        </Row>
      </MainWrapper>
    </Background>
  );
};

export default MyPage;
