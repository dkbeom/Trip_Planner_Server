/*global kakao*/
import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from './provider';

const MapAPI = () => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [mapOptions, setMapOptions] = useState({
    center: new kakao.maps.LatLng(35.8714, 128.55),
    level: zoomLevel
  });
  const {tripList, setTripList} = useContext(MyContext);
  useEffect(() => {
    const container = document.getElementById('map');
    const map = new kakao.maps.Map(container, mapOptions);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 리스트의 각 항목을 검색하여 마커를 찍습니다
    tripList.forEach((address) => {
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            position: coords,
            map: map
          });
        }
      });
    });
  }, [mapOptions, tripList]);

  const handleZoomBack = () => {
    setZoomLevel(13);
    setMapOptions({
      center: new kakao.maps.LatLng(35.8714, 128.55),
      level: 13
    });
  }



  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 250px)',
      backgroundColor: '#DDFFFF77'
    }}>
      <div id="map" style={{ width: '600px', height: '600px' }}></div>
      <button type="button" class="btn btn-success" style={{ marginTop: '10px' }} onClick={handleZoomBack}>원래대로</button>
    </div>
  );
};

export default MapAPI;