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
import file2 from '../Sample/debug2';
import { sample2 } from '../Sample/jsonsample';
import '../mainpage/font.css'


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
  position: fixed;
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
  margin-left: 35%;
`;

const ScheduleWrapper = styled.div`
  width: 40vh;
`;

var data;
var day;
var coords = [0, 0];
var coords2 = [0, 0];
var places = 0;
var startTime = 9;
var startPlace = '집';
var doublecheck = 0;
var accom = '숙소';
var transport = localStorage.getItem("transport");
if (localStorage.getItem("response")) {
  var x = localStorage.getItem('x'); // 출발지가 집일 때 설정
  var y = localStorage.getItem('y');
  coords = [x, y];
  data = JSON.parse(localStorage.getItem("response"));
  day = parseInt(localStorage.getItem("pageNum")) - 1;
  if (data.data[day]) {
    var places = data.data[day].length;
    var sample = JSON.stringify(data.data[day][0]);
  }
  if (places > 4) {
    places = 4;
  }
}
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
    var ok = false;
    var a = data.data[day - 1].length;
    for (var i = 0; i < a; i++) {
      if (data.data[day - 1][i].nearByAccommodations[0]) {
        ok = true;
        coords = [data.data[day - 1][i].nearByAccommodations[0].mapX, data.data[day - 1][i].nearByAccommodations[0].mapY]
        startPlace = data.data[day - 1][i].nearByAccommodations[0].title;
      }
      if (ok == false) {
        coords = [data.data[day - 1][i].mapX, data.data[day - 1][i].mapY]
        startPlace = "숙소";
      }
    }
  }
}
if (data && data.data && data.data[day]) {
  if (data) {
    var ok = false;
    var a = data.data[day].length;
    for (var i = 0; i < a; i++) {
      if (data.data[day][i].nearByAccommodations[0]) {
        ok = true;
        coords2 = [data.data[day][i].nearByAccommodations[0].mapX, data.data[day][i].nearByAccommodations[0].mapY]
        accom = data.data[day][i].nearByAccommodations[0].title;
      }
      if (ok == false) {
        coords2 = [data.data[day][i].mapX, data.data[day][i].mapY]
        accom = "숙소";
      }
    }
  }
}
if (localStorage.getItem("Bakil") == day) {
  accom = '집';
  coords2 = [parseFloat(localStorage.getItem("x")), parseFloat(localStorage.getItem("y"))]
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
  function AddLine() {
    var path = [new window.Tmapv3.LatLng(coords[1], coords[0])];
    for (var i = 0; i < places; i++) {
      path.push(new window.Tmapv3.LatLng(data.data[day][i].mapY, data.data[day][i].mapX));
    }
    var polyline = new window.Tmapv3.Polyline({
      path: path,
      strokeColor: "#dd00dd",
      strokeWeight: 6,
    });
    if (mapRef.current) {
      polyline.setMap(mapRef.current);
    }
  }
  function AddMarker() {
    var marker = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(coords[1], coords[0]),
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
  }
  useEffect(() => {
    
    //Tmap의 마운트 오류는 이렇게 잡으면 된다.
    function initialization() {
      const container = document.getElementById('map');
      const map = new window.Tmapv3.Map(container, mapOptions);
      mapRef.current = map;
      map.on("ConfigLoad", function () {
        AddLine()
        AddMarker()
      })
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

  const ResponseDataComponent = ({ data }) => {
    return (
      <div>
        <div>
          소요시간: {(data.features[0].properties.totalTime / 60).toFixed(2)}분
        </div>
        <div>
          운전거리: {data.features[0].properties.totalDistance / 1000}km
        </div>
        <div>
          택시 요금: {data.features[0].properties.taxiFare}원
        </div>
      </div>
    );
  };

  const ResponseDataComponent2 = ({ data }) => {
    var ava = 0;
    if(data.metaData){
      return (
        <div>
          <div>
            소요시간: {(data.metaData.plan.itineraries[0].totalTime / 60).toFixed(2)}분
          </div>
          <div>
            이동거리: {(data.metaData.plan.itineraries[0].totalDistance / 1000)}km
          </div>
          <div>
            환승 횟수: {(data.metaData.plan.itineraries[0].transferCount)}회
          </div>
          <hr/>
          {data.metaData.plan.itineraries[0].legs.map((leg, i) => {
            if (leg.route) {
              ava++;
              return (
                <div>
                  {ava}. {leg.route}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    }
    else if(data.result.message === "출발지와 도착지가 너무 가까움"){
      return(
        <div>
        출발지와 도착지가 너무 가까움
      </div>
      )
    }
    else{
      return(
        <div>
        대중교통 정보가 없습니다. 택시를 이용하세요.
      </div>
      )
    }
  };

  const sendPredictionRequest = async (a, b, c, d) => {
    const url = 'https://apis.openapi.sk.com/tmap/routes/prediction?version=1';
    const appKey = '52DEnq0WzjAg8MuIB9OU8RLLXT5MsW82ZtTl3WUh'; // Replace with your actual app key
    setResult(sample2);
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
        predictionTime: '2023-06-10T09:00:22+0900',
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
      console.log(response.data); // Handle the response data as needed
      setResult(response.data);

    } catch (error) {
      console.log(error); // Handle any errors
    }
  }

  const sendTransitRequest = async (a, b, c, d) => {
    const url = 'https://apis.openapi.sk.com/transit/routes';
    const appKey = '52DEnq0WzjAg8MuIB9OU8RLLXT5MsW82ZtTl3WUh';

    const requestData = {
      startX: a,
      startY: b,
      endX: c,
      endY: d,
      lang: 0,
      format: "json",
      count: 1,
      searchDttm: "202301011200"
    };

    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Accept': 'application/json',
          'appKey': appKey,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data); // Handle the response data as needed
      setResult(response.data);
    } catch (error) {
      console.log(error); // Handle any errors
    }
  };

  return (
    <Background>
      <NavBar />
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
              <Accordion defaultActiveKey="19" style={{ width: "40vw" }}>
                {data.data[day].slice(0, places).map((place, index) => (
                  <div>
                    <Accordion.Item eventKey={(index * 2).toString()} key={index * 2}>
                      {index === 0 && (
                        <Accordion.Header className='dd'>{startTime}시에 {startPlace}에서 {place.title}(으)로 출발!</Accordion.Header>
                      )}
                      {index !== 0 && (
                        <Accordion.Header className='dd'>{data.data[day][index - 1].title}에서 {place.title}(으)로 출발!</Accordion.Header>
                      )}

                      {index === 0 && (transport === "자동차" || (transport === "렌트카" && day !== 0)) && (
                        <Accordion.Body onEnter={() => sendPredictionRequest(coords[0], coords[1], parseFloat(place.mapX), parseFloat(place.mapY))}>
                          {index === 0 && (
                            <h4>{startPlace} → {place.title}</h4>
                          )}
                          {index !== 0 && (
                            <h4>{data.data[day][index - 1].title} → {place.title}</h4>
                          )}
                          <div>
                            교통수단: {localStorage.getItem("transport")}
                          </div>
                          {result && <ResponseDataComponent data={result} />}
                        </Accordion.Body>
                      )}
                      {index !== 0 && (transport === "자동차" || transport === "렌트카") && (
                        <Accordion.Body onEnter={() => sendPredictionRequest(parseFloat(data.data[day][index - 1].mapX), parseFloat(data.data[day][index - 1].mapY), parseFloat(place.mapX), parseFloat(place.mapY))}>
                          {index === 0 && (
                            <h4>{startPlace} → {place.title}</h4>
                          )}
                          {index !== 0 && (
                            <h4>{data.data[day][index - 1].title} → {place.title}</h4>
                          )}
                          <div>
                            교통수단: {localStorage.getItem("transport")}
                          </div>
                          {result && <ResponseDataComponent data={result} />}
                        </Accordion.Body>
                      )}
                      {index === 0 && ((transport === "대중교통") || (transport === "렌트카" && day === 0)) && (
                        <Accordion.Body onEnter={() => sendTransitRequest(coords[0].toString(), coords[1].toString(), place.mapX, place.mapY)}>
                          {index === 0 && (
                            <h4>{startPlace} → {place.title}</h4>
                          )}
                          {index !== 0 && (
                            <h4>{data.data[day][index - 1].title} → {place.title}</h4>
                          )}
                          <div>
                            교통수단: {localStorage.getItem("transport")}
                          </div>
                          {result && <ResponseDataComponent2 data={result} />}
                        </Accordion.Body>
                      )}
                      {index !== 0 && (transport === "대중교통") && (
                        <Accordion.Body onEnter={() => sendTransitRequest(data.data[day][index - 1].mapX, data.data[day][index - 1].mapY, place.mapX, place.mapY)}>
                          {index === 0 && (
                            <h4>{startPlace} → {place.title}</h4>
                          )}
                          {index !== 0 && (
                            <h4>{data.data[day][index - 1].title} → {place.title}</h4>
                          )}
                          <div>
                            교통수단: {localStorage.getItem("transport")}
                          </div>
                          {result && <ResponseDataComponent2 data={result} />}
                        </Accordion.Body>
                      )}


                    </Accordion.Item>
                    <Accordion.Item eventKey={(index * 2 + 1).toString()} key={index * 2 + 1}>
                      <Accordion.Header className='dd'>{place.title} 즐기기!</Accordion.Header>

                      <Accordion.Body>
                        <h4>{place.title}</h4>
                        <div>주소: {place.addr}</div>
                        <div>테마:
                          {place.cat1 === "A01" ? " 자연" : ""}
                          {place.cat1 === "A02" ? " 인문" : ""}
                          {place.cat1 === "A03" ? " 레포츠" : ""}
                        </div>
                        <hr /> {/* 음식점 간 구분선 */}
                        <h5>*근처 음식점*</h5>
                        <hr /> {/* 음식점 간 구분선 */}
                        <div>
                          {place.nearByRestaurants.length > 0 ? (
                            place.nearByRestaurants.map((restaurant) => (
                              <div key={restaurant.id}>
                                <div>음식점 이름: {restaurant.title}</div>
                                <div>주소: {restaurant.addr}</div>
                                <div>카테고리: {restaurant.category}</div>
                                <div>상세 카테고리: {restaurant.detailCategory}</div>
                                <div>거리: {restaurant.distance}km</div>
                                {/* 추가적인 정보 표시 가능 */}
                                <hr /> {/* 음식점 간 구분선 */}
                              </div>
                            ))
                          ) : (
                            <div>근처에 추천해드릴 음식점이 없네요</div>
                          )}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item></div>
                ))}
                <Accordion.Item eventKey={(100).toString()} key={100}>
                  <Accordion.Header className='dd'>{data.data[day][places - 1].title}에서 {accom}(으)로 출발!</Accordion.Header>
                  {(transport === "자동차" || (transport === "렌트카" && accom !== '집')) && (
                    <Accordion.Body onEnter={() => sendPredictionRequest(parseFloat(data.data[day][places - 1].mapX), parseFloat(data.data[day][places - 1].mapY), coords2[0], coords2[1])}>
                      <h4>{data.data[day][places - 1].title} → {accom}</h4>
                      <div>
                        교통수단: {localStorage.getItem("transport")}
                      </div>
                      {result && <ResponseDataComponent data={result} />}
                    </Accordion.Body>
                  )}
                  {(transport === "대중교통" || (transport === "렌트카" && accom === '집')) && (
                    <Accordion.Body onEnter={() => sendTransitRequest(data.data[day][places - 1].mapX, data.data[day][places - 1].mapY, coords2[0].toString(), coords2[1].toString())}>
                      <h4>{data.data[day][places - 1].title} → {accom}</h4>
                      <div>
                        교통수단: {localStorage.getItem("transport")}
                      </div>
                      {result && <ResponseDataComponent2 data={result} />}
                    </Accordion.Body>
                  )}
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
    </Background>
  );
}

export default Departure;
