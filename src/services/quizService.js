import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';


const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  try {
    const response = await axios.get(url, { timeout: 10000 });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const fetchQuizQuestions = async () => {
  try {
    const data = await fetchWithRetry(API_URL);
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No questions available');
    }

    return data.results.map((question, index) => ({
      id: index + 1,
      question: decodeHTML(question.question),
      correctAnswer: decodeHTML(question.correct_answer),
      answers: shuffleArray([
        ...question.incorrect_answers.map(decodeHTML),
        decodeHTML(question.correct_answer),
      ]),
      category: question.category,
      difficulty: question.difficulty,
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.response 
        ? `Server responded with status ${error.response.status}`
        : error.message.includes('timeout')
          ? 'Request timed out. Please check your connection'
          : 'Failed to fetch questions. Please try again later'
    );
  }
};


function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}