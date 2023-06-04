import ListGroup from 'react-bootstrap/ListGroup';
import React, { useContext } from 'react';
import { MyContext } from '../provider';
import { Button, Col, Container, Form } from 'react-bootstrap';
import '../../mainpage/font.css'

function TripList() {
  const { inputValue, setInputValue } = useContext(MyContext);
  const { setDisplayValue, departure } = useContext(MyContext);
  const { finalDeparture, setFinalDeparture } = useContext(MyContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDisplayValue(inputValue);
  };

  const handleButtonClick = (dpt) => {
    setFinalDeparture(dpt);
    localStorage.setItem("finalDeparture", dpt);
  };
  return (
    <Col style={{ marginLeft: '40%', width: '30%' }}>
      <ListGroup style={{ width: '60vh', background: '#FFFFFF' }}>
        <ListGroup.Item variant="secondary" style={{ textAlign: 'center' }}>
          <div className='dd'>출발지 검색</div>
        </ListGroup.Item>
        <Form style={{ width: '50vh', marginLeft: '5vh', marginTop: '2vh' }} onSubmit={handleFormSubmit}>
          <Form.Group className="place" controlId="place">
            <Form.Control className='sd'
              type="place"
              placeholder="주소를 자유롭게 입력하세요."
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
        <Container style={{ height: '3vh' }} />
        <ListGroup.Item style={{ textAlign: 'center' }}/>
        <ListGroup.Item style={{ textAlign: 'center' }}>
          {departure.map((address, index) => (
            <div key={index} className='sd'>
              <Button variant="light" style={{ width: '50vh' }} onClick={() => handleButtonClick(departure[index])}>
                {address}
              </Button>
            </div>
          ))}          
        <Container style={{ height: '2vh' }} />
        </ListGroup.Item>
        </ListGroup>
        <Container style={{height: '3vh'}}/>
        <ListGroup style={{ width: '60vh', background: '#FFFFFF' }}>
        <ListGroup.Item variant="primary" style={{ textAlign: 'center' }}>
          <div className='dd'> 출발지</div>
        </ListGroup.Item>
        <ListGroup.Item style={{ textAlign: 'center' }}>
          
        {localStorage.getItem("finalDeparture") === "" ? (
          <div className='sd'>{finalDeparture}</div>
        ) : (
          <div className='sd'>{localStorage.getItem("finalDeparture")}</div>
        )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default TripList;
