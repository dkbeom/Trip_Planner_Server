/*global kakao*/
import React, { useEffect, useRef, useState, useContext } from 'react';
import { MyContext } from '../provider';
import TripList from './TripList';

var coords = [0, 0];
var c = 0;
var d = 0;
var e = false;

function App() {
    const [mapOptions, setMapOptions] = useState({
        center: new window.Tmapv3.LatLng(35.8714, 128.75),
        width: "95%",
        height: "100%",
        zoom: 6
    });
    const { tripList, displayValue, departure, option, touchHome, advancedTripList, setDeparture, setOption, setAdvancedTripList, setTripList, setTouchHome } = useContext(MyContext);
    const imageSrc = ["https://cdn-icons-png.flaticon.com/512/3771/3771140.png", "https://cdn.icon-icons.com/icons2/3015/PNG/512/backpack_rucksack_excursion_trip_icon_188537.png"];
    const mapRef = useRef(null);
    useEffect(() => {
        if (advancedTripList.length === 0 && localStorage.getItem("advancedTripList") &&
            JSON.parse(localStorage.getItem("advancedTripList")).length > 0) {
            const storedAdvancedTripList = JSON.parse(localStorage.getItem("advancedTripList"));
            setAdvancedTripList(storedAdvancedTripList);
            const addresses = storedAdvancedTripList.map((item) => item.address);
            setTripList(addresses);
        }
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
                            if (result[0].road_address != null) {
                                address = result[0].road_address.address_name;
                            }
                            // 주소를 이용하여 원하는 작업을 수행할 수 있습니다.
                            setDeparture(address);
                        }
                    });
                }
            });
        }
        if (tripList.length !== 0) {
            setOption(1);
            tripList.forEach((address) => {
                let tripObject = {};
                geocoder.addressSearch(address, function (result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        var marker = new window.Tmapv3.Marker({
                            position: new window.Tmapv3.LatLng(coords.getLat(), coords.getLng()),
                            icon: imageSrc[1],
                            iconSize: new window.Tmapv3.Size(32, 32),
                        });
                        marker.setMap(mapRef.current);
                        tripObject = {
                            address: address,
                            lat: coords.getLat(),
                            lng: coords.getLng(),
                        };

                        // Check if the tripObject already exists in the list
                        const isDuplicate = advancedTripList.some(
                            (item) =>
                                item.address === tripObject.address &&
                                item.lat === tripObject.lat &&
                                item.lng === tripObject.lng
                        );

                        // Append tripObject to updatedAdvancedTripList if it doesn't exist already
                        if (!isDuplicate) {
                            setAdvancedTripList((prevList) => [...prevList, tripObject]);
                        }
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
        }
        if (!mapRef.current) {
            initialization();
        }
        else if (option === 1) {
            mapRef.current.destroy();
            initialization();
        }
    }, [tripList, displayValue, departure, mapOptions]);

    useEffect(() => {
        c++;
        if (c > 1) {
            localStorage.setItem('advancedTripList', JSON.stringify(advancedTripList));
        }
    }, [advancedTripList])


    useEffect(() => {
        d++;
        if (d > 1) {
            var a = localStorage.getItem("advancedTripList");

            if (a) {
                // Parse the JSON string into a JavaScript object
                var tripList = JSON.parse(a);
                setTouchHome(100);
                // Access the values in the tripList array
                if (tripList.length > touchHome) {
                    setMapOptions({
                        center: new window.Tmapv3.LatLng(tripList[touchHome].lat, tripList[touchHome].lng),
                        zoom: 13
                    });
                }
            }
        }
    }, [touchHome])

    function resetMap() {
        setTouchHome(100);
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
            height: '70vh',
            width: '100vh'
        }}>
            <div id="map" />
            <div style={{
                display: 'flex',
                justifyContent: 'center', // 정중앙 정렬
                alignItems: 'center',
                marginTop: '10px',
                marginLeft: '0vh',
                width: '90vh',
            }}>
                <button type="button" className="btn btn-success" style={{ width: "10vh", marginRight: "3vh" }} onClick={resetMap}>원래대로</button>
                <TripList />
            </div>
        </div>
    );

}

export default App;
