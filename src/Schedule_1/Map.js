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