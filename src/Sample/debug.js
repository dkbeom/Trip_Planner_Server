import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import NavBar from '../mainpage/NavBar';
import { MyContext, MyContextProvider } from './provider';
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image';
import Pagination from 'react-bootstrap/Pagination';
import { sample1 } from './jsonsample'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from './debug3';
import { useContext } from 'react';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

const MainWrapper = styled.div`
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
  margin-left: 30%;
`;

const ScheduleWrapper = styled.div`
  width: 40vh;
`;


let sample;
//sample = sample1; //디버깅할 때 아니면 꺼두자
//localStorage.setItem("response", JSON.stringify(sample)); //이것두

const handleClick = () => {

}

const result = (num1, num2) => {
  return (
    <div>
      <Card style={{ width: '20vw' }}>
        <Card.Img
          variant="top"
          src={sample.data[num1][num2].image}
          onError={(e) => {
            e.target.src = '/no_image.png'; // 대체할 로컬 이미지 경로
          }}
          style={{ width: '20vw', height: '20vw' }}
        />
        <Card.Body>
          <Card.Title>{sample.data[num1][num2].title}</Card.Title>
          <Card.Text>
            {sample.data[num1][num2].addr}
          </Card.Text>
          <DropdownButton id="dropdown-item-button" title="가까운 식당">
            {sample &&
              sample.data[num1][num2].nearByRestaurants.map((restaurant, index) => (
                <Dropdown.Item key={index} onClick={() => handleClick()} style={{ background: "#FFFFFF", width: "20vw" }}>
                  <div>{restaurant.title}</div>
                  <div>{restaurant.addr}</div>
                </Dropdown.Item>
              ))}
          </DropdownButton>

        </Card.Body>
      </Card>
    </div>
  )
}


function Departure() {
  const [hello, setHello] = useState('현재 상황: 스케줄을 만들고 있습니다. 기다려주세요!');
  const tripListString = localStorage.getItem("advancedTripList");
  const tripList = JSON.parse(tripListString);
  const { showmap, setShowMap } = useContext(MyContext);
  const [active, setActive] = useState(1);
  const area = tripList.map((item) => {
    const { address, lat, lng } = item;
    const addressParts = address.split(" ");
    var areaName = addressParts[0].replace("광역시", "").replace("특별시", "");
    var sigunguName = "";

    if (addressParts.length > 1) {
      sigunguName = addressParts[1].split(" ")[0];
    } else {
      sigunguName = addressParts[1];
    }
    return {
      areaName,
      sigunguName
    };
  });
  var travelDuration = parseInt(localStorage.getItem("Bakil")) + 1;
  const [formData, setFormData] = useState({
    "currentX": localStorage.getItem("x"),

    "currentY": localStorage.getItem("y"),

    "areas": area,

    "categories": ["A01", "A02", "A03", "C01"],

    "foodPreferences": ["국물요리", "고기", "면/분식"],

    "travelDuration": travelDuration
  });
  useEffect(() => {
    const apiRequest = axios.create({
      timeout: 600000, // 10 minutes timeout
    });
    console.log(formData);
    if (!localStorage.getItem("response")) {
      apiRequest
        .post('http://43.201.19.87:8080/tourApi/areaBased', formData)
        .then((response) => {
          localStorage.setItem("response", JSON.stringify(response));
          setHello("현재 상황: 추천 장소를 받아왔습니다!");
          console.log(response);
          sample = response;
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      setHello("현재 상황: 추천 장소를 받아왔습니다!");
      sample = JSON.parse(localStorage.getItem("response"));
    }
    if(localStorage.getItem("pageNum")){
      setActive(parseInt(localStorage.getItem("pageNum")));
    }
  }, []);
  let items = [];
  const handlePageChange = (pageNumber) => {
    setActive(pageNumber);
    localStorage.setItem("pageNum", pageNumber);
    // 페이지 변경에 따른 추가 동작 수행
    // 예: 해당 페이지 데이터를 가져오기
  };
  for (let number = 1; number <= parseInt(localStorage.getItem("Bakil")) + 1; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handlePageChange(number)}>
        {number}일차
      </Pagination.Item>,
    );
  }

  const handleMapReading = () => {
    setShowMap(true);
  }
  return (
    <Background>
      <NavBar />
      <Alert variant="primary">
        <Alert.Heading className='dd' style={{ textAlign: "center" }}>
          {hello}
        </Alert.Heading>
      </Alert>
      <div style={{ display: "flex", justifyContent: "center", gap: "10vh", margin: "0 auto" }}>
        {sample &&
          sample.data[active - 1].map((data, index) => (
            index <= 3 && (
              <div key={index}>
                {result(active - 1, index)}
              </div>
            )
          ))}
      </div>
      {!sample &&
        <div style={{ display: "flex", justifyContent: "center", marginTop: "27.2vh", height: "27.2vh" }}>
          <Spinner animation="border" variant="primary" style={{ width: "100px", height: "100px" }} />
        </div>}

      <div style={{ display: "flex", justifyContent: "center", }}>
        <Pagination size="lg" style={{ display: "flex", justifyContent: "center", marginTop: "5vh", marginRight: "5vh" }}>{items}</Pagination>
        <Button variant='success' style={{ width: "12vh", height: "5vh", marginTop: "5vh" }}  href='/result'>스케줄 보기</Button>
      </div>
    </Background>
  );
}

export default Departure;
