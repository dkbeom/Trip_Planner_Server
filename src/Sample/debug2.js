import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function MyComponent() {
  const [value, setValue] = useState(localStorage.getItem('Bakil'));

  useEffect(() => {
    // 로컬 스토리지 업데이트 후에 실행되는 콜백 함수
    const handleStorageUpdate = (event) => {
      if (event.key === 'myKey') {
        setValue(event.newValue);
      }
    };

    // 로컬 스토리지 업데이트 이벤트에 대한 리스너 등록
    window.addEventListener('storage', handleStorageUpdate);

    // 컴포넌트 언마운트 시에 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // 값이 업데이트된 후에 연산 수행
  const computedValue = value ? parseInt(value) + 1 : 0;

  return (
    <div>
      <Button onClick={localStorage.setItem("hello", parseInt(value + 1))}> sdlk</Button>
      <p>로컬 스토리지 값: {value}</p>
      <p>연산 결과: {computedValue}</p>
    </div>
  );
}

export default MyComponent;
