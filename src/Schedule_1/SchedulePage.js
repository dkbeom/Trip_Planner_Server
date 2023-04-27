import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import './schedule.css';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

function SchedulePage() {

  const [listItems, setListItems] = useState([
    { text: '경기도' },
    { text: '강원도' },
    { text: '경상북도' },
    { text: '경상남도' },
    { text: '제주도' }
  ]);

  const handleClick = (id) => {
    console.log(`Clicked on item ${id}`);
  };
  return (
    <Background>
      <div className="sc_container">
        <table>
          <thead>
            <tr>
              <th>도</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item) => (
              <tr key={item.id} onClick={() => handleClick(item.id)}>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Background>
  );
}

export default SchedulePage;