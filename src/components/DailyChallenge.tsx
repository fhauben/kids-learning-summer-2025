import React, { useState, useEffect } from 'react';
import { Calendar, Target, Award, Clock, CheckCircle, Star, TrendingUp, Zap, Trophy, Flame } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'math' | 'reading' | 'social-studies' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  date: string;
  progress?: number;
  target?: number;
  streakBonus?: number;
  isStreakChallenge?: boolean;
  timeLimit?: number; // in minutes
  specialReward?: string;
}

interface ChallengeTemplate {
  title: string;
  description: string;
  type: 'math' | 'reading' | 'social-studies' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  basePoints: number;
  generateTarget: (userLevel: number) => number;
  checkProgress: (progress: any, userLevel: number) => number;
  isStreakChallenge?: boolean;
}

const DailyChallenge: React.FC = () => {
  const { progress, profile, updateProgress, getProgress } = useProgress();
  const { playSuccess } = useSoundEffects();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);
  const [userLevel, setUserLevel] = useState(1);
  const [streakDays, setStreakDays] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');

  useEffect(() => {
    calculateUserLevel();
    calculateStreak();
    generateDailyChallenges();
  }, [progress]);

  const calculateUserLevel = () => {
    const totalActivities = progress.reduce((sum: number, p: any) => sum + p.completedActivities.length, 0);
    const totalScores = progress.reduce((sum: number, p: any) => {
      const scores = Object.values(p.scores);
      return sum + scores.reduce((s: number, score: any) => s + score, 0);
    }, 0);
    const averageScore = totalScores > 0 ? totalScores / totalActivities : 0;
    
    // Level based on activities completed and average score
    const level = Math.max(1, Math.floor((totalActivities / 10) + (averageScore / 100)));
    setUserLevel(level);
  };

  const calculateStreak = () => {
    // Calculate current streak based on last played dates
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasActivity = progress.some((p: any) => {
        const lastPlayed = new Date(p.lastPlayed).toISOString().split('T')[0];
        return lastPlayed === dateStr;
      });
      
      if (hasActivity) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    setStreakDays(streak);
  };

  const challengeTemplates: ChallengeTemplate[] = [
    // Math Challenges
    {
      title: 'Math Master',
      description: 'Complete {target} math activities with 80% or higher',
      type: 'math',
      difficulty: 'medium',
      basePoints: 50,
      generateTarget: (level) => Math.min(3 + Math.floor(level / 2), 8),
      checkProgress: (progress: any, level: number) => {
        const mathProgress = progress.filter((p: any) => p.subject === 'math');
        return mathProgress.reduce((sum: number, p: any) => {
          const scores = Object.values(p.scores);
          const highScores = scores.filter((s: any) => s >= 80).length;
          return sum + highScores;
        }, 0);
      }
    },
    {
      title: 'Speed Calculator',
      description: 'Solve {target} math problems in under 2 minutes each',
      type: 'math',
      difficulty: 'hard',
      basePoints: 75,
      generateTarget: (level) => Math.min(5 + level, 15),
      checkProgress: (progress: any, level: number) => {
        const mathProgress = progress.filter((p: any) => p.subject === 'math');
        return mathProgress.reduce((sum: number, p: any) => sum + p.completedActivities.length, 0);
      }
    },
    
    // Reading Challenges
    {
      title: 'Reading Explorer',
      description: 'Complete {target} reading comprehension passages',
      type: 'reading',
      difficulty: 'easy',
      basePoints: 30,
      generateTarget: (level) => Math.min(2 + Math.floor(level / 3), 5),
      checkProgress: (progress: any, level: number) => {
        const readingProgress = progress.filter((p: any) => p.subject === 'reading');
        return readingProgress.reduce((sum: number, p: any) => sum + p.completedActivities.length, 0);
      }
    },
    {
      title: 'Vocabulary Builder',
      description: 'Learn {target} new words from the dictionary',
      type: 'reading',
      difficulty: 'medium',
      basePoints: 40,
      generateTarget: (level) => Math.min(5 + level, 20),
      checkProgress: (progress: any, level: number) => {
        const readingProgress = progress.filter((p: any) => p.subject === 'reading');
        return readingProgress.reduce((sum: number, p: any) => {
          const scores = Object.values(p.scores);
          return sum + scores.length;
        }, 0);
      }
    },
    
    // Social Studies Challenges
    {
      title: 'Geography Whiz',
      description: 'Learn about {target} new states and their capitals',
      type: 'social-studies',
      difficulty: 'hard',
      basePoints: 75,
      generateTarget: (level) => Math.min(5 + Math.floor(level / 2), 15),
      checkProgress: (progress: any, level: number) => {
        const ssProgress = progress.filter((p: any) => p.subject === 'social-studies');
        return ssProgress.reduce((sum: number, p: any) => sum + p.completedActivities.length, 0);
      }
    },
    {
      title: 'History Explorer',
      description: 'Read {target} American history passages',
      type: 'social-studies',
      difficulty: 'medium',
      basePoints: 45,
      generateTarget: (level) => Math.min(3 + Math.floor(level / 3), 8),
      checkProgress: (progress: any, level: number) => {
        const ssProgress = progress.filter((p: any) => p.subject === 'social-studies');
        return ssProgress.reduce((sum: number, p: any) => {
          const scores = Object.values(p.scores);
          return sum + scores.length;
        }, 0);
      }
    },
    
    // Mixed Challenges
    {
      title: 'Learning Streak',
      description: 'Complete activities for {target} consecutive days',
      type: 'mixed',
      difficulty: 'medium',
      basePoints: 100,
      generateTarget: (level) => Math.min(3 + Math.floor(level / 2), 7),
      checkProgress: (progress: any, level: number) => streakDays,
      isStreakChallenge: true
    },
    {
      title: 'Perfect Score Hunter',
      description: 'Get {target} perfect scores (100%)',
      type: 'mixed',
      difficulty: 'hard',
      basePoints: 120,
      generateTarget: (level) => Math.min(2 + Math.floor(level / 3), 5),
      checkProgress: (progress: any, level: number) => {
        return progress.reduce((sum: number, p: any) => {
          const scores = Object.values(p.scores);
          const perfectScores = scores.filter((s: any) => s === 100).length;
          return sum + perfectScores;
        }, 0);
      }
    },
    {
      title: 'Time Master',
      description: 'Spend {target} minutes learning today',
      type: 'mixed',
      difficulty: 'easy',
      basePoints: 25,
      generateTarget: (level) => Math.min(15 + (level * 2), 60),
      checkProgress: (progress: any, level: number) => {
        return progress.reduce((sum: number, p: any) => sum + p.totalTimeSpent, 0);
      }
    }
  ];

  const generateDailyChallenges = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Shuffle templates and select 4-6 challenges
    const shuffledTemplates = [...challengeTemplates].sort(() => Math.random() - 0.5);
    const selectedTemplates = shuffledTemplates.slice(0, 4 + Math.floor(userLevel / 3));
    
    const dailyChallenges: DailyChallenge[] = selectedTemplates.map((template, index) => {
      const target = template.generateTarget(userLevel);
      const currentProgress = template.checkProgress(progress, userLevel);
      const progressValue = Math.min(currentProgress, target);
      
      // Adjust difficulty based on user level
      let adjustedDifficulty = template.difficulty;
      if (userLevel > 5 && template.difficulty === 'easy') adjustedDifficulty = 'medium';
      if (userLevel > 10 && template.difficulty === 'medium') adjustedDifficulty = 'hard';
      
      // Calculate points with level bonus
      const levelBonus = Math.floor(userLevel / 2) * 5;
      const points = template.basePoints + levelBonus;
      
      // Add streak bonus for streak challenges
      const streakBonus = template.isStreakChallenge ? Math.min(streakDays * 10, 50) : 0;
      
      return {
        id: (index + 1).toString(),
        title: template.title,
        description: template.description.replace('{target}', target.toString()),
        type: template.type,
        difficulty: adjustedDifficulty,
        points: points + streakBonus,
        completed: progressValue >= target,
        date: today,
        progress: progressValue,
        target: target,
        streakBonus: streakBonus,
        isStreakChallenge: template.isStreakChallenge,
        specialReward: progressValue >= target ? getSpecialReward(template.type) : undefined
      };
    });

    setChallenges(dailyChallenges);
  };

  const getSpecialReward = (type: string): string => {
    const rewards: { [key: string]: string[] } = {
      math: ['🧮 Math Genius Badge', '⚡ Speed Calculator', '🎯 Perfect Score'],
      reading: ['📚 Bookworm Badge', '🔍 Reading Detective', '📖 Story Master'],
      'social-studies': ['🌍 Geography Expert', '🏛️ History Buff', '🗺️ Map Master'],
      mixed: ['🌟 Learning Champion', '🔥 Streak Master', '🏆 Achievement Unlocked']
    };
    
    const typeRewards = rewards[type] || rewards.mixed;
    return typeRewards[Math.floor(Math.random() * typeRewards.length)];
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
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge || challenge.completed) return;

    playSuccess();
    
    setChallenges(prev => 
      prev.map(c => 
        c.id === challengeId 
          ? { ...c, completed: true }
          : c
      )
    );

    // Update progress
    updateProgress('5th', challenge.type, `daily-challenge-${challengeId}`, challenge.points);
    
    // Show reward if special
    if (challenge.specialReward) {
      setRewardMessage(challenge.specialReward);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const totalPoints = challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);
  const totalPossiblePoints = challenges.reduce((sum, c) => sum + c.points, 0);

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

      {/* User Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">Level {userLevel}</div>
            <div className="text-sm text-gray-600">Your Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
              <Flame className="w-5 h-5 mr-1" />
              {streakDays}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{completedCount}/{challenges.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Points Earned</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Daily Progress</span>
          <span className="text-sm text-gray-500">{totalPoints}/{totalPossiblePoints} points</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(totalPoints / totalPossiblePoints) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getTypeColor(challenge.type)} transition-all duration-200 ${
              challenge.completed ? 'opacity-75' : 'hover:shadow-lg hover:scale-[1.02]'
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
                      {challenge.isStreakChallenge && (
                        <Flame className="w-4 h-4 text-orange-500 ml-2" />
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm">{challenge.description}</p>
                  </div>
                </div>
                
                {/* Progress Bar for Challenge */}
                {challenge.progress !== undefined && challenge.target && (
                  <div className="mt-3 mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: {challenge.progress}/{challenge.target}</span>
                      <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.toUpperCase()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 mr-1" />
                    {challenge.points} points
                    {challenge.streakBonus && challenge.streakBonus > 0 && (
                      <span className="text-orange-500 ml-1">(+{challenge.streakBonus} streak)</span>
                    )}
                  </div>
                  {challenge.specialReward && challenge.completed && (
                    <div className="flex items-center text-sm text-purple-600">
                      <Star className="w-4 h-4 mr-1" />
                      {challenge.specialReward}
                    </div>
                  )}
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

      {/* Special Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Special Reward!</h3>
            <p className="text-gray-600 mb-4">{rewardMessage}</p>
            <button
              onClick={() => setShowReward(false)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
        <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Daily Challenge Tips
        </h3>
        <ul className="text-sm text-orange-700 space-y-2">
          <li className="flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Complete challenges to earn bonus points and level up
          </li>
          <li className="flex items-center">
            <Flame className="w-4 h-4 mr-2" />
            Maintain your streak for extra rewards and bonuses
          </li>
          <li className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Higher levels unlock more challenging and rewarding tasks
          </li>
          <li className="flex items-center">
            <Trophy className="w-4 h-4 mr-2" />
            Special rewards are given for completing difficult challenges
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DailyChallenge; 