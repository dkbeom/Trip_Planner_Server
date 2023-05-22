import ListGroup from 'react-bootstrap/ListGroup';
import TableComponent from './Table';
import React, { useState, useContext } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { MyContext } from './provider';
import { Button } from 'react-bootstrap';

function TripList() {
  const [activeItem2, setActiveItem2] = React.useState('');
  const { tripList, deleteTripList } = useContext(MyContext);
  console.log(TableComponent.tripList)
  return (
    <ListGroup style={{ width: '50vh', marginLeft: '10vh' }}>
      <ListGroup.Item variant="primary" style={{ textAlign: 'center' }}>
        여행할 곳
      </ListGroup.Item>
      <ListGroup.Item>
        {tripList.map((item, index) => (
          <li key={index}>
            {item}
            <Button
              variant="secondary"
              onClick={() => deleteTripList(index)}
              style={{ marginLeft: '5px', padding: '2px', width: '20px', height: '20px', fontSize: '12px' }}
            >
              X
            </Button>
          </li>
        ))}
      </ListGroup.Item>
    </ListGroup>
  );
}

export default TripList;