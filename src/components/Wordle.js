import React, { useEffect, useState } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

import dictEng from '../data/dictEng';
import dictTag from '../data/dictTag';
import solutionsEng from '../data/solutionsEng';
import solutionsTag from '../data/solutionsTag';

export default function Wordle({ solution, currentDict, setCurrentDict }) {
  const dict = currentDict === 'eng' ? dictEng : dictTag;
  const solutions = currentDict === 'eng' ? solutionsEng : solutionsTag;

  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution, dict, solutions);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    if (isCorrect || turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000); // 2000 ms (2 seconds) delay before showing the modal
    }
  }, [isCorrect, turn]);

  const isGameOver = isCorrect || turn > 5;

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          isGameOver={isGameOver}
          turn={turn}
          solution={solution}
          onClose={() => setShowModal(false)}
        />
      )}
      {showInstructions && (
        <div className="instructions-modal">
          <h1>Welcome to Wordle!</h1>
          <p>
            The goal of the game is to guess a 5-letter word in 6 turns or less.
            Each turn, you will enter a 5-letter guess and receive feedback on
            how many letters your guess has in common with the solution. Use
            this feedback to eliminate possible solutions and make your next
            guess.
          </p>
          <p>
            Green means ✅ placement and ✅ letter. <br />
            Yellow means ❌ placement but ✅ letter. <br />
            Gray means the letter is not in the word.
          </p>
          <div className="instructions-div">
            <div className="language-selection">
              <p>Please select a language to play with.</p>
              <div className="dict-buttons-container">
                <button
                  className={`dict-buttons ${
                    currentDict === 'eng' ? 'selected' : ''
                  }`}
                  onClick={() => setCurrentDict('eng')}
                >
                  English
                </button>
                <button
                  className={`dict-buttons ${
                    currentDict === 'tag' ? 'selected' : ''
                  }`}
                  onClick={() => setCurrentDict('tag')}
                >
                  Tagalog
                </button>
              </div>
            </div>
          </div>
          <button
            className="continue-btn"
            onClick={() => setShowInstructions(false)}
          >
            PLAY
          </button>
        </div>
      )}
    </div>
  );
}
