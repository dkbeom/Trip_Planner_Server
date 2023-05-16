import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import NavBar from '../mainpage/NavBar';
import MapAPI from './Map';
import ScheduleTable from './ScheduleTable';
import JoinButton from './HSH';
import SmallExample from './Table';
import LinkedExample from './Table';

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

const MapWrapper = styled.div`
  width: 600px;
  height: 300px;
  margin-right: 20px;
  background-color: #DDFFFF77;
`;

const ScheduleWrapper = styled.div`
  display: flex;
  flex: 1;
`;

function MainPage() {
  return (
    <Background>
      <NavBar />
      <MainWrapper>
        <MapWrapper>
          <MapAPI />
        </MapWrapper>
        <ScheduleWrapper>
          <LinkedExample />
        </ScheduleWrapper>
      </MainWrapper>
      <JoinButton/>
    </Background>
  );
}

export default MainPage;
