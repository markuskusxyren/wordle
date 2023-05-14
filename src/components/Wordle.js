import React, { useEffect, useState, useRef } from 'react';
import useWordle from '../hooks/useWordle';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

import dictEng from '../data/dictEng';
import dictTag from '../data/dictTag';
import solutionsEng from '../data/solutionsEng';
import solutionsTag from '../data/solutionsTag';

export default function Wordle({ solution, currentDict, setCurrentDict }) {
  // Determine the dictionary and solutions based on the current dictionary selection
  const dict = currentDict === 'eng' ? dictEng : dictTag;
  const solutions = currentDict === 'eng' ? solutionsEng : solutionsTag;

  // Use the custom hook `useWordle` to handle game logic
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution, dict, solutions);

  // State for showing the game over modal
  const [showModal, setShowModal] = useState(false);

  // State for showing the instructions modal
  const [showInstructions, setShowInstructions] = useState(true);

  // Ref for focusing the instructions modal
  const instructionsModalRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);
    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup]);

  // Check if the game is over or the solution is correct,
  // and show the modal after a delay of 2 seconds
  useEffect(() => {
    if (isCorrect || turn > 5) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  }, [isCorrect, turn]);

  // Focus the instructions modal when it is shown
  useEffect(() => {
    if (showInstructions) {
      instructionsModalRef.current.focus();
    }
  }, [showInstructions]);

  // Handle the Enter key press to dismiss the instructions modal
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showInstructions && e.key === 'Enter') {
        setShowInstructions(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showInstructions]);

  // Check if the game is over
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

      {/* Render the instructions modal if showInstructions is true */}
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
            <button
              className="continue-btn"
              onClick={() => setShowInstructions(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowInstructions(false);
                }
              }}
              ref={instructionsModalRef}
            >
              PLAY
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
