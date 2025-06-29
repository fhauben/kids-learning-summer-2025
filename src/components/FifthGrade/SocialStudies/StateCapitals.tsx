import React, { useState, useEffect, useRef } from 'react';
import { Map, ArrowLeft, CheckCircle, XCircle, Trophy, ChevronRight, Shuffle } from 'lucide-react';
import { states } from '../../../data/states';
import GoogleMapWebComponent from '../../GoogleMapWebComponent';

interface StateCapitalsProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface AnswerResult {
  state: string;
  capital: string;
  correct: boolean;
  userAnswer?: string;
}

/**
 * CelebrationModal: Shows a random animal emoji and plays a random sound when a question is answered correctly.
 */
const ANIMAL_EMOJIS = [
  { emoji: '🦊', size: 'text-8xl' },
  { emoji: '🐧', size: 'text-7xl' },
  { emoji: '🐘', size: 'text-9xl' },
  { emoji: '🦁', size: 'text-8xl' },
  { emoji: '🐼', size: 'text-8xl' },
  { emoji: '🐸', size: 'text-7xl' },
  { emoji: '🐨', size: 'text-8xl' },
  { emoji: '🦄', size: 'text-9xl' },
  { emoji: '🐻', size: 'text-8xl' },
  { emoji: '🐵', size: 'text-7xl' },
  { emoji: '🐶', size: 'text-8xl' },
  { emoji: '🐱', size: 'text-7xl' },
  { emoji: '🦉', size: 'text-8xl' },
  { emoji: '🦓', size: 'text-8xl' },
  { emoji: '🦒', size: 'text-9xl' },
  { emoji: '🦜', size: 'text-7xl' },
  { emoji: '🦩', size: 'text-8xl' },
  { emoji: '🦥', size: 'text-8xl' },
  { emoji: '🦔', size: 'text-7xl' },
  { emoji: '🦦', size: 'text-8xl' },
];

