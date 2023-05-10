import React, { useState, useEffect } from 'react';
import solutionsEng from './data/solutionsEng.js';
import Wordle from './components/Wordle.js';

function App() {
  const [solution, setSolution] = useState('');

  useEffect(() => {
    const getRandomSolution = () => {
      const randomIndex = Math.floor(Math.random() * solutionsEng.length);
      return solutionsEng[randomIndex].word;
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
