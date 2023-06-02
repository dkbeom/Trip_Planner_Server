import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Tmap from './Tmap';
import TripList from './tripList';
import { Row, Col } from 'react-bootstrap';
import { MyContextProvider } from './provider';

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 1100px;
  height: 680px;
`;

const ScheduleWrapper = styled.div`
  margin-right: 20px;
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
