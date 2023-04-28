import React, { useEffect, useState } from 'react';
import letters from '../letters';

export default function Keypad() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(letters);
  }, []);

  return (
    <div className="keypad">
      {keys.map((key) => (
        <div key={key.key}>{key.key}</div>
      ))}
    </div>
  );
}
