export interface TypingLesson {
  id: string;
  level: number;
  lessonNumber: number;
  title: string;
  description: string;
  targetKeys: string[];
  content: string[];
  targetWPM: number;
  targetAccuracy: number;
  timeLimit?: number;
  unlocked: boolean;
  completed: boolean;
  stars: number;
}

export interface TypingProgress {
  lessonId: string;
  wpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
  completedAt: Date;
  stars: number;
}

// Level 1: Home Row Basics
export const typingLessons: TypingLesson[] = [
  {
    id: '1.1',
    level: 1,
    lessonNumber: 1,
    title: 'Home Row Introduction',
    description: 'Learn the home row keys: A, S, D, F, J, K, L, ;',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    content: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'as', 'df', 'jk', 'l;', 'asdf', 'jkl;'],
    targetWPM: 5,
    targetAccuracy: 90,
    unlocked: true,
    completed: false,
    stars: 0
  },
  {
    id: '1.2',
    level: 1,
    lessonNumber: 2,
    title: 'Left Hand Home Row',
    description: 'Practice left hand home row keys: A, S, D, F',
    targetKeys: ['a', 's', 'd', 'f'],
    content: ['a', 's', 'd', 'f', 'as', 'ad', 'af', 'sd', 'sf', 'df', 'asd', 'sdf', 'asdf'],
    targetWPM: 8,
    targetAccuracy: 90,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '1.3',
    level: 1,
    lessonNumber: 3,
    title: 'Right Hand Home Row',
    description: 'Practice right hand home row keys: J, K, L, ;',
    targetKeys: ['j', 'k', 'l', ';'],
    content: ['j', 'k', 'l', ';', 'jk', 'jl', 'j;', 'kl', 'k;', 'l;', 'jkl', 'kl;', 'jkl;'],
    targetWPM: 8,
    targetAccuracy: 90,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '1.4',
    level: 1,
    lessonNumber: 4,
    title: 'Both Hands Home Row',
    description: 'Practice using both hands on home row',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    content: ['as', 'df', 'jk', 'l;', 'asdf', 'jkl;', 'as jk', 'df l;', 'asdf jkl;'],
    targetWPM: 10,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '1.5',
    level: 1,
    lessonNumber: 5,
    title: 'Home Row Words',
    description: 'Type simple words using home row keys',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    content: ['as', 'sad', 'dad', 'fad', 'ask', 'sad', 'add', 'all', 'fall', 'sad dad', 'ask all'],
    targetWPM: 12,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },

  // Level 2: Top Row
  {
    id: '2.1',
    level: 2,
    lessonNumber: 1,
    title: 'Top Row Left: Q, W, E, R',
    description: 'Learn the left side of the top row',
    targetKeys: ['q', 'w', 'e', 'r'],
    content: ['q', 'w', 'e', 'r', 'qw', 'we', 'er', 'qwe', 'wer', 'qwer'],
    targetWPM: 10,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '2.2',
    level: 2,
    lessonNumber: 2,
    title: 'Top Row Right: T, Y, U, I',
    description: 'Learn the right side of the top row',
    targetKeys: ['t', 'y', 'u', 'i'],
    content: ['t', 'y', 'u', 'i', 'ty', 'yu', 'ui', 'tyu', 'yui', 'tyui'],
    targetWPM: 10,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '2.3',
    level: 2,
    lessonNumber: 3,
    title: 'Top Row End: O, P',
    description: 'Learn the end of the top row',
    targetKeys: ['o', 'p'],
    content: ['o', 'p', 'op', 'po', 'top', 'pop', 'top pop'],
    targetWPM: 12,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '2.4',
    level: 2,
    lessonNumber: 4,
    title: 'Top Row Words',
    description: 'Type words using top row keys',
    targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    content: ['we', 'are', 'the', 'you', 'top', 'pop', 'we are', 'the top', 'you pop'],
    targetWPM: 15,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '2.5',
    level: 2,
    lessonNumber: 5,
    title: 'Home + Top Row',
    description: 'Combine home row and top row',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    content: ['we', 'are', 'the', 'you', 'ask', 'sad', 'dad', 'we ask', 'are sad', 'the dad'],
    targetWPM: 18,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },

  // Level 3: Bottom Row
  {
    id: '3.1',
    level: 3,
    lessonNumber: 1,
    title: 'Bottom Row Left: Z, X, C, V',
    description: 'Learn the left side of the bottom row',
    targetKeys: ['z', 'x', 'c', 'v'],
    content: ['z', 'x', 'c', 'v', 'zx', 'xc', 'cv', 'zxc', 'xcv', 'zxcv'],
    targetWPM: 12,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '3.2',
    level: 3,
    lessonNumber: 2,
    title: 'Bottom Row Right: B, N, M',
    description: 'Learn the right side of the bottom row',
    targetKeys: ['b', 'n', 'm'],
    content: ['b', 'n', 'm', 'bn', 'nm', 'bm', 'bnm'],
    targetWPM: 12,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '3.3',
    level: 3,
    lessonNumber: 3,
    title: 'Bottom Row Words',
    description: 'Type words using bottom row keys',
    targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    content: ['can', 'man', 'van', 'ban', 'can man', 'van ban'],
    targetWPM: 15,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '3.4',
    level: 3,
    lessonNumber: 4,
    title: 'All Rows Practice',
    description: 'Practice typing with all three rows',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
    content: ['we can', 'are sad', 'the man', 'you ask', 'top van', 'pop can'],
    targetWPM: 20,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '3.5',
    level: 3,
    lessonNumber: 5,
    title: '3rd Grade Words',
    description: 'Practice common 3rd grade vocabulary',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
    content: ['cat', 'dog', 'run', 'play', 'read', 'write', 'math', 'science', 'friend', 'family', 'school', 'teacher'],
    targetWPM: 22,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },

  // Level 4: Numbers & Symbols
  {
    id: '4.1',
    level: 4,
    lessonNumber: 1,
    title: 'Numbers 1-5',
    description: 'Learn to type numbers 1, 2, 3, 4, 5',
    targetKeys: ['1', '2', '3', '4', '5'],
    content: ['1', '2', '3', '4', '5', '12', '23', '34', '45', '123', '234', '345'],
    targetWPM: 15,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '4.2',
    level: 4,
    lessonNumber: 2,
    title: 'Numbers 6-0',
    description: 'Learn to type numbers 6, 7, 8, 9, 0',
    targetKeys: ['6', '7', '8', '9', '0'],
    content: ['6', '7', '8', '9', '0', '67', '78', '89', '90', '678', '789', '890'],
    targetWPM: 15,
    targetAccuracy: 85,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '4.3',
    level: 4,
    lessonNumber: 3,
    title: 'Basic Punctuation',
    description: 'Learn to type periods, exclamation marks, and question marks',
    targetKeys: ['.', '!', '?'],
    content: ['cat.', 'dog!', 'run?', 'play.', 'read!', 'write?', 'The cat.', 'I am happy!', 'What is this?'],
    targetWPM: 18,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '4.4',
    level: 4,
    lessonNumber: 4,
    title: 'Math Problems',
    description: 'Practice typing simple math problems',
    targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '=', '-'],
    content: ['1+1=2', '2+2=4', '3+3=6', '4+4=8', '5+5=10', '2-1=1', '4-2=2'],
    targetWPM: 20,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '4.5',
    level: 4,
    lessonNumber: 5,
    title: 'Numbers in Sentences',
    description: 'Type sentences that include numbers',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    content: ['I am 8 years old.', 'I have 3 cats.', 'There are 5 dogs.', 'I read 2 books.', 'I have 10 fingers.'],
    targetWPM: 22,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },

  // Level 5: Sentences & Stories
  {
    id: '5.1',
    level: 5,
    lessonNumber: 1,
    title: 'Short Sentences',
    description: 'Practice typing short, simple sentences',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
    content: ['The cat sat.', 'I like dogs.', 'We play games.', 'She reads books.', 'He writes stories.'],
    targetWPM: 25,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '5.2',
    level: 5,
    lessonNumber: 2,
    title: 'Question Sentences',
    description: 'Practice typing questions',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '?'],
    content: ['What is your name?', 'How old are you?', 'Do you like cats?', 'Can you read?', 'Where do you live?'],
    targetWPM: 25,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '5.3',
    level: 5,
    lessonNumber: 3,
    title: 'Educational Facts',
    description: 'Type interesting educational facts',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '!'],
    content: ['The sun is a star.', 'Cats have whiskers!', 'Dogs can smell well.', 'Birds can fly!', 'Fish live in water.'],
    targetWPM: 28,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '5.4',
    level: 5,
    lessonNumber: 4,
    title: 'Story Paragraphs',
    description: 'Type short story paragraphs',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', '!', '?'],
    content: ['The cat sat on the mat. It was a sunny day. The cat liked to sleep in the sun.'],
    targetWPM: 30,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  },
  {
    id: '5.5',
    level: 5,
    lessonNumber: 5,
    title: 'Mixed Content',
    description: 'Final practice with mixed content',
    targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '!', '?'],
    content: ['I am 8 years old. I like to read books! Do you like math? I have 3 cats.'],
    targetWPM: 32,
    targetAccuracy: 80,
    unlocked: false,
    completed: false,
    stars: 0
  }
];

// Helper function to get lessons by level
export const getLessonsByLevel = (level: number): TypingLesson[] => {
  return typingLessons.filter(lesson => lesson.level === level);
};

// Helper function to get next lesson
export const getNextLesson = (currentLessonId: string): TypingLesson | null => {
  const currentIndex = typingLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex < typingLessons.length - 1) {
    return typingLessons[currentIndex + 1];
  }
  return null;
};

// Helper function to unlock next lesson
export const unlockNextLesson = (completedLessonId: string): void => {
  const nextLesson = getNextLesson(completedLessonId);
  if (nextLesson) {
    nextLesson.unlocked = true;
  }
}; 