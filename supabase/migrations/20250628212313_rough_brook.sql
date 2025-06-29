/*
  # Student Progress Tracking System

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `last_active` (timestamp)
    - `activity_progress`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `activity_type` (text) - reading, math, social-studies
      - `activity_name` (text) - specific activity name
      - `score` (integer) - number of correct answers
      - `total_questions` (integer) - total questions in activity
      - `accuracy` (integer) - percentage accuracy
      - `completed_at` (timestamp)
      - `grade_level` (text) - 3rd or 5th

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (since this is an educational app)
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_active timestamptz DEFAULT now()
);

-- Create activity_progress table
CREATE TABLE IF NOT EXISTS activity_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  activity_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL DEFAULT 0,
  accuracy integer NOT NULL DEFAULT 0,
  completed_at timestamptz DEFAULT now(),
  grade_level text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (educational app)
CREATE POLICY "Allow public access to students"
  ON students
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to activity_progress"
  ON activity_progress
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_activity_progress_student_id ON activity_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_activity_progress_completed_at ON activity_progress(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_progress_activity_type ON activity_progress(activity_type);