import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './schedule.css';

function ScheduleTable() {
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

  const handleClick = (id) => {
    console.log(`Clicked on item ${id}`);
  };
  return (
    <div>
      <div>
        dh
      </div>
        <div
          className="sc_container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: '60vh',
            width: '20vh',
            overflow: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table>
              <tbody>
                {listItems.map((item, index) => (
                  <tr key={index} onClick={() => handleClick(index)}>
                    <td>{item.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default ScheduleTable;