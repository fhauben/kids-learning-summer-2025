export interface State {
  name: string;
  capital: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capitalCoordinates: {
    lat: number;
    lng: number;
  };
}

export interface HistoryPassage {
  id: string;
  title: string;
  person: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
  }[];
}

export interface MathProblem {
  id: string;
  question: string;
  answer: number;
  type: 'long-division' | 'multiplication' | 'addition' | 'subtraction' | 'fraction';
  options?: number[];
}

export interface ClockTime {
  hour: number;
  minute: number;
  display: string;
}

export type GradeLevel = '3rd' | '5th';
export type Subject = 'reading' | 'math' | 'social-studies';