import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from './provider';
import { Button, Col, Container, Form, Popover } from 'react-bootstrap';

function TripList() {
  const { tripList, deleteTripList } = useContext(MyContext);
  const { inputValue, setInputValue } = useContext(MyContext);
  const { displayValue, setDisplayValue, departure } = useContext(MyContext);
  const [radioButton, setRadioButton] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayValue(inputValue);
  };

  useEffect(() => {
    console.log(radioButton);
  }, [radioButton]);

  return (
    <Col style={{ marginLeft: '10vh', width: '30vh' }}>
      <ListGroup style={{ width: '60vh', background: '#FFFFFF' }}>
        <ListGroup.Item variant="primary" style={{ textAlign: 'center' }}>
          출발지
        </ListGroup.Item>
        <Form style={{ width: '50vh', marginLeft: '5vh', marginTop: '2vh' }} onSubmit={handleFormSubmit}>
          <Form.Group className="place" controlId="place">
            <Form.Control
              type="place"
              placeholder="주소를 자유롭게 입력하세요."
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked={radioButton === 0}
              onChange={() => setRadioButton(0)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              지번 주소로 찾기
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={radioButton === 1}
              onChange={() => setRadioButton(1)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              도로명 주소로 찾기
            </label>
          </div>
        </Form>
        <Container style={{ height: '3vh' }} />
        <ListGroup.Item style={{ textAlign: 'center' }}>
          {departure}
        </ListGroup.Item>
        <Container style={{ height: '3vh' }} />
        <ListGroup.Item style={{ textAlign: 'center' }}>
          {departure}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default TripList;
