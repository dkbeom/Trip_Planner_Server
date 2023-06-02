import { MyContextProvider } from '../provider';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import MyPageMenu from './MyPageMenu';


const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
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
            <MyPageMenu />
          </Row>
        </MainWrapper>
      </Background>
    </MyContextProvider>
  );
};

export default MyPage;
