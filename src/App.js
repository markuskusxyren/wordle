import React, { useState, useEffect } from 'react';
import solutions from './db.js';
import Wordle from './components/Wordle.js';

function App() {
  const [solution, setSolution] = useState('');

  useEffect(() => {
    const getRandomSolution = () => {
      const randomIndex = Math.floor(Math.random() * solutions.length);
      return solutions[randomIndex].word;
    };

    setSolution(getRandomSolution);
  }, []);

  return (
    <div className="App">
      <h1>HackHive Wordle App</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
