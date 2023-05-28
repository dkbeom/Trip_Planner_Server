import React, { useEffect, useRef, useState, useContext } from 'react';
import { MyContext } from '../Schedule_1/provider';

function App() {
  const [mapOptions, setMapOptions] = useState({
    center: new window.Tmapv3.LatLng(35.8714, 128.75),
    width: "600px",
    height: "600px",
    zoom: 6
  });
  const { tripList, displayValue, departure, setDeparture } = useContext(MyContext);
  const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
  const mapRef = useRef(null);
  useEffect(() => {

    const container = document.getElementById('map');
    const map = new window.Tmapv3.Map(container, mapOptions);
    mapRef.current = map;

    const marker = new window.Tmapv3.Marker({
      position: new window.Tmapv3.LatLng(37.56520450, 126.98702028),
      icon: imageSrc[0],
      iconSize: new window.Tmapv3.Size(32, 32),
    });
    marker.setMap(map);
  }, [tripList, displayValue, departure, mapOptions]);

  function resetMap() {
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
      height: 'calc(100vh - 250px)',
      backgroundColor: '#DDFFFF77'
    }}>
      <div id="map" />
      <button type="button" className="btn btn-success" style={{ marginTop: '10px' }} onClick={resetMap}>원래대로</button>
    </div>
  );
}

export default App;
