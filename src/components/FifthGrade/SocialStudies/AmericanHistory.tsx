import React, { useState } from 'react';
import { Scroll, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { historyPassages } from '../../../data/historyPassages';

interface AmericanHistoryProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

const AmericanHistory: React.FC<AmericanHistoryProps> = ({ onBack, onSaveProgress }) => {
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showPassage, setShowPassage] = useState(true);

  const currentPassage = historyPassages[currentPassageIndex];
  const currentQuestion = currentPassage.questions[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestionIndex < currentPassage.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowPassage(true);
      } else if (currentPassageIndex < historyPassages.length - 1) {
        setCurrentPassageIndex(currentPassageIndex + 1);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowPassage(true);
      }
    }, 2000);
  };

  const totalQuestions = historyPassages.reduce((sum, passage) => sum + passage.questions.length, 0);
  const currentQuestionNumber = historyPassages
    .slice(0, currentPassageIndex)
    .reduce((sum, passage) => sum + passage.questions.length, 0) + currentQuestionIndex + 1;

  if (currentPassageIndex >= historyPassages.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, totalQuestions);
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Social Studies
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📜</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">History Scholar!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {totalQuestions}!
          </p>
          <button
            onClick={() => {
              setCurrentPassageIndex(0);
              setCurrentQuestionIndex(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
              setShowPassage(true);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Read Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Social Studies
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Scroll className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">American History</h2>
          </div>
          <div className="text-sm text-gray-600">
            Question {currentQuestionNumber} of {totalQuestions}
          </div>
        </div>

        {showPassage ? (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {currentPassage.title}
              </h3>
              <p className="text-lg text-blue-600 mb-4">{currentPassage.person}</p>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 mb-6 border-l-4 border-amber-400">
              <p className="text-gray-800 leading-relaxed text-lg">
                {currentPassage.content}
              </p>
            </div>

            <button
              onClick={() => setShowPassage(false)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Answer Questions
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Question about {currentPassage.title}
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                {currentQuestion.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showResult
                      ? index === currentQuestion.correct
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedAnswer === index
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-500'
                      : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{option}</span>
                    {showResult && index === currentQuestion.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correct && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowPassage(true)}
              className="mt-6 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Re-read passage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmericanHistory;