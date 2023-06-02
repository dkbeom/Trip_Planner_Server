
import React, { useEffect, useState } from 'react';
import axios from 'axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
function Api() {
    const [hello, setHello] = useState('동권님이랑 통신 아직 안됨');
    const [formData, setFormData] = useState(
        {
            "currentX":"127.03",
            "currentY":"37.528",
            "areaName":"제주도",
            "sigunguName":"제주시",
            "cat1":"", //레포츠 중심 :A03
            "cat2":"",
            "cat3":"",
            "foodPreferences":["국물요리", "고기", "제과/베이커리/떡"]
        }
    )


    useEffect(() => {
        axios.post('http://43.201.19.87:8080/tourApi/areaBased/', formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={{ textAlign: "center", fontSize: 50 }}>
            <p>{hello}</p>
        </div>
    );
}

export default Api;
