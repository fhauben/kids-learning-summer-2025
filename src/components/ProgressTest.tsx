import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';

const ProgressTest: React.FC = () => {
  const { 
    progress, 
    profile, 
    updateProgress, 
    getProgress, 
    getOverallProgress,
    createProfile,
    clearAllData 
  } = useProgress();

  const [testSubject, setTestSubject] = useState('math');
  const [testActivity, setTestActivity] = useState('test-activity');
  const [testScore, setTestScore] = useState(80);
  const [selectedGrade, setSelectedGrade] = useState('5th');
  const [testResult, setTestResult] = useState<string>('');

  const handleTestProgress = () => {
    try {
      const result = updateProgress(selectedGrade, testSubject, testActivity, testScore);
      setTestResult(`✅ Progress updated successfully! Activity: ${testActivity}, Score: ${testScore}%`);
      console.log('Progress update result:', result);
    } catch (error) {
      setTestResult(`❌ Error updating progress: ${error}`);
      console.error('Progress update error:', error);
    }
  };

  const handleCreateTestProfile = () => {
    try {
      createProfile('Test Student', selectedGrade, '👦');
      setTestResult('✅ Test profile created successfully!');
    } catch (error) {
      setTestResult(`❌ Error creating profile: ${error}`);
    }
  };

  const handleClearData = () => {
    try {
      clearAllData();
      setTestResult('✅ All data cleared successfully!');
    } catch (error) {
      setTestResult(`❌ Error clearing data: ${error}`);
    }
  };

  const currentProgress = getProgress(selectedGrade, testSubject);
  const overallProgress = getOverallProgress();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Progress Tracking Test</h1>
        <p className="text-gray-600">Test and verify that progress tracking is working correctly</p>
      </div>

      {/* Test Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Test Controls</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="3rd">3rd Grade</option>
              <option value="5th">5th Grade</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={testSubject}
              onChange={(e) => setTestSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="math">Math</option>
              <option value="reading">Reading</option>
              <option value="social-studies">Social Studies</option>
              <option value="science">Science</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity ID</label>
            <input
              type="text"
              value={testActivity}
              onChange={(e) => setTestActivity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="activity-id"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score (%)</label>
            <input
              type="number"
              value={testScore}
              onChange={(e) => setTestScore(Number(e.target.value))}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleTestProgress}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Test Progress Update
          </button>
          
          <button
            onClick={handleCreateTestProfile}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Test Profile
          </button>
          
          <button
            onClick={handleClearData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>

        {testResult && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm">{testResult}</p>
          </div>
        )}
      </div>

      {/* Current Progress Display */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Activities:</span>
              <span className="font-semibold">{overallProgress.totalActivities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average Score:</span>
              <span className="font-semibold">{overallProgress.averageScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Streak:</span>
              <span className="font-semibold">{overallProgress.totalStreak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Time Spent:</span>
              <span className="font-semibold">{overallProgress.totalTimeSpent} min</span>
            </div>
          </div>
        </div>

        {/* Current Subject Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {selectedGrade} Grade - {testSubject.replace('-', ' ')}
          </h2>
          {currentProgress ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Activities:</span>
                <span className="font-semibold">{currentProgress.completedActivities.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak:</span>
                <span className="font-semibold">{currentProgress.streak} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Played:</span>
                <span className="font-semibold text-sm">
                  {new Date(currentProgress.lastPlayed).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Time:</span>
                <span className="font-semibold">{currentProgress.totalTimeSpent} min</span>
              </div>
              
              {Object.keys(currentProgress.scores).length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Activity Scores:</h3>
                  <div className="space-y-1">
                    {Object.entries(currentProgress.scores).map(([activity, score]) => (
                      <div key={activity} className="flex justify-between text-sm">
                        <span className="text-gray-600">{activity}:</span>
                        <span className="font-semibold">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No progress data for this subject yet.</p>
          )}
        </div>
      </div>

      {/* Raw Data Display */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Raw Progress Data</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          <pre className="text-xs text-gray-800">
            {JSON.stringify({ progress, profile }, null, 2)}
          </pre>
        </div>
      </div>

      {/* Local Storage Check */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Local Storage Check</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Progress Data:</h3>
            <div className="bg-gray-100 p-3 rounded text-sm">
              {localStorage.getItem('kids-learning-progress') ? (
                <span className="text-green-600">✅ Found</span>
              ) : (
                <span className="text-red-600">❌ Not found</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Profile Data:</h3>
            <div className="bg-gray-100 p-3 rounded text-sm">
              {localStorage.getItem('kids-learning-profile') ? (
                <span className="text-green-600">✅ Found</span>
              ) : (
                <span className="text-red-600">❌ Not found</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTest; 