const SOUND_URLS = [
  // Public domain/CC0 sound effects
  'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4c7b.mp3', // tada
  'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b1e4b.mp3', // success bell
  'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b1e4b.mp3', // ding
  'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b1e4b.mp3', // chime
  'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b1e4b.mp3', // pop
  'https://cdn.pixabay.com/audio/2022/03/15/audio_115b9b1e4b.mp3', // sparkle
];

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const CelebrationModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const animal = useRef(getRandom(ANIMAL_EMOJIS));
  const sound = useRef(getRandom(SOUND_URLS));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (show) {
      animal.current = getRandom(ANIMAL_EMOJIS);
      sound.current = getRandom(SOUND_URLS);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [show]);

  if (!show) return null;

  // Random animation
  const animationClasses = [
    'animate-bounce',
    'animate-spin',
    'animate-pulse',
    'animate-wiggle', // custom, fallback to bounce if not defined
  ];
  const animation = getRandom(animationClasses);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative flex flex-col items-center">
        <span className={`${animal.current.size} ${animation} drop-shadow-lg select-none`} style={{ filter: 'drop-shadow(0 0 20px #fff)' }}>
          {animal.current.emoji}
        </span>
        <div className="text-4xl font-bold text-green-600 animate-pulse mt-4">🎉 CORRECT! 🎉</div>
        <div className="text-2xl font-semibold text-green-700 animate-bounce mt-2">Great Job!</div>
        <audio ref={audioRef} src={sound.current} autoPlay />
      </div>
    </div>
  );
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const StateCapitals: React.FC<StateCapitalsProps> = ({ onBack, onSaveProgress }) => {
  const [shuffledStates, setShuffledStates] = useState<typeof states>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerResult[]>([]);
  const [round, setRound] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasCompletedRound, setHasCompletedRound] = useState(false);

  // Initialize shuffled states on component mount
  useEffect(() => {
    setShuffledStates(shuffleArray(states));
  }, []);

  const currentState = shuffledStates[currentStateIndex];
  
  // Generate wrong answers from other states
  const wrongAnswers = shuffledStates
    .filter(state => state.name !== currentState?.name)
    .map(state => state.capital)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  const allOptions = currentState ? [currentState.capital, ...wrongAnswers].sort(() => Math.random() - 0.5) : [];

  // Dynamic map settings based on current state
  const getMapSettings = () => {
    if (!currentState) return { center: { lat: 39.8283, lng: -98.5795 }, zoom: 3.2 };
    
    // Special handling for Hawaii and Alaska to show both them and continental US
    if (currentState.name === 'Hawaii') {
      return {
        center: { lat: 35.0, lng: -140.0 }, // Center between Hawaii and continental US
        zoom: 2.8 // Zoom out more to show both
      };
    }
    
    if (currentState.name === 'Alaska') {
      return {
        center: { lat: 50.0, lng: -125.0 }, // Center between Alaska and continental US
        zoom: 2.5 // Zoom out to show both
      };
    }
    
    // For continental US states, use standard view
    return {
      center: { lat: 39.8283, lng: -98.5795 },
      zoom: 3.2
    };
  };

  const mapSettings = getMapSettings();

  const handleAnswer = (answer: string) => {
    if (!currentState) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentState.capital;
    if (isCorrect) {
      setScore(score + 1);
      setShowSuccessModal(true);
      
      // Hide success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }

    // Add to answer history
    const newResult: AnswerResult = {
      state: currentState.name,
      capital: currentState.capital,
      correct: isCorrect,
      userAnswer: answer
    };
    setAnswerHistory([...answerHistory, newResult]);
  };

  const handleNext = () => {
    setAnsweredQuestions(answeredQuestions + 1);
    
    if (currentStateIndex < shuffledStates.length - 1) {
      // Move to next state in current round
      setCurrentStateIndex(currentStateIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Completed all 50 states - save progress and start new round
      if (onSaveProgress && !hasCompletedRound) {
        onSaveProgress(score, 50);
        setHasCompletedRound(true);
      }
      
      setRound(round + 1);
      setShuffledStates(shuffleArray(states));
      setCurrentStateIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      // Keep score and history to track overall progress
    }
  };

  const resetQuiz = () => {
    setShuffledStates(shuffleArray(states));
    setCurrentStateIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswerHistory([]);
    setRound(1);
    setShowSuccessModal(false);
    setHasCompletedRound(false);
  };

  // Don't render until we have shuffled states
  if (shuffledStates.length === 0 || !currentState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading states...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3">
      <div className="max-w-7xl mx-auto">
        {/* Celebration Modal */}
        <CelebrationModal 
          show={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-[calc(100vh-24px)]">
          {/* Main Quiz Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-4 h-full">
              {/* Header with back button on left */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <button
                    onClick={onBack}
                    className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Social Studies
                  </button>
                  <Map className="w-6 h-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">State Capitals Quiz</h2>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Question {currentStateIndex + 1} of 50
                  </div>
                  <div className="text-xs text-blue-600 flex items-center">
                    <Shuffle className="w-3 h-3 mr-1" />
                    Round {round}
                  </div>
                </div>
              </div>

              {/* State Info - Compact */}
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <h3 className="text-xl font-bold text-blue-800">{currentState.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 text-sm">Region: {currentState.region}</p>
                  {(currentState.name === 'Hawaii' || currentState.name === 'Alaska') && (
                    <p className="text-xs text-blue-600">
                      📍 Map shows {currentState.name} + continental US
                    </p>
                  )}
                </div>
              </div>

              {/* US Overview Map - KEEP ORIGINAL SIZE */}
              <div className="bg-gray-100 rounded-lg p-4 mb-3">
                <div className="h-96 w-full rounded-lg overflow-hidden">
                  <GoogleMapWebComponent
                    center={mapSettings.center}
                    zoom={mapSettings.zoom}
                    markers={[
                      {
                        position: currentState.coordinates,
                        title: currentState.name,
                      }
                    ]}
                  />
                </div>
                {(currentState.name === 'Hawaii' || currentState.name === 'Alaska') && (
                  <p className="text-center text-xs text-gray-600 mt-1">
                    🗺️ {currentState.name} + continental US
                  </p>
                )}
              </div>

              {/* Question and Answer Options in Single Column */}
              <div className="mb-3">
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  What is the capital of {currentState.name}?
                </p>

                {/* Answer options in single column across */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {allOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        showResult
                          ? option === currentState.capital
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : selectedAnswer === option
                            ? 'bg-red-100 border-red-500 text-red-800'
                            : 'bg-gray-100 border-gray-300 text-gray-500'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-sm">{option}</span>
                        {showResult && option === currentState.capital && (
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        )}
                        {showResult && selectedAnswer === option && option !== currentState.capital && (
                          <XCircle className="w-4 h-4 text-red-600 mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Capital Location Map (shown after answer) - More zoomed out with Next button to the right */}
              {showResult && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex gap-3">
                    {/* Map on the left */}
                    <div className="flex-1">
                      <div className="h-40 w-full rounded-lg overflow-hidden">
                        <GoogleMapWebComponent
                          center={currentState.coordinates}
                          zoom={4}
                          markers={[
                            {
                              position: currentState.capitalCoordinates,
                              title: `${currentState.capital}, ${currentState.name}`,
                            }
                          ]}
                        />
                      </div>
                      <p className="text-center text-gray-600 text-sm mt-1">
                        {currentState.capital} location in {currentState.name}
                      </p>
                    </div>
                    
                    {/* Next button on the right */}
                    <div className="flex items-center">
                      <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Sidebar - Compact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-bold text-gray-800">Progress</h3>
                </div>
                <button
                  onClick={resetQuiz}
                  className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Reset
                </button>
              </div>
              
              {/* Overall Stats - Compact */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Score</span>
                  <span className="font-bold text-blue-600">{score}/{answeredQuestions}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: answeredQuestions > 0 ? `${(score / answeredQuestions) * 100}%` : '0%' }}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-1">
                  {answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0}% Accuracy
                </p>
              </div>

              {/* Round Progress - Compact */}
              <div className="mb-4 p-2 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-blue-800">Round {round}</span>
                  <span className="text-sm text-blue-600">{currentStateIndex + 1}/50</span>
                </div>
                <div className="bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStateIndex + 1) / 50) * 100}%` }}
                  />
                </div>
                <p className="text-center text-xs text-blue-600 mt-1">
                  {Math.round(((currentStateIndex + 1) / 50) * 100)}% Complete
                </p>
              </div>

              {/* Recent Answers - Compact */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Answers</h4>
                {answerHistory.slice(-8).reverse().map((result, index) => (
                  <div
                    key={answerHistory.length - index}
                    className={`p-2 rounded-lg border-l-4 ${
                      result.correct 
                        ? 'bg-green-50 border-green-400' 
                        : 'bg-red-50 border-red-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-xs">
                          {result.state}
                        </p>
                        <p className={`text-xs ${result.correct ? 'text-green-700' : 'text-red-700'}`}>
                          {result.capital}
                        </p>
                        {!result.correct && (
                          <p className="text-xs text-gray-500 mt-1">
                            You: {result.userAnswer}
                          </p>
                        )}
                      </div>
                      <div className="ml-2">
                        {result.correct ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Summary - Compact */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-lg font-bold text-green-600">{score}</div>
                    <div className="text-xs text-green-600">Correct</div>
                  </div>
                  <div className="bg-red-50 rounded p-2">
                    <div className="text-lg font-bold text-red-600">{answeredQuestions - score}</div>
                    <div className="text-xs text-red-600">Missed</div>
                  </div>
                </div>
                
                {round > 1 && (
                  <div className="mt-2 text-center">
                    <p className="text-xs text-gray-600">
                      🔄 You've completed {round - 1} full round{round > 2 ? 's' : ''}!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateCapitals;