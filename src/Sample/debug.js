/*global kakao*/
import React, { useState, useEffect } from 'react'

const MapAPI = () => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [mapOptions, setMapOptions] = useState({
    center: new kakao.maps.LatLng(35.8714, 128.55),
    level: zoomLevel
  });

  useEffect(() => {
    var container = document.getElementById('map');
    var map = new kakao.maps.Map(container, mapOptions);
    var markerPosition = new kakao.maps.LatLng(37.367464512305174, 127.10776860117488);
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });



  }, [mapOptions])

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