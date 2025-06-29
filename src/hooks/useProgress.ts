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

export interface Progress {
  grade: string;
  subject: string;
  completedActivities: string[];
  scores: Record<string, number>;
  achievements: string[];
  streak: number;
  lastPlayed: string;
  totalTimeSpent: number;
}

export interface UserProfile {
  name: string;
  grade: string;
  avatar: string;
  joinDate: string;
  progress: Progress[];
}

const STORAGE_KEYS = {
  PROGRESS: 'kids-learning-progress',
  PROFILE: 'kids-learning-profile',
  SETTINGS: 'kids-learning-settings'
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = () => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
      
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = (newProgress: Progress[], newProfile?: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(newProgress));
      if (newProfile) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const updateProgress = (grade: string, subject: string, activityId: string, score?: number) => {
    const existingProgress = progress.find(p => p.grade === grade && p.subject === subject);
    
    let updatedProgress: Progress;
    
    if (existingProgress) {
      // Update existing progress
      updatedProgress = {
        ...existingProgress,
        completedActivities: existingProgress.completedActivities.includes(activityId) 
          ? existingProgress.completedActivities 
          : [...existingProgress.completedActivities, activityId],
        scores: score ? { ...existingProgress.scores, [activityId]: score } : existingProgress.scores,
        lastPlayed: new Date().toISOString(),
        totalTimeSpent: existingProgress.totalTimeSpent + 1
      };
      
      // Update streak logic
      const lastPlayedDate = new Date(existingProgress.lastPlayed);
      const today = new Date();
      const daysDiff = Math.floor((today.getTime() - lastPlayedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= 1) {
        updatedProgress.streak = existingProgress.streak + 1;
      } else if (daysDiff > 1) {
        updatedProgress.streak = 1;
      }
    } else {
      // Create new progress
      updatedProgress = {
        grade,
        subject,
        completedActivities: [activityId],
        scores: score ? { [activityId]: score } : {},
        achievements: [],
        streak: 1,
        lastPlayed: new Date().toISOString(),
        totalTimeSpent: 1
      };
    }

    const newProgress = existingProgress 
      ? progress.map(p => p.grade === grade && p.subject === subject ? updatedProgress : p)
      : [...progress, updatedProgress];

    setProgress(newProgress);
    saveToStorage(newProgress);
    
    return updatedProgress;
  };

  const addAchievement = (grade: string, subject: string, achievement: string) => {
    const existingProgress = progress.find(p => p.grade === grade && p.subject === subject);
    
    if (existingProgress && !existingProgress.achievements.includes(achievement)) {
      const updatedProgress = {
        ...existingProgress,
        achievements: [...existingProgress.achievements, achievement]
      };
      
      const newProgress = progress.map(p => 
        p.grade === grade && p.subject === subject ? updatedProgress : p
      );
      
      setProgress(newProgress);
      saveToStorage(newProgress);
    }
  };

  const createProfile = (name: string, grade: string, avatar: string) => {
    const newProfile: UserProfile = {
      name,
      grade,
      avatar,
      joinDate: new Date().toISOString(),
      progress: []
    };
    
    setProfile(newProfile);
    saveToStorage(progress, newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates };
      setProfile(updatedProfile);
      saveToStorage(progress, updatedProfile);
    }
  };

  const getProgress = (grade: string, subject: string): Progress | null => {
    return progress.find(p => p.grade === grade && p.subject === subject) || null;
  };

  const getOverallProgress = () => {
    const totalActivities = progress.reduce((sum, p) => sum + p.completedActivities.length, 0);
    const totalScores = progress.reduce((sum, p) => {
      const scores = Object.values(p.scores);
      return sum + scores.reduce((s, score) => s + score, 0);
    }, 0);
    const averageScore = totalScores > 0 ? Math.round(totalScores / totalActivities) : 0;
    
    return {
      totalActivities,
      averageScore,
      totalStreak: progress.reduce((sum, p) => sum + p.streak, 0),
      totalTimeSpent: progress.reduce((sum, p) => sum + p.totalTimeSpent, 0)
    };
  };

  const exportData = () => {
    const data = {
      profile,
      progress,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kids-learning-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.progress) {
          setProgress(data.progress);
          saveToStorage(data.progress);
        }
        if (data.profile) {
          setProfile(data.profile);
          saveToStorage(data.progress || progress, data.profile);
        }
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Invalid file format. Please select a valid progress file.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEYS.PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      setProgress([]);
      setProfile(null);
    }
  };

  return {
    progress,
    profile,
    isLoading,
    updateProgress,
    addAchievement,
    createProfile,
    updateProfile,
    getProgress,
    getOverallProgress,
    exportData,
    importData,
    clearAllData
  };
};