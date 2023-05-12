import React from 'react';

export default function Modal({
  isCorrect,
  isGameOver,
  turn,
  solution,
  children,
}) {
  const turnLabel = turn === 1 ? 'turn' : 'turns';

  const handleTryAgain = () => {
    window.location.reload(); // Refresh the app
  };

  return (
    <div>
      {isGameOver && (
        <>
          {isCorrect ? (
            <div className="win-modal">
              <h1>You win!</h1>
              <p>
                The word is <p className="solution">{solution}</p>
              </p>
              <p>
                It took you {turn} {turnLabel}
              </p>
              <button className="try-again-btn" onClick={handleTryAgain}>
                Try again
              </button>
            </div>
          ) : (
            <div className="lose-modal">
              <h1>You lose!</h1>
              <p>
                The word is <p className="solution">{solution}</p>
              </p>
              <button className="try-again-btn" onClick={handleTryAgain}>
                Try again
              </button>
            </div>
          )}
        </>
      )}
      {children && <div>{children}</div>}
    </div>
  );
}
