import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const handleClick = () => {
    fetch('http://10.124.0.242:8080/gpt/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "messages": [{
          "role": "user",
          "content": "안녕, 좋은 정보를 알려줘"
        }]
      }) 
    })

    .then(response => response.json())
    .then(data => setResponse(data))
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
