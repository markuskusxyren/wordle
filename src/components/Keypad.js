import React, { useEffect, useState } from 'react';
import letters from '../letters';

export default function Keypad({ usedKeys }) {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(letters);
  }, []);

  return (
    <div className="keypad">
      {keys &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
