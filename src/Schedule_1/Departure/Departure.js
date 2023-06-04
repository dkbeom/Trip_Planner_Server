import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Tmap from './Tmap';
import TripList from './tripList';
import { Row, Col } from 'react-bootstrap';
import PlacementExample from './toast'
import { MyContext } from '../provider';
import { useContext } from 'react';

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
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
      <PlacementExample />
    </MainWrapper>
  );
}

export default Departure;
