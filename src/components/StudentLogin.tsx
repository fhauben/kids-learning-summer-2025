import React, { useState } from 'react'
import { User, LogIn, UserPlus, AlertCircle } from 'lucide-react'
import { createStudent, getStudentByName, updateStudentLastActive, Student, isSupabaseConfigured } from '../lib/supabase'

interface StudentLoginProps {
  onStudentLogin: (student: Student) => void
}

const StudentLogin: React.FC<StudentLoginProps> = ({ onStudentLogin }) => {
  const [studentName, setStudentName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentName.trim()) return

    setIsLoading(true)
    setError('')

    try {
      // First, try to find existing student
      let student = await getStudentByName(studentName.trim())
      
      if (student) {
        // Update last active time
        await updateStudentLastActive(student.id)
        onStudentLogin(student)
      } else {
        // Create new student
        student = await createStudent(studentName.trim())
        if (student) {
          onStudentLogin(student)
        } else {
          setError('Failed to create student profile. Please try again.')
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
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

        {!isSupabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Demo Mode</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Progress won't be saved. Click "Connect to Supabase" in the top right to enable progress tracking.
                </p>
              </div>
            </div>
          </div>
        )}

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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

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
            {isSupabaseConfigured 
              ? "Your progress will be saved so you can continue where you left off."
              : "Connect to Supabase to save your progress between sessions."
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin