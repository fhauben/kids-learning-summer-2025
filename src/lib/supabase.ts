import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-project-url' && supabaseAnonKey !== 'your-anon-key')

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface Student {
  id: string
  name: string
  created_at: string
  last_active: string
}

export interface ActivityProgress {
  id: string
  student_id: string
  activity_type: string
  activity_name: string
  score: number
  total_questions: number
  accuracy: number
  completed_at: string
  grade_level: string
}

export interface StudentStats {
  total_activities: number
  average_accuracy: number
  total_questions_answered: number
  total_correct_answers: number
  favorite_subject: string
  recent_activities: ActivityProgress[]
}

// Student functions
export async function createStudent(name: string): Promise<Student | null> {
  if (!supabase) {
    // Return a mock student when Supabase is not configured
    return {
      id: 'local-' + Date.now(),
      name,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('students')
    .insert([{ name, last_active: new Date().toISOString() }])
    .select()
    .single()

  if (error) {
    console.error('Error creating student:', error)
    return null
  }

  return data
}

export async function getStudentByName(name: string): Promise<Student | null> {
  if (!supabase) {
    // Return null for local mode - always create new student
    return null
  }

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('name', name)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    console.error('Error getting student:', error)
    return null
  }

  return data
}

export async function updateStudentLastActive(studentId: string): Promise<void> {
  if (!supabase) return

  const { error } = await supabase
    .from('students')
    .update({ last_active: new Date().toISOString() })
    .eq('id', studentId)

  if (error) {
    console.error('Error updating student last active:', error)
  }
}

// Progress functions
export async function saveActivityProgress(
  studentId: string,
  activityType: string,
  activityName: string,
  score: number,
  totalQuestions: number,
  gradeLevel: string
): Promise<void> {
  if (!supabase) {
    console.log('Progress saved locally:', { studentId, activityType, activityName, score, totalQuestions, gradeLevel })
    return
  }

  const accuracy = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0

  const { error } = await supabase
    .from('activity_progress')
    .insert([{
      student_id: studentId,
      activity_type: activityType,
      activity_name: activityName,
      score,
      total_questions: totalQuestions,
      accuracy,
      grade_level: gradeLevel,
      completed_at: new Date().toISOString()
    }])

  if (error) {
    console.error('Error saving activity progress:', error)
  }
}

export async function getStudentProgress(studentId: string): Promise<ActivityProgress[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('activity_progress')
    .select('*')
    .eq('student_id', studentId)
    .order('completed_at', { ascending: false })

  if (error) {
    console.error('Error getting student progress:', error)
    return []
  }

  return data || []
}

export async function getStudentStats(studentId: string): Promise<StudentStats> {
  const progress = await getStudentProgress(studentId)
  
  if (progress.length === 0) {
    return {
      total_activities: 0,
      average_accuracy: 0,
      total_questions_answered: 0,
      total_correct_answers: 0,
      favorite_subject: 'None',
      recent_activities: []
    }
  }

  const totalActivities = progress.length
  const totalQuestions = progress.reduce((sum, p) => sum + p.total_questions, 0)
  const totalCorrect = progress.reduce((sum, p) => sum + p.score, 0)
  const averageAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  // Find favorite subject
  const subjectCounts: { [key: string]: number } = {}
  progress.forEach(p => {
    subjectCounts[p.activity_type] = (subjectCounts[p.activity_type] || 0) + 1
  })
  
  const favoriteSubject = Object.keys(subjectCounts).reduce((a, b) => 
    subjectCounts[a] > subjectCounts[b] ? a : b, 'None'
  )

  return {
    total_activities: totalActivities,
    average_accuracy: averageAccuracy,
    total_questions_answered: totalQuestions,
    total_correct_answers: totalCorrect,
    favorite_subject: favoriteSubject,
    recent_activities: progress.slice(0, 10)
  }
}