import React, { useState } from 'react'
import { ArrowLeft, Trophy, Target, TrendingUp, Calendar, Award, Star, Flame, BookOpen, Calculator, Globe } from 'lucide-react'
import { Student } from '../lib/supabase'
import { useProgress, ProgressData, Achievement } from '../hooks/useProgress'

interface ProgressPageProps {
  student: Student
  onBack: () => void
}

const ProgressPage: React.FC<ProgressPageProps> = ({ student, onBack }) => {
  const { progressData, loading, defaultAchievements } = useProgress(student.id)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'subjects'>('overview')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your progress...</p>
        </div>
      </div>
    )
  }

  if (!progressData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No progress data available</p>
        </div>
      </div>
    )
  }

  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'math': return <Calculator className="w-6 h-6" />
      case 'reading': return <BookOpen className="w-6 h-6" />
      case 'social-studies': return <Globe className="w-6 h-6" />
      default: return <Target className="w-6 h-6" />
    }
  }

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'math': return 'purple'
      case 'reading': return 'blue'
      case 'social-studies': return 'green'
      default: return 'gray'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-800">{progressData.totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {progressData.totalQuestions > 0 
                  ? Math.round((progressData.totalScore / progressData.totalQuestions) * 100)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <Flame className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-800">{progressData.currentStreak}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Best Streak</p>
              <p className="text-2xl font-bold text-gray-800">{progressData.bestStreak}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Progress</h3>
        <div className="space-y-4">
          {Object.entries(progressData.subjectProgress).map(([subject, data]) => (
            <div key={subject} className="flex items-center space-x-4">
              <div className="flex items-center w-32">
                {getSubjectIcon(subject)}
                <span className="ml-2 font-medium capitalize">{subject.replace('-', ' ')}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{data.activities} activities</span>
                  <span>{data.averageScore}% average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${getSubjectColor(subject)}-500 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(data.averageScore, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultAchievements.filter(a => a.unlocked).slice(0, 6).map(achievement => (
            <div key={achievement.id} className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <span className="text-2xl mr-3">{achievement.icon}</span>
              <div>
                <p className="font-semibold text-gray-800">{achievement.name}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultAchievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center mb-3">
                <span className={`text-3xl mr-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </span>
                <div>
                  <p className={`font-semibold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.name}
                  </p>
                  {achievement.unlocked && (
                    <p className="text-xs text-green-600 font-medium">✓ Unlocked</p>
                  )}
                </div>
              </div>
              <p className={`text-sm ${achievement.unlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                {achievement.description}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Requirement: {achievement.requirement.value} {achievement.requirement.type}
                {achievement.requirement.subject && ` in ${achievement.requirement.subject}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSubjects = () => (
    <div className="space-y-6">
      {Object.entries(progressData.subjectProgress).map(([subject, data]) => (
        <div key={subject} className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            {getSubjectIcon(subject)}
            <h3 className="text-xl font-semibold text-gray-800 ml-3 capitalize">
              {subject.replace('-', ' ')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{data.activities}</p>
              <p className="text-sm text-gray-600">Activities Completed</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{data.averageScore}%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{data.questions}</p>
              <p className="text-sm text-gray-600">Questions Answered</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`bg-${getSubjectColor(subject)}-500 h-3 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(data.averageScore, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Learning
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Progress Dashboard</h1>
            <p className="text-gray-600">Welcome back, {student.name}!</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-md mb-6 max-w-md mx-auto">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab('achievements')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === 'achievements'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setSelectedTab('subjects')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              selectedTab === 'subjects'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Subjects
          </button>
        </div>

        {/* Content */}
        <main>
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'achievements' && renderAchievements()}
          {selectedTab === 'subjects' && renderSubjects()}
        </main>
      </div>
    </div>
  )
}

export default ProgressPage