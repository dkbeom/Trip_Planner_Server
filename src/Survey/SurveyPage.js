import { MyContextProvider } from '../provider';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import SurveyPaper from './SurveyPaper';


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
    <MyContextProvider>
      <Background>
        <NavBar />
        <MainWrapper>
          <Row>
            <SurveyPaper />
          </Row>
        </MainWrapper>
      </Background>
    </MyContextProvider>
  );
};

export default MyPage;
