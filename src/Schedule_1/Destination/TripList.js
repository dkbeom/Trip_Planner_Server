import ListGroup from 'react-bootstrap/ListGroup';
import TableComponent from './Table';
import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from '../provider';
import { Button, Col, Container, Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var e = true;

function TripList() {
    const { tripList, deleteTripList, advancedTripList, setAdvancedTripList, setTouchHome } = useContext(MyContext);
    const { inputValue, setInputValue } = useContext(MyContext);
    const { displayValue, setDisplayValue, departure } = useContext(MyContext);
    /*
    useEffect(() => {
        // Remove items from advancedTripList that don't have matching names with tripList
        const updatedList = advancedTripList.filter((item) =>
          tripList.includes(item.address)
        );
      
        // Update the state and store the updated list in local storage
        setAdvancedTripList(updatedList);
        localStorage.setItem('advancedTripList', JSON.stringify(updatedList));
      }, [tripList]);
      */

    const handleClick = (index) => {
        if(!e){
            e = true;
        }
        else{
            setTouchHome(index);
        }
    }

    const handleDeletion = (index) => {
        e = false;
        deleteTripList(index);
        const updatedTripList = tripList.filter((_, i) => i !== index);
        // Remove items from advancedTripList that are not in tripList
        const updatedList = advancedTripList.filter((item) =>
            updatedTripList.includes(item.address)
        );

        // Update the state and store the updated list in local storage
        setAdvancedTripList(updatedList);
        localStorage.setItem('advancedTripList', JSON.stringify(updatedList));
    }
    return (
        <DropdownButton id="dropdown-item-button" title="여행할 곳">
            <Dropdown.ItemText style={{ background: "#99BBFF", width: "20vw" }}>X 버튼을 눌러서 목적지를 삭제!</Dropdown.ItemText>
            {tripList.map((item, index) => (
                <Dropdown.Item key={index} onClick={() => handleClick(index)}>
                    <div>
                        {item}
                        <Button
                            variant="secondary"
                            onClick={() => handleDeletion(index)}
                            style={{ marginLeft: '5px', padding: '2px', width: '20px', height: '20px', fontSize: '12px' }}
                        >
                            X
                        </Button>
                    </div>
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );


}

export default TripList;