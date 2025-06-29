import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';

const ProgressTracker: React.FC = () => {
  const {
    progress,
    profile,
    isLoading,
    getOverallProgress,
    exportData,
    importData,
    clearAllData,
    createProfile,
    updateProfile
  } = useProgress();

  const [showProfileForm, setShowProfileForm] = useState(!profile || !profile.name || !profile.grade);
  const [showImport, setShowImport] = useState(false);
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  const overallProgress = getOverallProgress();

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importData(file);
      setShowImport(false);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const grade = formData.get('grade') as string;
    const avatar = formData.get('avatar') as string;
    
    if (profile) {
      // Update existing profile
      updateProfile({ name, grade, avatar });
    } else {
      // Create new profile
      createProfile(name, grade || undefined, avatar || undefined);
    }
    setShowProfileForm(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Learning Progress</h1>
        <p className="text-gray-600">Track your achievements and keep learning!</p>
      </div>

      {/* Profile Section */}
      {profile && !showProfileForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{profile.avatar}</div>
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                <p className="text-gray-600">Grade {profile.grade} • Joined {new Date(profile.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {profile ? 'Edit Your Profile' : 'Create Your Profile'}
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={profile?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                name="grade"
                required
                defaultValue={profile?.grade || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your grade</option>
                <option value="3rd">3rd Grade</option>
                <option value="4th">4th Grade</option>
                <option value="5th">5th Grade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
              <select
                name="avatar"
                required
                defaultValue={profile?.avatar || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an avatar</option>
                <option value="👦">👦 Boy</option>
                <option value="👧">👧 Girl</option>
                <option value="🦊">🦊 Fox</option>
                <option value="🐱">🐱 Cat</option>
                <option value="🐶">🐶 Dog</option>
                <option value="🦁">🦁 Lion</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {profile ? 'Update Profile' : 'Create Profile'}
            </button>
          </form>
        </div>
      )}

      {/* Overall Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{overallProgress.totalActivities}</div>
            <div className="text-sm text-gray-600">Activities Completed</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{overallProgress.averageScore}%</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{overallProgress.totalStreak}</div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{overallProgress.totalTimeSpent}</div>
            <div className="text-sm text-gray-600">Minutes Spent</div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      {progress.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
          <div className="space-y-4">
            {progress.map((subjectProgress) => (
              <div key={`${subjectProgress.grade}-${subjectProgress.subject}`} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    Grade {subjectProgress.grade} - {subjectProgress.subject.replace('-', ' ')}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {subjectProgress.completedActivities.length} activities
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span>Streak: {subjectProgress.streak} days</span>
                  <span>Last played: {new Date(subjectProgress.lastPlayed).toLocaleDateString()}</span>
                </div>
                {subjectProgress.achievements.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Achievements: </span>
                    <span className="text-sm">{subjectProgress.achievements.join(', ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportData}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            📥 Export Progress
          </button>
          <button
            onClick={() => setShowImport(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            📤 Import Progress
          </button>
          <button
            onClick={clearAllData}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            🗑️ Clear All Data
          </button>
        </div>

        {showImport && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Select a previously exported progress file to restore your data:
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              ref={setFileInput}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={() => setShowImport(false)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your progress is saved locally in your browser</li>
          <li>• Use the export feature to backup your progress</li>
          <li>• You can import your progress on different devices</li>
          <li>• Keep your streak going by learning daily!</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressTracker; 