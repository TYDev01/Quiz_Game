import { useState } from 'react';
import Question from './Question';
import Results from './Results';

export default function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentAnswerStatus, setCurrentAnswerStatus] = useState(null);

  const handleAnswer = (isCorrect, answer) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswers([...userAnswers, answer]);
    setCurrentAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentAnswerStatus(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return <Results score={score} total={questions.length} userAnswers={userAnswers} questions={questions} />;
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
        <p>Score: {score}</p>
      </div>
      
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        showFeedback={showFeedback}
        answerStatus={currentAnswerStatus}
      />
      
      {showFeedback && (
        <div className={`feedback ${currentAnswerStatus}`}>
          {currentAnswerStatus === 'correct' ? (
            <p> Correct! Congrats!</p>
          ) : (
            <p> Incorrect! The correct answer is: <strong>{questions[currentQuestionIndex].correctAnswer}</strong></p>
          )}
          <button 
            className="next-button" 
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}