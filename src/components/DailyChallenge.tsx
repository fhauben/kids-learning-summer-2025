import React, { useState, useEffect } from 'react';
import { Calendar, Target, Award, Clock, CheckCircle } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'math' | 'reading' | 'social-studies' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  date: string;
}

const DailyChallenge: React.FC = () => {
  const { updateProgress, getProgress } = useProgress();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    generateDailyChallenges();
  }, []);

  const generateDailyChallenges = () => {
    const today = new Date().toISOString().split('T')[0];
    
    const dailyChallenges: DailyChallenge[] = [
      {
        id: '1',
        title: 'Math Master',
        description: 'Complete 3 math activities with 80% or higher',
        type: 'math',
        difficulty: 'medium',
        points: 50,
        completed: false,
        date: today
      },
      {
        id: '2',
        title: 'Reading Explorer',
        description: 'Read and complete 2 reading comprehension passages',
        type: 'reading',
        difficulty: 'easy',
        points: 30,
        completed: false,
        date: today
      },
      {
        id: '3',
        title: 'Geography Whiz',
        description: 'Learn about 5 new states and their capitals',
        type: 'social-studies',
        difficulty: 'hard',
        points: 75,
        completed: false,
        date: today
      },
      {
        id: '4',
        title: 'Learning Streak',
        description: 'Complete activities for 3 consecutive days',
        type: 'mixed',
        difficulty: 'medium',
        points: 100,
        completed: false,
        date: today
      }
    ];

    setChallenges(dailyChallenges);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'math': return '🧮';
      case 'reading': return '📚';
      case 'social-studies': return '🌍';
      case 'mixed': return '🎯';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'math': return 'border-l-purple-500';
      case 'reading': return 'border-l-blue-500';
      case 'social-studies': return 'border-l-green-500';
      case 'mixed': return 'border-l-orange-500';
      default: return 'border-l-gray-500';
    }
  };

  const markChallengeComplete = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true }
          : challenge
      )
    );

    // Update progress
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      updateProgress('5th', challenge.type, `daily-challenge-${challengeId}`, challenge.points);
    }
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Daily Challenges</h1>
        </div>
        <p className="text-gray-600">Complete challenges to earn points and build your learning streak!</p>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{completedCount}/{challenges.length}</div>
            <div className="text-sm text-gray-600">Challenges Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((completedCount / challenges.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getTypeColor(challenge.type)} transition-all duration-200 ${
              challenge.completed ? 'opacity-75' : 'hover:shadow-lg'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{getTypeIcon(challenge.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      {challenge.title}
                      {challenge.completed && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.toUpperCase()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-1" />
                    {challenge.points} points
                  </div>
                </div>
              </div>

              <div className="ml-4">
                {!challenge.completed ? (
                  <button
                    onClick={() => markChallengeComplete(challenge.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Complete
                  </button>
                ) : (
                  <div className="text-green-500 font-semibold flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 Daily Challenge Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Complete challenges to earn bonus points</li>
          <li>• Challenges reset every day at midnight</li>
          <li>• Higher difficulty challenges give more points</li>
          <li>• Keep your streak going for bonus rewards!</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyChallenge; 