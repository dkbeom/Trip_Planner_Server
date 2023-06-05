import ListGroup from 'react-bootstrap/ListGroup';
import TableComponent from './Table';
import React, { useState, useContext } from 'react';
import { MyContext } from '../provider';
import { Button, Col, Container, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TripList() {
    const { tripList, deleteTripList } = useContext(MyContext);
    const { inputValue, setInputValue } = useContext(MyContext);
    const { displayValue, setDisplayValue, departure } = useContext(MyContext);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setDisplayValue(inputValue);
    };

    console.log(TableComponent.tripList)
    return (
        <DropdownButton id="dropdown-item-button" title="여행할 곳" style={{ width: '80vh' }}>
            <Dropdown.ItemText style={{ background: "#99BBFF" }}>X 버튼을 눌러서 목적지를 삭제!</Dropdown.ItemText>
            {tripList.map((item, index) => (
                <Dropdown.Item as="button">
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
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default TripList;