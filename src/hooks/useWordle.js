import { useState } from 'react';
import dictEng from '../data/dictEng';

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // array of formatted guesses with the colored state (only 6 guesses allowed)
  const [history, setHistory] = useState([]); // string of past guesses
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // keys that have been used during gameplay

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
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === 'green') {
          newKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow';
          return;
        }
        if (
          l.color === 'gray' &&
          currentColor !== 'green' &&
          currentColor !== 'yellow'
        ) {
          newKeys[l.key] = 'gray';
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess('');
  };

  // handle keyup event & track the current guess
  // if user presses enter, add the guess to the guesses state
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log('all guesses used');
        return;
      }
      // no duplicate guesses
      if (history.includes(currentGuess)) {
        alert('Duplicate guess, please try another word.');
        setCurrentGuess('');
        return;
      }
      // guess should be 5 letters
      if (currentGuess.length !== 5) {
        console.log('guess should be 5 letters');
        return;
      }
      // guess should be a word in dictEng.js
      if (
        !dictEng.some((wordObj) => wordObj.word === currentGuess.toLowerCase())
      ) {
        alert('Guess should be a word, please try again.');
        setCurrentGuess('');
        return;
      }

      // if everything over is met then add the guess
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
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

  return {
    turn,
    currentGuess,
    guesses,
    history,
    isCorrect,
    usedKeys,
    handleKeyup,
  };
};

export default useWordle;
