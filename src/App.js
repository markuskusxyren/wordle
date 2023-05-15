import React, { useState, useEffect } from 'react';
import solutionsEng from './data/solutionsEng.js';
import solutionsTag from './data/solutionsTag.js';
import Wordle from './components/Wordle.js';

function App() {
  const [currentDict, setCurrentDict] = useState('eng');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    const getRandomSolution = () => {
      const solutions = currentDict === 'eng' ? solutionsEng : solutionsTag;
      const randomIndex = Math.floor(Math.random() * solutions.length);
      return solutions[randomIndex].word;
    };

    setSolution(getRandomSolution);
  }, [currentDict]);

  return (
    <div className="App">
      <h1 className="top-name">HackHive Wordle App</h1>
      {solution && (
        <Wordle
          solution={solution}
          currentDict={currentDict}
          setCurrentDict={setCurrentDict}
        />
      )}
    </div>
  );
}

export default App;
