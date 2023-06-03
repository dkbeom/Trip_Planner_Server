/*global kakao*/
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MyContext } from './provider';
import { Container, Row } from 'react-bootstrap';

var coords = [0, 0];
var x = 0.0;
var y = 0.0;

function App() {
    const [mapOptions, setMapOptions] = useState({
        center: new window.Tmapv3.LatLng(35.8714, 128.75),
        width: "95vh",
        height: "60vh",
        zoom: 6
    });
    const { tripList, displayValue, departure, option, finalDeparture, setDeparture, setOption } = useContext(MyContext);
    const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
    const mapRef = useRef(null);

    useEffect(() => {
        console.log(option); //초기상태가 아님을 표시
        const geocoder = new kakao.maps.services.Geocoder();
        if (displayValue !== "") {
            setOption(1);
            geocoder.addressSearch(displayValue, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const kakao_coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    coords[0] = result[0].y;
                    coords[1] = result[0].x;

                    var addressList = []; // 주소를 담을 리스트 생성
                    var maxAddressCount = 6; // 최대 주소 개수
                    var resultLength = Object.keys(result).length; // result의 길이 저장
                    console.log("list num: %d", resultLength);
                    console.log(result);

                    for (var i = 0; i < Math.min(maxAddressCount, resultLength); i++) {
                        var address = "";
                        if (result[i].address != null) {
                            address = result[i].address.address_name;
                        }
                        if (result[i].road_address != null || result[i].road_address != null && address === "") {
                            address = result[i].road_address.address_name;
                        }
                        addressList.push(address);
                    }
                    setDeparture(addressList);
                }
            });
        }
        if (finalDeparture != "") {
            geocoder.addressSearch(finalDeparture, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.Tmapv3.Marker({
                        position: new window.Tmapv3.LatLng(coords.getLat(), coords.getLng()),
                        icon: imageSrc[0],
                        iconSize: new window.Tmapv3.Size(32, 32),
                    });
                    x = coords.getLng();
                    y = coords.getLat();
                    marker.setMap(mapRef.current);
                }
            });
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
    }, [displayValue, mapOptions, finalDeparture]);

    function resetMap() {
        setOption(1);
        setMapOptions({
            center: new window.Tmapv3.LatLng(35.8714, 128.75),
            zoom: 6
        });
    }

    function detail(){
        console.log(x);
        console.log(y);
        if(x * y > 0){
            setOption(1);
            setMapOptions({
                center: new window.Tmapv3.LatLng(y, x),
                zoom: 13
            })
        }
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
            <button type="button" className="btn btn-success" style={{ marginTop: '10px' }} onClick={resetMap}>
              원래대로
            </button>
            <Container style={{width:"3vh"}}/>
            <button type="button" className="btn btn-warning" style={{ marginTop: '10px' }} onClick={detail}>
              출발지 자세히 보기
            </button>
          </div>
        </div>
      );
      
}

export default App;
