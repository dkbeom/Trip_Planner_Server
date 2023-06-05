import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyContext } from '../provider';
import { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

function PlacementExample() {
    const { finalDeparture, touchHome } = useContext(MyContext);
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
    }

    if (finalDeparture !== "") {
        return (
            <ToastContainer position='top-center' className="p-3">
                <Toast bg="light" autohide='true' show={show} onClose={handleClose}> 
                    <Toast.Header style={{ background: "#446699" }}>
                        <img src="/icon_travel.png" className="rounded me-2" alt="" style={{ width: "30px", height: "auto" }} />
                        <strong className="me-auto" style={{ color: "#ffffff", fontSize: "20px" }}>Next Step</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <div>출발지 선택이 완료되었습니다. </div>
                        <div>상단 탭의 '여행 사전 정보'로 넘어가세요!</div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        );
    }
    else {
        return;
    }

}

export default PlacementExample;