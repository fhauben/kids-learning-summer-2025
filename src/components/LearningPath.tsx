import React, { useState } from 'react';
import { Map, BookOpen, Calculator, Globe, Target, CheckCircle, Lock, Play } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'activity' | 'quiz' | 'reading' | 'practice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  completed: boolean;
  locked: boolean;
  prerequisites: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  subject: 'math' | 'reading' | 'social-studies' | 'mixed';
  grade: '3rd' | '4th' | '5th';
  steps: LearningStep[];
  totalSteps: number;
  completedSteps: number;
}

const LearningPath: React.FC = () => {
  const { getProgress } = useProgress();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths: LearningPath[] = [
    {
      id: 'math-foundations',
      title: 'Math Foundations',
      description: 'Build a strong foundation in basic math concepts',
      subject: 'math',
      grade: '3rd',
      totalSteps: 5,
      completedSteps: 0,
      steps: [
        {
          id: 'addition-basics',
          title: 'Addition Basics',
          description: 'Learn to add numbers up to 100',
          type: 'activity',
          difficulty: 'beginner',
          estimatedTime: 15,
          completed: false,
          locked: false,
          prerequisites: []
        },
        {
          id: 'subtraction-basics',
          title: 'Subtraction Basics',
          description: 'Learn to subtract numbers up to 100',
          type: 'activity',
          difficulty: 'beginner',
          estimatedTime: 15,
          completed: false,
          locked: false,
          prerequisites: ['addition-basics']
        },
        {
          id: 'multiplication-intro',
          title: 'Introduction to Multiplication',
          description: 'Learn multiplication tables 1-5',
          type: 'practice',
          difficulty: 'intermediate',
          estimatedTime: 20,
          completed: false,
          locked: false,
          prerequisites: ['addition-basics', 'subtraction-basics']
        },
        {
          id: 'time-telling',
          title: 'Telling Time',
          description: 'Learn to read analog clocks',
          type: 'activity',
          difficulty: 'intermediate',
          estimatedTime: 25,
          completed: false,
          locked: false,
          prerequisites: ['multiplication-intro']
        },
        {
          id: 'angles-geometry',
          title: 'Angles and Geometry',
          description: 'Explore basic geometric shapes and angles',
          type: 'activity',
          difficulty: 'advanced',
          estimatedTime: 30,
          completed: false,
          locked: false,
          prerequisites: ['time-telling']
        }
      ]
    },
    {
      id: 'reading-comprehension',
      title: 'Reading Comprehension',
      description: 'Develop strong reading and comprehension skills',
      subject: 'reading',
      grade: '5th',
      totalSteps: 4,
      completedSteps: 0,
      steps: [
        {
          id: 'vocabulary-building',
          title: 'Vocabulary Building',
          description: 'Learn new words and their meanings',
          type: 'reading',
          difficulty: 'beginner',
          estimatedTime: 20,
          completed: false,
          locked: false,
          prerequisites: []
        },
        {
          id: 'reading-passages',
          title: 'Reading Passages',
          description: 'Practice reading and understanding texts',
          type: 'reading',
          difficulty: 'intermediate',
          estimatedTime: 25,
          completed: false,
          locked: false,
          prerequisites: ['vocabulary-building']
        },
        {
          id: 'comprehension-questions',
          title: 'Comprehension Questions',
          description: 'Answer questions about what you read',
          type: 'quiz',
          difficulty: 'intermediate',
          estimatedTime: 30,
          completed: false,
          locked: false,
          prerequisites: ['reading-passages']
        },
        {
          id: 'text-analysis',
          title: 'Text Analysis',
          description: 'Analyze and interpret different types of texts',
          type: 'activity',
          difficulty: 'advanced',
          estimatedTime: 35,
          completed: false,
          locked: false,
          prerequisites: ['comprehension-questions']
        }
      ]
    },
    {
      id: 'us-geography',
      title: 'US Geography',
      description: 'Explore the geography and history of the United States',
      subject: 'social-studies',
      grade: '5th',
      totalSteps: 3,
      completedSteps: 0,
      steps: [
        {
          id: 'state-capitals',
          title: 'State Capitals',
          description: 'Learn all 50 state capitals',
          type: 'activity',
          difficulty: 'beginner',
          estimatedTime: 30,
          completed: false,
          locked: false,
          prerequisites: []
        },
        {
          id: 'american-history',
          title: 'American History',
          description: 'Learn about key events in American history',
          type: 'reading',
          difficulty: 'intermediate',
          estimatedTime: 40,
          completed: false,
          locked: false,
          prerequisites: ['state-capitals']
        },
        {
          id: 'interactive-geography',
          title: 'Interactive Geography',
          description: 'Explore regions and landmarks interactively',
          type: 'activity',
          difficulty: 'advanced',
          estimatedTime: 45,
          completed: false,
          locked: false,
          prerequisites: ['american-history']
        }
      ]
    }
  ];

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math': return <Calculator className="w-6 h-6" />;
      case 'reading': return <BookOpen className="w-6 h-6" />;
      case 'social-studies': return <Globe className="w-6 h-6" />;
      case 'mixed': return <Target className="w-6 h-6" />;
      default: return <Map className="w-6 h-6" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math': return 'border-l-purple-500 bg-purple-50';
      case 'reading': return 'border-l-blue-500 bg-blue-50';
      case 'social-studies': return 'border-l-green-500 bg-green-50';
      case 'mixed': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'activity': return '🎮';
      case 'quiz': return '📝';
      case 'reading': return '📚';
      case 'practice': return '✏️';
      default: return '📋';
    }
  };

  const handleStartStep = (pathId: string, stepId: string) => {
    // This would navigate to the actual activity
    console.log(`Starting step ${stepId} in path ${pathId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Map className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Learning Paths</h1>
        </div>
        <p className="text-gray-600">Follow structured learning paths to master different subjects!</p>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <div
            key={path.id}
            className={`bg-white rounded-lg shadow-md border-l-4 ${getSubjectColor(path.subject)} cursor-pointer transition-all duration-200 hover:shadow-lg`}
            onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
          >
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="text-blue-600 mr-3">
                  {getSubjectIcon(path.subject)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{path.title}</h3>
                  <p className="text-sm text-gray-600">Grade {path.grade}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{path.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {path.completedSteps}/{path.totalSteps} steps
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(path.completedSteps / path.totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Path Details */}
      {selectedPath && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {learningPaths.find(p => p.id === selectedPath)?.title}
            </h2>
            <button
              onClick={() => setSelectedPath(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {learningPaths.find(p => p.id === selectedPath)?.steps.map((step, index) => (
              <div
                key={step.id}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  step.completed ? 'bg-green-50 border-green-200' :
                  step.locked ? 'bg-gray-50 border-gray-200' :
                  'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{getTypeIcon(step.type)}</span>
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center">
                          Step {index + 1}: {step.title}
                          {step.completed && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                          )}
                          {step.locked && (
                            <Lock className="w-5 h-5 text-gray-400 ml-2" />
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                        {step.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        ⏱️ {step.estimatedTime} min
                      </span>
                    </div>
                  </div>

                  <div className="ml-4">
                    {step.completed ? (
                      <div className="text-green-500 font-semibold">Completed</div>
                    ) : step.locked ? (
                      <div className="text-gray-400 font-semibold">Locked</div>
                    ) : (
                      <button
                        onClick={() => handleStartStep(selectedPath, step.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPath; 