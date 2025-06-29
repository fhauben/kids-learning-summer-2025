import { useCallback, useState, useEffect } from 'react'
import { saveActivityProgress, getStudentProgress, ActivityProgress } from '../lib/supabase'

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: {
    type: 'score' | 'streak' | 'activities' | 'perfect_scores';
    value: number;
    subject?: string;
  };
}

export interface ProgressData {
  totalActivities: number;
  totalScore: number;
  totalQuestions: number;
  currentStreak: number;
  bestStreak: number;
  achievements: Achievement[];
  subjectProgress: {
    [subject: string]: {
      activities: number;
      score: number;
      questions: number;
      averageScore: number;
    };
  };
}

export const useProgress = (studentId: string | null) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(false);

  // Predefined achievements
  const defaultAchievements: Achievement[] = [
    {
      id: 'first_activity',
      name: 'First Steps',
      description: 'Complete your first learning activity',
      icon: '🎯',
      unlocked: false,
      requirement: { type: 'activities', value: 1 }
    },
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Get 100% on any activity',
      icon: '⭐',
      unlocked: false,
      requirement: { type: 'perfect_scores', value: 1 }
    },
    {
      id: 'streak_3',
      name: 'On Fire!',
      description: 'Complete 3 activities in a row',
      icon: '🔥',
      unlocked: false,
      requirement: { type: 'streak', value: 3 }
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Complete 7 activities in a row',
      icon: '🏆',
      unlocked: false,
      requirement: { type: 'streak', value: 7 }
    },
    {
      id: 'math_master',
      name: 'Math Master',
      description: 'Complete 10 math activities',
      icon: '🧮',
      unlocked: false,
      requirement: { type: 'activities', value: 10, subject: 'math' }
    },
    {
      id: 'reading_expert',
      name: 'Reading Expert',
      description: 'Complete 10 reading activities',
      icon: '📚',
      unlocked: false,
      requirement: { type: 'activities', value: 10, subject: 'reading' }
    },
    {
      id: 'geography_whiz',
      name: 'Geography Whiz',
      description: 'Complete 10 social studies activities',
      icon: '🌍',
      unlocked: false,
      requirement: { type: 'activities', value: 10, subject: 'social-studies' }
    }
  ];

  const loadProgress = useCallback(async () => {
    if (!studentId) return;
    
    setLoading(true);
    try {
      const progressArray = await getStudentProgress(studentId);
      
      // Transform ActivityProgress[] into ProgressData
      const progressData: ProgressData = {
        totalActivities: progressArray.length,
        totalScore: progressArray.reduce((sum, p) => sum + p.score, 0),
        totalQuestions: progressArray.reduce((sum, p) => sum + p.total_questions, 0),
        currentStreak: 0, // TODO: Calculate streak based on consecutive days
        bestStreak: 0, // TODO: Track best streak
        achievements: defaultAchievements.map(achievement => ({
          ...achievement,
          unlocked: false // TODO: Check against progress data
        })),
        subjectProgress: {}
      };

      // Calculate subject progress
      const subjectMap: { [key: string]: { activities: number; score: number; questions: number; } } = {};
      
      progressArray.forEach(progress => {
        if (!subjectMap[progress.activity_type]) {
          subjectMap[progress.activity_type] = { activities: 0, score: 0, questions: 0 };
        }
        subjectMap[progress.activity_type].activities += 1;
        subjectMap[progress.activity_type].score += progress.score;
        subjectMap[progress.activity_type].questions += progress.total_questions;
      });

      // Convert to final format
      Object.keys(subjectMap).forEach(subject => {
        const data = subjectMap[subject];
        progressData.subjectProgress[subject] = {
          activities: data.activities,
          score: data.score,
          questions: data.questions,
          averageScore: data.questions > 0 ? Math.round((data.score / data.questions) * 100) : 0
        };
      });

      setProgressData(progressData);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  const saveProgress = useCallback(async (
    activityType: string,
    activityName: string,
    score: number,
    totalQuestions: number,
    gradeLevel: string
  ) => {
    if (!studentId) return;

    try {
      await saveActivityProgress(
        studentId,
        activityType,
        activityName,
        score,
        totalQuestions,
        gradeLevel
      );
      
      // Reload progress data after saving
      await loadProgress();
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [studentId, loadProgress]);

  const checkAchievements = useCallback((newProgress: ProgressData): Achievement[] => {
    const newlyUnlocked: Achievement[] = [];
    
    defaultAchievements.forEach(achievement => {
      if (achievement.unlocked) return; // Already unlocked
      
      let shouldUnlock = false;
      
      switch (achievement.requirement.type) {
        case 'activities':
          if (achievement.requirement.subject) {
            const subjectProgress = newProgress.subjectProgress[achievement.requirement.subject];
            shouldUnlock = subjectProgress && subjectProgress.activities >= achievement.requirement.value;
          } else {
            shouldUnlock = newProgress.totalActivities >= achievement.requirement.value;
          }
          break;
        case 'streak':
          shouldUnlock = newProgress.currentStreak >= achievement.requirement.value;
          break;
        case 'perfect_scores':
          // This would need to be tracked separately in the database
          shouldUnlock = newProgress.totalScore / newProgress.totalQuestions >= 0.95; // 95% or higher
          break;
      }
      
      if (shouldUnlock) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date();
        newlyUnlocked.push(achievement);
      }
    });
    
    return newlyUnlocked;
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return { 
    saveProgress, 
    progressData, 
    loading, 
    loadProgress,
    checkAchievements,
    defaultAchievements
  };
};