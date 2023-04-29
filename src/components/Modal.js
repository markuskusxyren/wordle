import React from 'react';

export default function Modal({ isCorrect, turn, solution }) {
  const turnLabel = turn === 1 ? 'turn' : 'turns';

  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You win!</h1>
          <p className="solution">The word is {solution}</p>
          <p>
            It took you {turn} {turnLabel}
          </p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>You lose!</h1>
          <p className="solution">The word is {solution}</p>
          <p>Try again</p>
        </div>
      )}
    </div>
  );
}
