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
import file2 from '../Sample/debug2';


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


function App() {
  var coords = [0, 0];
  var x = localStorage.getItem('x'); // 출발지가 집일 때 설정
  var y = localStorage.getItem('y');
  var data = JSON.parse(localStorage.getItem("response"));
  var day = parseInt(localStorage.getItem("pageNum")) - 1;
  var places = data.data[day].length;
  if(places > 4){
    places = 4;
  }
  var sample = JSON.stringify(data.data[day][0]);
  const [mapOptions, setMapOptions] = useState({
    center: new window.Tmapv3.LatLng(35.8714, 128.75),
    width: "95vh",
    height: "60vh",
    zoom: 6
  });
  const { displayValue, option, finalDeparture, touchHome, mapRef, setTouchHome, setDeparture, setOption, setFinalDeparture } = useContext(MyContext);
  const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
  var res = file2(x, y, data.data[day][0].mapX, data.data[day][0].mapY);
  console.log(res);
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

  const handleReload = () =>{
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
  var coords = [0, 0];
  var x = localStorage.getItem('x');
  var y = localStorage.getItem('y');
  var data = JSON.parse(localStorage.getItem("response"));
  var day = parseInt(localStorage.getItem("pageNum")) - 1;
  var places = data.data[day].length;
  var sample = JSON.stringify(data.data[day][0]);
  return (
    <Background>
      <NavBar />
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
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
