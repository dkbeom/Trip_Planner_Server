import React, { useEffect, useState } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.27:8080',
});
function Api() {
    const [hello, setHello] = useState('동권님이랑 통신 아직 안됨');

    useEffect(() => {
        instance.get('/member/hi?mapX=127.147540&mapY=34.553648')
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
