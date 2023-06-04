/*global kakao*/
import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import Forms from './Forms'
import { MyContext } from '../provider';
import { useState } from 'react';
import { useRef } from 'react';
import ReportMap from './ReportMap'

function Report() {
    const { departureDate1, departureDate2, touchProfile, transport  } = useContext(MyContext);
    const [mapOptions, setMapOptions] = useState({
        center: new window.Tmapv3.LatLng(35.8714, 128.75),
        width: "95vh",
        height: "60vh",
        zoom: 6
    });
    const date = new Date();
    var a = date.getFullYear(); // 2022
    var b = date.getMonth() + 1; // 2
    var c = date.getDate(); // 9
    var d = date.getDay();
    if (d === 0) d = "일";
    if (d === 1) d = "월";
    if (d === 2) d = "화";
    if (d === 3) d = "수";
    if (d === 4) d = "목";
    if (d === 5) d = "금";
    if (d === 6) d = "토";
    var stringDate = `${a}년 ${b}월 ${c}일 (${d}요일)`;

    return (
        <div className="ad" style={{ height: "70vh", display: "flex", alignItems: "center" }}>
            <Container style={{ background: "#FFFFFF", width: "90%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 style={{ textAlign: "center" }}>{localStorage.getItem("name")}님의 여행 계획</h1>
                <h5 style={{ textAlign: "right" }}>{stringDate}</h5>
                <Container style={{ background: "#FFFFFF", width: "90%", height: "5%", display: "flex", flexDirection: "column", justifyContent: "center" }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '30vh',
                }}>
                    <ReportMap />
                </div>
                <h4>{localStorage.getItem("finalDeparture")}에서 출발할 거야!</h4>
                {transport && <h4>{transport} 타고 여행 갈래!</h4>}
                {departureDate1 && departureDate2 && <h5>{departureDate1}부터 {departureDate2}까지!</h5>}
            </Container>
        </div>
    );
}

export default Report;
