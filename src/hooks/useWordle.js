import { useState } from 'react';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]); // array of formatted guesses with the colored state
  const [history, setHistory] = useState([]); // string of past guesses
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into an arrayu of letter objects
  // ex. [{key: 'a', color: 'green'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: 'gray' };
    });

    // find any exact matches (green)
    formattedGuess.forEach((l, i) => {
      if (l.key === solutionArray[i]) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    // find any partial matches (yellow)
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state id the guess is correct
  // add one to the turn state
  const addNewGuess = () => {};

  // handle keyup event & track the current guess
  // if user presses enter, add the guess to the guesses state
  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log('all guesses used');
        return;
      }
      // no duplicate guesses
      if (history.includes(currentGuess)) {
        console.log('duplicate guess');
        return;
      }
      // guess should be 5 letters
      if (currentGuess.length !== 5) {
        console.log('guess should be 5 letters');
        return;
      }

      // if everything over is met then add the guess
      const formatted = formatGuess();
      console.log(formatted);
    }

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
