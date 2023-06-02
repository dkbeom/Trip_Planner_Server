import { useState, useEffect, useRef } from 'react';


function MyComponent() {
  const [count, setCount] = useState(0);
  const isMount = useRef(0);

  useEffect(()=>{
    if(isMount.current > 1){
      console.log("useEffect 실행됨");
    }
    else{
      isMount.current += 1;
    }
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => {setCount(count + 1);}}>Increase</button>
    </div>
  );
}


export default MyComponent;