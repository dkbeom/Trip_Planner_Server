
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import SchedulePage from './ScheduleTable';
import NavBar from '../mainpage/NavBar';
import MapAPI from './Map';

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
          <NavBar/>
          <MapAPI/>
          <SchedulePage/>
        </Background>
    );
}

export default MainPage;