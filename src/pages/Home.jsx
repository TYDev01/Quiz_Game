import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Quiz Game!</h1>
      <p>Test your knowledge on various topics</p>
      <Link to="/quiz" className="start-button">
        Start Quiz
      </Link>
    </div>
  );
}