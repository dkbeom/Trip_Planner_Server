import React, { useState } from 'react';
import axios from 'axios';

function ApiCommunication() {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8080/reverse', { text: inputText })
            .then(response => {
                setOutputText(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <input type="text" value={inputText} onChange={handleChange} />
            <button onClick={handleSubmit}>Reverse</button>
            <p>{outputText}</p>
        </div>
    );
}

export default ApiCommunication;
