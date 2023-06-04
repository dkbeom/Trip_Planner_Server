import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
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
          </ScheduleWrapper>
        </Col>
        <Col xs={6}>
          <MapWrapper>
          </MapWrapper>
        </Col>
      </Row>
    </MainWrapper>
  );
}

export default Departure;
