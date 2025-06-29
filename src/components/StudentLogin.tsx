import React, { useState } from 'react'
import { User, LogIn, UserPlus } from 'lucide-react'

interface StudentLoginProps {
  onStudentLogin: (studentName: string) => void
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onStudentLogin }) => {
  const [studentName, setStudentName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim()) return

    setIsLoading(true)

    try {
      // Simple localStorage-based login - just use the name
      onStudentLogin(studentName.trim())
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🦅</span>
            <User className="w-12 h-12 text-blue-600 mr-3" />
            <span className="text-4xl ml-3">🦅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to</h1>
          <h2 className="text-2xl font-bold text-blue-600">Indy Summer 2025 Learning</h2>
          <p className="text-gray-600 mt-4">Enter your name to start learning!</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="text-green-600 mr-2 mt-0.5">✅</div>
            <div>
              <p className="text-sm text-green-800 font-medium">Progress Saved Locally</p>
              <p className="text-xs text-green-700 mt-1">
                Your progress will be saved in your browser and you can export/import it anytime.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              placeholder="Enter your first name"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !studentName.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Start Learning
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <UserPlus className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">New Student?</span>
            </div>
            <p className="text-xs text-blue-600">
              Just enter your name and we'll create your learning profile automatically!
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your progress will be saved locally so you can continue where you left off.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin