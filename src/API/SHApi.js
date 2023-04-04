import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SHApi() {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = {
            id: "hello",
            pwd: "dhdhdh"
        };
        axios.post('http://192.168.1.254:8080/survey/submit', data, { timeout: 5000 })
            .then(response => {
                setJsonData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);
    console.log(jsonData);
    return (
        <div>
            {loading ? <p>로딩중...</p> : jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
        </div>
    );
}

export default SHApi;
