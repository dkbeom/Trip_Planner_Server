import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';

function LinkedExample() {
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
    };

    const [listItems, setListItems] = useState([
        { text: '강원도' },
        { text: '경기도' },
        { text: '경상남도' },
        { text: '경상북도' },
        { text: '광주광역시' },
        { text: '대구광역시' },
        { text: '대전광역시' },
        { text: '부산광역시' },
        { text: '서울특별시' },
        { text: '세종특별자치시' },
        { text: '울산광역시' },
        { text: '인천광역시' },
        { text: '전라남도' },
        { text: '전라북도' },
        { text: '제주도' },
        { text: '충청남도' },
        { text: '충청북도' },
    ]);

    return (
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item variant="info">
                도
            </ListGroup.Item>

            {listItems.map((item, index) => (
                <ListGroup.Item key={index} action onClick={alertClicked}>
                    {item.text}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default LinkedExample;