/*global kakao*/
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MyContext } from '../provider';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

function ReportMap() {
    const [mapOptions, setMapOptions] = useState({
        center: new window.Tmapv3.LatLng(localStorage.getItem("y"), localStorage.getItem("x")),
        width: "80vh",
        height: "30vh",
        zoom: 15
    });
    const { displayValue, option, finalDeparture, touchHome, mapRef, setDeparture, setOption } = useContext(MyContext);
    const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png"];

    useEffect(() => {
        var marker = new window.Tmapv3.Marker({
            position: new window.Tmapv3.LatLng(localStorage.getItem("y"), localStorage.getItem("x")),
            icon: imageSrc[0],
            iconSize: new window.Tmapv3.Size(32, 32),
        });
        marker.setMap(mapRef.current);

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
    }, []);

    return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div id="map" />
        </div>
      );
      
}

export default ReportMap;
