import { useState, useEffect } from 'react';

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer-container">
      <div className="timer-text">Time left: {timeLeft}s</div>
      <div
        className="timer-bar"
        style={{ width: `${(timeLeft / duration) * 100}%` }}
      ></div>
    </div>
  );
}