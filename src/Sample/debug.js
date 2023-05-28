
import React, { useEffect, useState } from 'react';
import axios from 'axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
function Api() {
    const [hello, setHello] = useState('동권님이랑 통신 아직 안됨');

    useEffect(() => {
        axios.get('http://43.201.19.87:8080/tourApi/hi')
            .then(response => {
                setHello(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div style={{ textAlign: "center", fontSize: 50 }}>
            <p>{hello}</p>
        </div>
    );
}

export default Api;
