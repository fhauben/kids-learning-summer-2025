import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Keyboard, Target, Star, Clock, CheckCircle, Lock, Play, Trophy } from 'lucide-react';
import { TypingLesson, typingLessons, getLessonsByLevel, unlockNextLesson } from '../../../data/typingLessons';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface TypingPracticeProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
  totalCharacters: number;
  correctCharacters: number;
}

const TypingPractice: React.FC<TypingPracticeProps> = ({ onBack, onSaveProgress }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentLesson, setCurrentLesson] = useState<TypingLesson | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    timeSpent: 0,
    totalCharacters: 0,
    correctCharacters: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);


  const levels = [1, 2, 3, 4, 5];
  const levelTitles = {
    1: 'Home Row Basics',
    2: 'Top Row',
    3: 'Bottom Row', 
    4: 'Numbers & Symbols',
    5: 'Sentences & Stories'
  };

  const getLevelColor = (level: number) => {
    const colors = {
      1: 'bg-green-100 border-green-500',
      2: 'bg-blue-100 border-blue-500', 
      3: 'bg-purple-100 border-purple-500',
      4: 'bg-orange-100 border-orange-500',
      5: 'bg-red-100 border-red-500'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 border-gray-500';
  };

  const getLevelIcon = (level: number) => {
    const icons = {
      1: '🏠',
      2: '⬆️',
      3: '⬇️',
      4: '🔢',
      5: '📝'
    };
    return icons[level as keyof typeof icons] || '📋';
  };

  const startLesson = (lesson: TypingLesson) => {
    if (!lesson.unlocked) return;
    
    setCurrentLesson(lesson);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setUserInput('');
    setStats({
      wpm: 0,
      accuracy: 100,
      errors: 0,
      timeSpent: 0,
      totalCharacters: 0,
      correctCharacters: 0
    });
    setShowResults(false);
    setLessonCompleted(false);
    setIsTyping(true);
    setStartTime(Date.now());
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const calculateWPM = (correctCharacters: number, timeSpent: number): number => {
    if (timeSpent === 0) return 0;
    const minutes = timeSpent / 60000; // Convert milliseconds to minutes
    const words = correctCharacters / 5; // Standard: 5 characters = 1 word
    return Math.round(words / minutes);
  };

  const calculateAccuracy = (correctCharacters: number, totalCharacters: number): number => {
    if (totalCharacters === 0) return 100;
    return Math.round((correctCharacters / totalCharacters) * 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentLesson || !isTyping) return;

    const value = e.target.value;
    const currentWord = currentLesson.content[currentWordIndex];
    
    if (value.length > currentWord.length) return;
    
    setUserInput(value);
    
    if (value === currentWord) {
      if (currentWordIndex < currentLesson.content.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setUserInput('');
      } else {
        completeLesson();
      }
    }
  };

  const completeLesson = () => {
    if (!currentLesson || !startTime) return;
    
    const timeSpent = Date.now() - startTime;
    const wpm = calculateWPM(stats.correctCharacters, timeSpent);
    const accuracy = calculateAccuracy(stats.correctCharacters, stats.totalCharacters);
    
    const finalStats = {
      ...stats,
      wpm,
      accuracy,
      timeSpent
    };
    
    setStats(finalStats);
    setIsTyping(false);
    setShowResults(true);
    setLessonCompleted(true);
    
    currentLesson.completed = true;
    currentLesson.stars = 3; // Basic star calculation
    
    unlockNextLesson(currentLesson.id);
    
    if (onSaveProgress) {
      const progressScore = Math.round((wpm / currentLesson.targetWPM) * 50 + (accuracy / 100) * 50);
      onSaveProgress(progressScore, 100);
    }
  };

  const renderStars = (stars: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < stars ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCurrentWord = () => {
    if (!currentLesson) return '';
    return currentLesson.content[currentWordIndex] || '';
  };

  const getDisplayText = () => {
    if (!currentLesson) return { completed: '', current: '', remaining: '' };
    
    const currentWord = getCurrentWord();
    const completedWords = currentLesson.content.slice(0, currentWordIndex);
    const remainingWords = currentLesson.content.slice(currentWordIndex + 1);
    
    return {
      completed: completedWords.join(' '),
      current: currentWord,
      remaining: remainingWords.join(' ')
    };
  };

  const displayText = getDisplayText();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to 3rd Grade
      </button>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={stats.wpm}
        total={currentLesson?.targetWPM || 0}
        message="Typing Master!"
      />

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Keyboard className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Typing Practice</h1>
        </div>
        <p className="text-gray-600">Learn to type like a pro! Start with the home row and work your way up.</p>
      </div>

      {!currentLesson ? (
        <div className="space-y-6">
          <div className="flex justify-center space-x-2 mb-8">
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-2">{getLevelIcon(level)}</span>
                  <span>Level {level}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {levelTitles[selectedLevel as keyof typeof levelTitles]}
            </h2>
            <p className="text-gray-600">Complete lessons to unlock the next level</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getLessonsByLevel(selectedLevel).map(lesson => (
              <div
                key={lesson.id}
                className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                  lesson.unlocked
                    ? 'cursor-pointer hover:shadow-lg hover:scale-105'
                    : 'opacity-60 cursor-not-allowed'
                } ${getLevelColor(selectedLevel)}`}
                onClick={() => lesson.unlocked && startLesson(lesson)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {lesson.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    ) : lesson.unlocked ? (
                      <Play className="w-6 h-6 text-blue-500 mr-2" />
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400 mr-2" />
                    )}
                    <h3 className="font-semibold text-gray-800">Lesson {lesson.lessonNumber}</h3>
                  </div>
                  {lesson.completed && (
                    <div className="flex">
                      {renderStars(lesson.stars)}
                    </div>
                  )}
                </div>
                
                <h4 className="font-medium text-gray-800 mb-2">{lesson.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    <span>{lesson.targetWPM} WPM</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>~{Math.ceil(lesson.content.length / 2)} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentLesson.title}</h2>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>
              <button
                onClick={() => setCurrentLesson(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>Progress: {currentWordIndex + 1} of {currentLesson.content.length}</span>
              <span>Target: {currentLesson.targetWPM} WPM, {currentLesson.targetAccuracy}% accuracy</span>
            </div>
            
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentWordIndex + 1) / currentLesson.content.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-center mb-8">
              <div className="text-4xl font-mono text-gray-800 leading-relaxed">
                <span className="text-gray-400">{displayText.completed}</span>
                <span className="bg-blue-100 px-2 rounded">{displayText.current}</span>
                <span className="text-gray-400">{displayText.remaining}</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="text-2xl font-mono text-center w-full max-w-2xl p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Start typing..."
                disabled={!isTyping}
                autoFocus
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.wpm}</div>
              <div className="text-sm text-gray-600">WPM</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.errors}</div>
              <div className="text-sm text-gray-600">Errors</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(stats.timeSpent / 1000)}s
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>

          {showResults && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Lesson Complete!</h3>
                
                <div className="flex justify-center mb-4">
                  {renderStars(currentLesson.stars)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-blue-600">{stats.wpm}</div>
                    <div className="text-sm text-gray-600">WPM</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-green-600">{stats.accuracy}%</div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-red-600">{stats.errors}</div>
                    <div className="text-sm text-gray-600">Errors</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-purple-600">
                      {Math.round(stats.timeSpent / 1000)}s
                    </div>
                    <div className="text-sm text-gray-600">Time</div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => startLesson(currentLesson)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setCurrentLesson(null)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Back to Lessons
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypingPractice; 