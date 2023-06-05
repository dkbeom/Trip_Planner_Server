/*global kakao*/
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MyContext } from '../provider';

var coords = [0, 0];

function App() {
    const [mapOptions, setMapOptions] = useState({
        center: new window.Tmapv3.LatLng(35.8714, 128.75),
        width: "95%",
        height: "100%",
        zoom: 6
    });
    const { tripList, displayValue, departure, option, touchHome, setDeparture, setOption } = useContext(MyContext);
    const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
    const mapRef = useRef(null);

    useEffect(() => {
        
        console.log(option);
        const geocoder = new kakao.maps.services.Geocoder();
        if (displayValue !== "") {
            setOption(1);
            geocoder.addressSearch(displayValue, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const kakao_coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    coords[0] = result[0].y;
                    coords[1] = result[0].x;

                    const geocoder2 = new kakao.maps.services.Geocoder();
                    geocoder2.coord2Address(kakao_coords.getLng(), kakao_coords.getLat(), function (result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            var address = "주소를 찾을 수 없습니다.";
                            if(result[0].road_address != null){
                                address = result[0].road_address.address_name;
                            }
                            // 주소를 이용하여 원하는 작업을 수행할 수 있습니다.
                            setDeparture(address);
                        }
                    });
                }
            });
        }
        if(tripList.length !== 0){
            setOption(1);
            tripList.forEach((address) => {
                geocoder.addressSearch(address, function (result, status) {
                  // 정상적으로 검색이 완료됐으면 
                  if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.Tmapv3.Marker({
                        position: new window.Tmapv3.LatLng(coords.getLat(), coords.getLng()),
                        icon: imageSrc[1],
                        iconSize: new window.Tmapv3.Size(32, 32),
                    });
                    marker.setMap(mapRef.current);
                  }
                });
              });
        }


        function initialization() {

            const container = document.getElementById('map');
            const map = new window.Tmapv3.Map(container, mapOptions);
            mapRef.current = map;
            
        var marker = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(localStorage.getItem("y"), localStorage.getItem("x")),
            icon: imageSrc[0],
            iconSize: new window.Tmapv3.Size(32, 32),
        });
        marker.setMap(mapRef.current);
            marker.setMap(null);
            marker.setMap(mapRef.current);
            console.log("changed");
        }
        if (!mapRef.current) {
            initialization();
        }
        else if (option === 1) {
            mapRef.current.destroy();
            initialization();
        }
    }, [tripList, displayValue, departure, mapOptions, touchHome]);


    function resetMap() {
        setOption(1); 
        setMapOptions({
            center: new window.Tmapv3.LatLng(35.8714, 128.75),
            zoom: 6
        });
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '95%',
            width: '95%',
            backgroundColor: '#DDFFFF77'
        }}>
            <div id="map" />
            <button type="button" className="btn btn-success" style={{ marginTop: '10px' }} onClick={resetMap}>원래대로</button>
        </div>
    );
}

export default App;
