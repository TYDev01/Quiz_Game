import { useState, useEffect } from 'react';
import Quiz from '../components/Quiz';
import Loading from '../components/Loading';
import { fetchQuizQuestions } from '../services/quizService';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchQuizQuestions();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (loading) return <Loading />;
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Questions</h3>
        <p>{error}</p>
        <div className="error-suggestions">
          <p>Possible solutions:</p>
          <ul>
            <li>Check your internet connection</li>
            <li>Wait a moment and try again</li>
            <li>The quiz service might be temporarily down</li>
          </ul>
        </div>
        <button onClick={handleRetry} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return <Quiz questions={questions} />;
}