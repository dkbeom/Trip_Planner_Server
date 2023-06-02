import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Tmap from './Tmap';
import TripList from './tripList';
import { Row } from 'react-bootstrap';
import { MyContextProvider } from './provider';

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MapWrapper = styled.div`
  width: 500px;
  background-color: #DDFFFF77;
  display: flex;
  flex: 1;
`;

const ScheduleWrapper = styled.div`
width: 100px;
`;


function Departure() {
  return (
    <MainWrapper>
      <MyContextProvider>
    <Row>
  <div class="row align-items-start">
    <div class="col">
        <ScheduleWrapper>
          <TripList />
        </ScheduleWrapper>
    </div>
    <div class="col">
        <MapWrapper>
          <Tmap />
        </MapWrapper>
    </div>
  </div>
    </Row>
      </MyContextProvider>
  </MainWrapper>
  );
}

export default Departure;