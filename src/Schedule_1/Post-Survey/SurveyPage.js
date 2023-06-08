import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../../mainpage/NavBar';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import SurveyPaper from './SurveyPaper';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../mainpage/font.css'


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
  justify-content: center; /* 가운데 정렬로 변경 */
  align-items: center; /* 추가된 부분 */
  padding: 20px;
  background-color: #FFFFFF88; /* 배경색 추가 */
  margin-top: 5vh
`;


const MyPage = () => {

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 123);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Background>
      <NavBar />
      <Nav fill variant="tabs" defaultActiveKey="link-3" >
          <Nav.Link href="/departure" style={{ backgroundColor: 'white', border: '1px solid black'}}>출발지 선택</Nav.Link>
          <Nav.Link href="/pre-survey" eventKey="link-1" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행 사전 정보</Nav.Link>
          <Nav.Link href="/destination" eventKey="link-2" style={{ backgroundColor: 'white', border: '1px solid black' }}>여행지 선택</Nav.Link>
          <Nav.Link href="/post-survey" eventKey="link-3" style={{ backgroundColor: '#BBBBBB', border: '1px solid black', fontWeight: 'bold'}}>여행 추가 정보</Nav.Link>
      </Nav>
      <MainWrapper>
        <Row>
          <SurveyPaper />
        </Row>
      </MainWrapper>
      <div className="dd" style={{textAlign: "center"}}>
        ※위 설문조사는 필수가 아닙니다. 다만, 설문에 답하시면 더 좋은 결과를 얻으실 거예요!
      </div>
      <Container style={{ paddingTop: '50px', textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className={`item ${showButton ? 'show' : ''}`}>
          <Link to="/sample">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: '#F0CC90',
                color: '#121212',
                boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.2)',
              }}
            >
              <div className="fd" style={{ fontSize: '30px' }}>
                스케줄 만들기
              </div>
            </button>
          </Link>
        </div>
      </Container>
    </Background>
  );
};

export default MyPage;
