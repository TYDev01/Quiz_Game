import { useState } from 'react';
import Timer from './Timer';

export default function Question({ question, onAnswer, showFeedback, answerStatus }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!question) {
    return (
      <div className="question-error">
        <p>Question data is missing</p>
      </div>
    );
  }

  const {
    category = 'General Knowledge',
    difficulty = 'medium',
    question: questionText = 'Question text missing',
    answers = [],
    correctAnswer = ''
  } = question;

  const handleSelect = (answer) => {
    if (!showFeedback) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === correctAnswer;
      onAnswer(isCorrect, selectedAnswer);
    }
  };

  const handleTimeUp = () => {
    onAnswer(false, 'Time Up!');
  };

  return (
    <div className="question-container">
      <h3 className="question-category">{category}</h3>
      <p className="question-difficulty">Difficulty: {difficulty}</p>
      
      {!showFeedback && <Timer duration={15} onTimeUp={handleTimeUp} />}
      
      <div className="question-text">{questionText}</div>
      
      <div className="answers-container">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`answer-button ${
              selectedAnswer === answer ? 'selected' : ''
            } ${
              showFeedback
                ? answer === correctAnswer
                  ? 'correct'
                  : selectedAnswer === answer && answerStatus === 'incorrect'
                  ? 'incorrect'
                  : ''
                : ''
            }`}
            onClick={() => handleSelect(answer)}
            disabled={showFeedback}
          >
            {answer}
          </button>
        ))}
      </div>
      
      {!showFeedback && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}