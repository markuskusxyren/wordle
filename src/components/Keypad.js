import React, { useEffect, useState } from 'react';
import letters from '../letters';

export default function Keypad({ usedKeys, handleKeyup }) {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setKeys(letters);
  }, []);

  const handleKeyClick = (key) => {
    handleKeyup({ key: key.toLowerCase() });
  };

  const handleEnterClick = () => {
    handleKeyup({ key: 'Enter' });
  };

  const handleBackspaceClickLocal = () => {
    handleKeyup({ key: 'Backspace' });
  };

  return (
    <div className="keypad-container">
      <div className="keypad">
        <div className="row">
          {keys.slice(0, 10).map((l) => {
            const color = usedKeys[l.key];
            return (
              <button
                key={l.key}
                className={`key ${color}`}
                onClick={() => handleKeyClick(l.key)}
              >
                {l.key}
              </button>
            );
          })}
        </div>
        <div className="row">
          {keys.slice(10, 19).map((l) => {
            const color = usedKeys[l.key];
            return (
              <button
                key={l.key}
                className={`key ${color}`}
                onClick={() => handleKeyClick(l.key)}
              >
                {l.key}
              </button>
            );
          })}
        </div>
        <div className="row">
          {keys.slice(19, 26).map((l) => {
            const color = usedKeys[l.key];
            return (
              <button
                key={l.key}
                className={`key ${color}`}
                onClick={() => handleKeyClick(l.key)}
              >
                {l.key}
              </button>
            );
          })}
        </div>
        <div className="row">
          <button className="key enter" onClick={handleEnterClick}>
            Enter
          </button>
          <button className="key backspace" onClick={handleBackspaceClickLocal}>
            Backspace
          </button>
        </div>
      </div>
    </div>
  );
}
