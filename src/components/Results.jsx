import { Link } from 'react-router-dom';

export default function Results({ score, total, userAnswers, questions }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="results-container">
      <h2>Quiz Completed!</h2>
      <div className="score-summary">
        <p>
          Your score: {score} out of {total} ({percentage}%)
        </p>
        <div className="score-bar">
          <div
            className="score-progress"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="answers-review">
        <h3>Review your answers:</h3>
        {questions.map((question, index) => (
          <div key={index} className="answer-item">
            <p>
              <strong>Question {index + 1}:</strong> {question.question}
            </p>
            <p>
              <strong>Your answer:</strong>{' '}
              <span
                className={
                  userAnswers[index] === question.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                }
              >
                {userAnswers[index]}
              </span>
            </p>
            {userAnswers[index] !== question.correctAnswer && (
              <p>
                <strong>Correct answer:</strong>{' '}
                <span className="correct">{question.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>
      <Link to="/" className="restart-button">
        Play Again
      </Link>
    </div>
  );
}