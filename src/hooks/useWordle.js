import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]); // array of formatted guesses with the colored state
  const [history, setHistory] = useState([]); // string of past guesses
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an arrayu of letter objects
  // ex. [{key: 'a', color: 'green'}]
  const formatGuess = () => {};

  // add a new guess to the guesses state
  // update the isCorrect state id the guess is correct
  // add one to the turn state
  const addNewGuess = () => {};

  // handle keyup event & track the current guess
  // if user presses enter, add the guess to the guesses state
  const handleKeyUp = ({ key }) => {
    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      // if key is a letter
      if (currentGuess.length < 5) {
        // if current guess < 5 letters
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, history, isCorrect, handleKeyUp };
};

export default useWordle;
