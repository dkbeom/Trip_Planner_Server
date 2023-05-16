import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const handleClick = () => {
    fetch('http://192.168.1.28:8080/gpt/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
      .then(response => response.json()) // 응답 데이터를 문자열로 받음
      .then(data => setResponse(data)) // 수신한 데이터를 JSON 객체로 파싱
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div></div>
      <button onClick={handleClick}>Send Request</button>
      <p>Response: {JSON.stringify(response)}</p>
    </div>
  );
}

export default App;
