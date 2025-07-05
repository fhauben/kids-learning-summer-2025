import React, { useState } from 'react';

interface State {
  name: string;
  capital: string;
  region: string;
}

const SocialStudies: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState<'states' | 'history'>('states');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Sample states for the quiz
  const states: State[] = [
    { name: 'California', capital: 'Sacramento', region: 'West' },
    { name: 'Texas', capital: 'Austin', region: 'South' },
    { name: 'New York', capital: 'Albany', region: 'Northeast' },
    { name: 'Florida', capital: 'Tallahassee', region: 'South' },
    { name: 'Illinois', capital: 'Springfield', region: 'Midwest' }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === states[currentQuestion].capital) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');
    } else {
      setFeedback(`Incorrect. The capital of ${states[currentQuestion].name} is ${states[currentQuestion].capital}.`);
    }
    
    setTimeout(() => {
      setFeedback('');
      setSelectedAnswer('');
      if (currentQuestion < states.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    setFeedback('');
  };

  const generateOptions = () => {
    const correctAnswer = states[currentQuestion].capital;
    const allCapitals = states.map(state => state.capital);
    const wrongAnswers = allCapitals.filter(capital => capital !== correctAnswer);
    const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [correctAnswer, ...shuffledWrong].sort(() => Math.random() - 0.5);
    return options;
  };

  return (
    <div className="social-studies">
      <h2>Social Studies</h2>
      
      <div className="activity-tabs">
        <button
          className={`tab ${currentActivity === 'states' ? 'active' : ''}`}
          onClick={() => setCurrentActivity('states')}
        >
          States & Capitals
        </button>
        <button
          className={`tab ${currentActivity === 'history' ? 'active' : ''}`}
          onClick={() => setCurrentActivity('history')}
        >
          Early American History
        </button>
      </div>

      {currentActivity === 'states' && (
        <div className="states-quiz">
          <h3>States & Capitals Quiz</h3>
          
          {!showResult ? (
            <div className="quiz-container">
              <div className="question">
                <h4>Question {currentQuestion + 1} of {states.length}</h4>
                <p>What is the capital of <strong>{states[currentQuestion].name}</strong>?</p>
              </div>
              
              <div className="options">
                {generateOptions().map((option, index) => (
                  <button
                    key={index}
                    className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={feedback !== ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {selectedAnswer && !feedback && (
                <button className="submit-btn" onClick={handleSubmitAnswer}>
                  Submit Answer
                </button>
              )}
              
              {feedback && (
                <div className={`feedback ${feedback.includes('Correct') ? 'correct' : 'incorrect'}`}>
                  {feedback}
                </div>
              )}
            </div>
          ) : (
            <div className="quiz-results">
              <h3>Quiz Complete!</h3>
              <p>Your score: {score} out of {states.length}</p>
              <p>Percentage: {Math.round((score / states.length) * 100)}%</p>
              
              {score === states.length && (
                <div className="perfect-score">
                  <h4>🎉 Perfect Score! 🎉</h4>
                  <p>You know your states and capitals!</p>
                </div>
              )}
              
              <button className="reset-btn" onClick={resetQuiz}>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {currentActivity === 'history' && (
        <div className="history-content">
          <h3>Early American History</h3>
          <p>Coming soon! Learn about the founding of America, important historical figures, and key events.</p>
          <div className="placeholder">
            <p>🏛️ Interactive history lessons will be available here</p>
            <p>📚 Stories about the American Revolution</p>
            <p>👥 Learn about important historical figures</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialStudies; 