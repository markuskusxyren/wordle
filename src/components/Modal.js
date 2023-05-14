import React, { useRef, useEffect } from 'react';

export default function Modal({
  isCorrect,
  isGameOver,
  turn,
  solution,
  children,
}) {
  const turnLabel = turn === 1 ? 'turn' : 'turns';
  const tryAgainButtonRef = useRef(null);

  const handleTryAgain = () => {
    window.location.reload(); // Refresh the app
  };

  useEffect(() => {
    if (isGameOver) {
      tryAgainButtonRef.current.focus();
    }
  }, [isGameOver]);

  const handleKeyPress = (e) => {
    if (isGameOver && e.key === 'Enter') {
      handleTryAgain();
    }
  };

  return (
    <div>
      {isGameOver && (
        <>
          {isCorrect ? (
            <div className="win-modal">
              <h1>You win!</h1>
              <p>
                It took you {turn} {turnLabel}
              </p>
              <button
                className="try-again-btn"
                onClick={handleTryAgain}
                onKeyDown={handleKeyPress}
                ref={tryAgainButtonRef}
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="lose-modal">
              <h1>You lose!</h1>
              <p>
                The word is <span className="solution">{solution}</span>
              </p>
              <button
                className="try-again-btn"
                onClick={handleTryAgain}
                onKeyDown={handleKeyPress}
                ref={tryAgainButtonRef}
              >
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
