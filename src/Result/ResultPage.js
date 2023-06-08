/*global kakao*/
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavBar from '../mainpage/NavBar';
import Tmap from './Tmap'
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MyContext } from '../Schedule_1/provider';
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios';


const Background = styled.div`
background-image: url('/loginpage_background.png');
background-size: cover;
width: 100%;
min-height: 100vh; /* 최소 높이로 설정 */
background-position: center center;
background-attachment: fixed; /* 배경 이미지를 고정 */
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

var data;
var day;
var coords = [0, 0];
if (localStorage.getItem("response")) {
  var x = localStorage.getItem('x'); // 출발지가 집일 때 설정
  var y = localStorage.getItem('y');
  coords = [x, y];
  data = JSON.parse(localStorage.getItem("response"));
  day = parseInt(localStorage.getItem("pageNum")) - 1;
  var places = 0;
  if (data.data[day]) {
    var places = data.data[day].length;
    var sample = JSON.stringify(data.data[day][0]);
  }
  if (places > 4) {
    places = 4;
  }
}
var startTime = 9;
var startPlace = '집';
if (day == 0) {
  if (localStorage.getItem("startTime1")) {
    startTime = localStorage.getItem("startTime1");
  }
}
else {
  if (localStorage.getItem("startTime2")) {
    startTime = localStorage.getItem("startTime2");
  }
}
if (data && data.data && data.data[day - 1]) {
  if (data) {
    var a = data.data[day - 1].length;
    for (var i = 0; i < a; i++) {
      if (data.data[day - 1][i].nearByAccommodations[0]) {
        coords = [data.data[day - 1][i].nearByAccommodations[0].mapX, data.data[day - 1][i].nearByAccommodations[0].mapY]
        startPlace = data.data[day - 1][i].nearByAccommodations[0].title;
      }
    }
  }
}

//coords: 처음 출발지
//data: 여행 정보 전체 json
//day: 몇번째 날인지. 0부터 시작
//places: 해당 날에 할당된 여행지
//startTime: 출발시간
////////////////////////////////
//구현해야할 것: startTime1, startTime2 localStorage에 저장

function App() {
  const [mapOptions, setMapOptions] = useState({
    center: new window.Tmapv3.LatLng(35.8714, 128.75),
    width: "95vh",
    height: "60vh",
    zoom: 6
  });
  const { displayValue, option, finalDeparture, touchHome, mapRef, setTouchHome, setDeparture, setOption, setFinalDeparture } = useContext(MyContext);
  const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
  useEffect(() => {
    var marker = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(y, x),
      icon: imageSrc[0],
      iconSize: new window.Tmapv3.Size(32, 32),
    });
    marker.setMap(mapRef.current);
    for (var i = 0; i < places; i++) {
      var marker1 = new window.Tmapv3.Marker({
        position: new window.Tmapv3.LatLng(data.data[day][i].mapY, data.data[day][i].mapX),
        icon: imageSrc[1],
        iconSize: new window.Tmapv3.Size(32, 32),
      })
      marker1.setMap(mapRef.current);
    }

    //Tmap의 마운트 오류는 이렇게 잡으면 된다.
    function initialization() {
      const container = document.getElementById('map');
      const map = new window.Tmapv3.Map(container, mapOptions);
      mapRef.current = map;
    }
    if (!mapRef.current) {
      initialization();
    }
    else if (option === 1) {
      mapRef.current.destroy();
      initialization();
    }
  }, [displayValue, mapOptions, finalDeparture, touchHome]);

  const handleReload = () => {
    window.location.reload();
  }
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
    }}>
      <div id="map" />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <button type="button" className="btn btn-success" style={{ marginTop: '10px' }} onClick={handleReload}>
          <div className='sd'>원래대로</div>
        </button>
      </div>
    </div>
  );

}


function Departure() {
  const [result, setResult] = useState(null);
  useEffect(() => {
    const sendPredictionRequest = async (a, b, c, d) => {
      const url = 'https://apis.openapi.sk.com/tmap/routes/prediction?version=1';
      const appKey = 'iMIjpehulFaBDBzBhOiqY10fiMy5JbbN8UlEySE5'; // Replace with your actual app key

      const requestData = {
        routesInfo: {
          departure: {
            name: 'test1',
            lon: a,
            lat: b,
          },
          destination: {
            name: 'test2',
            lon: c,
            lat: d,
          },
          predictionType: 'arrival',
          predictionTime: '2023-06-07T09:00:22+0900',
        },
      };

      try {
        const response = await axios.post(url, requestData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            appKey: appKey,
          },
        });
        setResult(response);
        console.log(result); // Handle the response data as needed

      } catch (error) {
        console.log(error); // Handle any errors
      }
    };

    if (coords.x && coords.y && data && data.data && data.data[day] && data.data[day][0]) {
      sendPredictionRequest(coords.x, coords.y, data.data[day][0].mapX, data.data[day][0].mapY);
    }
  }, [data, day]);
  return (
    <Background>
      <NavBar />
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
              <Accordion defaultActiveKey="19" style={{ width: "40vw" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{startTime}시에 {startPlace}에서 {data.data[day][0].title}으로 출발!</Accordion.Header>
                  <Accordion.Body>
                    hello
                    {result && result.features && result.features.length > 0 && (
                      <div>
                        {result.features[0].properties.totalDistance}
                      </div>
                    )}
                  </Accordion.Body>

                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Accordion Item #2</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </ScheduleWrapper>
          </Col>
          <Col xs={6}>
            <MapWrapper>
              <App />
            </MapWrapper>
          </Col>
        </Row>
      </MainWrapper>
      <div>{sample}</div>
    </Background>
  );
}

export default Departure;
