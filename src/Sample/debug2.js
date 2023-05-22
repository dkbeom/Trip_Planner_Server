import React, { useContext } from 'react';
import { MyContext } from './provider';

function File2() {
  const { sharedVariable, itemList } = useContext(MyContext);

  return (
    <div>
      <p>Shared Variable: {sharedVariable}</p>
      <ul>
        {itemList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default File2;
