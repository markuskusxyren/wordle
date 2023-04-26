import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [solution, setSolution] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://my-json-server.typicode.com/your-username/your-repo/solutions'
      )
      .then((response) => {
        const solutions = response.data;
        const randomIndex = Math.floor(Math.random() * solutions.length);
        const randomSol = solutions[randomIndex].word;
        setSolution(randomSol);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {solution && <div> Solution is: {solution}</div>}
    </div>
  );
}

export default App;

/* 

data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

*/
