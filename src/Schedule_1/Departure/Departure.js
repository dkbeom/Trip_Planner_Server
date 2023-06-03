import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Tmap from './Tmap';
import TripList from './tripList';
import { Row, Col } from 'react-bootstrap';
import { MyContextProvider } from './provider';
import { useEffect, useState } from 'react';

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
  margin-left: 10vh;
`;

const ScheduleWrapper = styled.div`
  width: 30vh;
`;


function Departure() {
 
  return (
    <MainWrapper>
      <MyContextProvider>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
              <TripList />
            </ScheduleWrapper>
          </Col>
          <Col xs={6}>
            <MapWrapper>
              <Tmap />
            </MapWrapper>
          </Col>
        </Row>
      </MyContextProvider>
    </MainWrapper>
  );
}

export default Departure;
