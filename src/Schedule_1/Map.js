/*global kakao*/
import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from './provider';
import TMAP from './Tmap';

const MapAPI = () => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [mapOptions, setMapOptions] = useState({
    center: new kakao.maps.LatLng(35.8714, 128.55),
    level: zoomLevel
  });
  const { tripList, displayValue, departure, setDeparture } = useContext(MyContext);
  var imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
  var imageSize = new kakao.maps.Size(32, 32); // 마커이미지의 크기입니다
  var imageOption = { offset: new kakao.maps.Point(16, 32) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  var markerImage = [new kakao.maps.MarkerImage(imageSrc[0], imageSize, imageOption), new kakao.maps.MarkerImage(imageSrc[1], imageSize, imageOption)];

  useEffect(() => {
    const container = document.getElementById('map');
    const map = new kakao.maps.Map(container, mapOptions);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(displayValue, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          position: coords,
          map: map,
          image: markerImage[0],
        });

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status) {
          if (status === kakao.maps.services.Status.OK) {

            const address = result[0].road_address.address_name;
            // 주소를 이용하여 원하는 작업을 수행할 수 있습니다.
            setDeparture(address);
          }
        });
      }
    });

    // 리스트의 각 항목을 검색하여 마커를 찍습니다
    tripList.forEach((address) => {
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          new kakao.maps.Marker({
            position: coords,
            map: map,
            image: markerImage[1],
          });
        }
      });
    });
  }, [mapOptions, tripList, displayValue]);

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
      <button type="button" className="btn btn-success" style={{ marginTop: '10px' }} onClick={handleZoomBack}>원래대로</button>
    </div> 
  );
};  

export default MapAPI;