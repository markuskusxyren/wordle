import React from 'react';

export default function Modal({
  isCorrect,
  isGameOver,
  turn,
  solution,
  children,
  onClose,
}) {
  const turnLabel = turn === 1 ? 'turn' : 'turns';

  const handleTryAgain = () => {
    window.location.reload(); // Refresh the app
  };

  return (
    <div className="modal">
      {isGameOver && (
        <>
          {isCorrect ? (
            <div className="modal">
              <h1>You win!</h1>
              <p className="solution">The word is {solution}</p>
              <p>
                It took you {turn} {turnLabel}
              </p>
              <button className="try-again-btn" onClick={handleTryAgain}>
                Try again
              </button>
            </div>
          ) : (
            <div className="modal">
              <h1>You lose!</h1>
              <p className="solution">The word is {solution}</p>
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
