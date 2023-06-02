import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useContext } from 'react';
import { MyContext } from './provider';
import { Button, Col, Container, Form } from 'react-bootstrap';

function TripList() {
  const { tripList, deleteTripList } = useContext(MyContext);
  const {inputValue, setInputValue} = useContext(MyContext);
  const {displayValue, setDisplayValue, departure} = useContext(MyContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayValue(inputValue);
  };

  return (
    <Col style={{marginLeft: "10vh", width: "15vh"}}>
    
    <ListGroup style={{ width: '40vh'}}>
      <ListGroup.Item variant="primary" style={{ textAlign: 'center' }}>
        출발지
      </ListGroup.Item>
        <Form style={{ width: '40vh' }} onSubmit={handleFormSubmit}>
          <Form.Group className="place" controlId="place">
            <Form.Control
              type="place"
              placeholder="주소를 자유롭게 입력하세요."
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      <ListGroup.Item style={{ textAlign: 'center' }}>
        {departure}
      </ListGroup.Item>
    <Container style={{height: "3vh"}}/>
    </ListGroup>
    </Col>
  );
}

export default TripList;