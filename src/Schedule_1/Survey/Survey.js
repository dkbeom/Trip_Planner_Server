import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Forms from './Forms'

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
`;


function Departure() {

  return (
    <MainWrapper>
      <Row>
        <Col xs={6}>
            <Forms/>
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
