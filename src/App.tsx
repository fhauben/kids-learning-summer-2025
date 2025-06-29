import React, { useState } from 'react';
import { BookOpen, Calculator, Globe, User, BarChart3, LogOut, Trophy, Map, Calendar, Target } from 'lucide-react';
import { GradeLevel } from './types';
import { useProgress } from './hooks/useProgress';

// Components
import StudentLogin from './components/StudentLogin';
import ProgressTracker from './components/ProgressTracker';
import DailyChallenge from './components/DailyChallenge';
import LearningPath from './components/LearningPath';
import GradeSelector from './components/GradeSelector';
import SubjectCard from './components/SubjectCard';
import ActivityCard from './components/ActivityCard';
import GuinnessRecords from './components/FunLearning/GuinnessRecords';

// 5th Grade Components
import DictionaryThesaurus from './components/FifthGrade/Reading/DictionaryThesaurus';
import ReadingComprehension from './components/FifthGrade/Reading/ReadingComprehension';
import StateCapitals from './components/FifthGrade/SocialStudies/StateCapitals';
import AmericanHistory from './components/FifthGrade/SocialStudies/AmericanHistory';
import InteractiveGeography from './components/FifthGrade/SocialStudies/InteractiveGeography';
import LongDivision from './components/FifthGrade/Math/LongDivision';
import MathProblemGenerator from './components/FifthGrade/Math/MathProblemGenerator';

// 3rd Grade Components
import TextRetelling from './components/ThirdGrade/Reading/TextRetelling';
import AdditionSubtraction from './components/ThirdGrade/Math/AdditionSubtraction';
import AnalogClock from './components/ThirdGrade/Math/AnalogClock';
import MultiplicationTables from './components/ThirdGrade/Math/MultiplicationTables';
import AnglesActivity from './components/ThirdGrade/Math/AnglesActivity';

type CurrentView = 
  | 'home'
  | 'reading'
  | 'math'
  | 'social-studies'
  | 'progress'
  | 'daily-challenges'
  | 'learning-paths'
  | 'fun-learning'
  | 'dictionary-thesaurus'
  | 'reading-comprehension'
  | 'state-capitals'
  | 'american-history'
  | 'interactive-geography'
  | 'long-division'
  | 'math-problem-generator'
  | 'text-retelling'
  | 'addition-subtraction'
  | 'analog-clock'
  | 'multiplication-tables'
  | 'angles-activity';

function App() {
  const [currentStudent, setCurrentStudent] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('5th');
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const { updateProgress } = useProgress();

  // If no student is logged in, show login page
  if (!currentStudent) {
    return <StudentLogin onStudentLogin={setCurrentStudent} />;
  }

  // If viewing progress page
  if (currentView === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center"
            >
              ← Back to Learning
            </button>
          </header>
          <ProgressTracker />
        </div>
      </div>
    );
  }

  // If viewing daily challenges
  if (currentView === 'daily-challenges') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center"
            >
              ← Back to Learning
            </button>
          </header>
          <DailyChallenge />
        </div>
      </div>
    );
  }

  // If viewing learning paths
  if (currentView === 'learning-paths') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-blue-600 hover:text-blue-800 font-semibold mb-4 flex items-center"
            >
              ← Back to Learning
            </button>
          </header>
          <LearningPath />
        </div>
      </div>
    );
  }

  // If viewing fun learning page
  if (currentView === 'fun-learning') {
    return <GuinnessRecords onBack={() => setCurrentView('home')} />;
  }

  const handleLogout = () => {
    setCurrentStudent(null);
    setCurrentView('home');
    setSelectedGrade('5th');
  };

  const handleSaveProgress = (subject: string, activityName: string, score: number, total: number) => {
    const activityId = `${activityName.toLowerCase().replace(/\s+/g, '-')}`;
    const percentage = Math.round((score / total) * 100);
    updateProgress(selectedGrade, subject, activityId, percentage);
  };

  const createProgressHandler = (subject: string, activityName: string) => {
    return (score: number, total: number) => {
      handleSaveProgress(subject, activityName, score, total);
    };
  };

  const renderFifthGradeContent = () => {
    if (currentView === 'reading') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5th Grade Reading</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="Dictionary & Thesaurus"
              description="Learn to use reference books and practice finding word meanings and synonyms"
              icon={BookOpen}
              color="border-l-blue-500"
              onClick={() => setCurrentView('dictionary-thesaurus')}
            />
            <ActivityCard
              title="Reading Comprehension"
              description="Read interesting passages and answer questions to test your understanding"
              icon={BookOpen}
              color="border-l-green-500"
              onClick={() => setCurrentView('reading-comprehension')}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'social-studies') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5th Grade Social Studies</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="State Capitals Quiz"
              description="Test your knowledge of US state capitals with interactive maps"
              icon={Globe}
              color="border-l-green-500"
              onClick={() => setCurrentView('state-capitals')}
            />
            <ActivityCard
              title="American History"
              description="Read about famous explorers and Revolutionary War heroes"
              icon={BookOpen}
              color="border-l-amber-500"
              onClick={() => setCurrentView('american-history')}
            />
            <ActivityCard
              title="Interactive Geography"
              description="Learn about regions, landmarks, and geography of the United States"
              icon={Map}
              color="border-l-blue-500"
              onClick={() => setCurrentView('interactive-geography')}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'math') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5th Grade Math</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="Long Division"
              description="Practice dividing large numbers step by step"
              icon={Calculator}
              color="border-l-purple-500"
              onClick={() => setCurrentView('long-division')}
            />
            <ActivityCard
              title="Math Problem Generator"
              description="Practice various math operations with customizable difficulty"
              icon={Calculator}
              color="border-l-blue-500"
              onClick={() => setCurrentView('math-problem-generator')}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h2 className="col-span-full text-3xl font-bold text-gray-800 mb-2">5th Grade Learning</h2>
        <SubjectCard
          title="Reading"
          description="Dictionary, thesaurus, and vocabulary building"
          icon={BookOpen}
          color="border-l-blue-500"
          onClick={() => setCurrentView('reading')}
        />
        <SubjectCard
          title="Social Studies"
          description="State capitals and American history"
          icon={Globe}
          color="border-l-green-500"
          onClick={() => setCurrentView('social-studies')}
        />
        <SubjectCard
          title="Math"
          description="Long division, multiplication tables, and fractions"
          icon={Calculator}
          color="border-l-purple-500"
          onClick={() => setCurrentView('math')}
        />
      </div>
    );
  };

  const renderThirdGradeContent = () => {
    if (currentView === 'reading') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3rd Grade Reading</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="Text Retelling"
              description="Read stories and practice retelling them in your own words"
              icon={BookOpen}
              color="border-l-blue-500"
              onClick={() => setCurrentView('text-retelling')}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'social-studies') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3rd Grade Social Studies</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="State Capitals Quiz"
              description="Test your knowledge of US state capitals with interactive maps"
              icon={Globe}
              color="border-l-green-500"
              onClick={() => setCurrentView('state-capitals')}
            />
            <ActivityCard
              title="American History"
              description="Read about famous explorers and Revolutionary War heroes"
              icon={BookOpen}
              color="border-l-amber-500"
              onClick={() => setCurrentView('american-history')}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'math') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3rd Grade Math</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="Addition & Subtraction"
              description="Practice 2 and 3 digit addition and subtraction problems"
              icon={Calculator}
              color="border-l-green-500"
              onClick={() => setCurrentView('addition-subtraction')}
            />
            <ActivityCard
              title="Multiplication Tables"
              description="Master times tables up to 12 with interactive practice"
              icon={Calculator}
              color="border-l-purple-500"
              onClick={() => setCurrentView('multiplication-tables')}
            />
            <ActivityCard
              title="Telling Time"
              description="Learn to read analog clocks and tell time"
              icon={Calculator}
              color="border-l-orange-500"
              onClick={() => setCurrentView('analog-clock')}
            />
            <ActivityCard
              title="Angles & Shapes"
              description="Explore acute, right, and obtuse angles with interactive tools"
              icon={Calculator}
              color="border-l-pink-500"
              onClick={() => setCurrentView('angles-activity')}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h2 className="col-span-full text-3xl font-bold text-gray-800 mb-2">3rd Grade Learning</h2>
        <SubjectCard
          title="Reading"
          description="Text retelling and comprehension"
          icon={BookOpen}
          color="border-l-blue-500"
          onClick={() => setCurrentView('reading')}
        />
        <SubjectCard
          title="Social Studies"
          description="State capitals and American history"
          icon={Globe}
          color="border-l-green-500"
          onClick={() => setCurrentView('social-studies')}
        />
        <SubjectCard
          title="Math"
          description="Addition, subtraction, multiplication, time, and angles"
          icon={Calculator}
          color="border-l-purple-500"
          onClick={() => setCurrentView('math')}
        />
      </div>
    );
  };

  const renderCurrentView = () => {
    // Activity Components - pass saveProgress function to components that need it
    switch (currentView) {
      case 'dictionary-thesaurus':
        return (
          <DictionaryThesaurus 
            onBack={() => setCurrentView('reading')} 
            onSaveProgress={createProgressHandler('reading', 'Dictionary & Thesaurus')}
          />
        );
      case 'reading-comprehension':
        return (
          <ReadingComprehension 
            onBack={() => setCurrentView('reading')} 
            onSaveProgress={createProgressHandler('reading', 'Reading Comprehension')}
          />
        );
      case 'state-capitals':
        return (
          <StateCapitals 
            onBack={() => setCurrentView('social-studies')} 
            onSaveProgress={createProgressHandler('social-studies', 'State Capitals Quiz')}
          />
        );
      case 'american-history':
        return (
          <AmericanHistory 
            onBack={() => setCurrentView('social-studies')} 
            onSaveProgress={createProgressHandler('social-studies', 'American History')}
          />
        );
      case 'interactive-geography':
        return (
          <InteractiveGeography 
            onBack={() => setCurrentView('social-studies')} 
            onSaveProgress={createProgressHandler('social-studies', 'Interactive Geography')}
          />
        );
      case 'long-division':
        return (
          <LongDivision 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Long Division')}
          />
        );
      case 'math-problem-generator':
        return (
          <MathProblemGenerator 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Math Problem Generator')}
          />
        );
      case 'text-retelling':
        return (
          <TextRetelling 
            onBack={() => setCurrentView('reading')} 
            onSaveProgress={createProgressHandler('reading', 'Text Retelling')}
          />
        );
      case 'addition-subtraction':
        return (
          <AdditionSubtraction 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Addition & Subtraction')}
          />
        );
      case 'analog-clock':
        return (
          <AnalogClock 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Telling Time')}
          />
        );
      case 'multiplication-tables':
        return (
          <MultiplicationTables 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Multiplication Tables')}
          />
        );
      case 'angles-activity':
        return (
          <AnglesActivity 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Angles & Shapes')}
          />
        );
      default:
        return (
          <div className="max-w-6xl mx-auto">
            {selectedGrade === '5th' ? renderFifthGradeContent() : renderThirdGradeContent()}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">🦅</span>
            <h1 className="text-4xl font-bold text-gray-800">Indy Summer 2025 Learning</h1>
            <span className="text-4xl ml-3">🦅</span>
          </div>
          <p className="text-xl text-gray-600">Interactive lessons for 3rd and 5th grade students</p>
          
          {/* Student Info and Navigation */}
          <div className="flex items-center justify-center mt-6 space-x-4 flex-wrap gap-2">
            <div className="bg-white rounded-lg px-4 py-2 shadow-md flex items-center">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold text-gray-800">Welcome, {currentStudent}!</span>
            </div>
            
            <button
              onClick={() => setCurrentView('progress')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              My Progress
            </button>

            <button
              onClick={() => setCurrentView('daily-challenges')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Daily Challenges
            </button>

            <button
              onClick={() => setCurrentView('learning-paths')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Learning Paths
            </button>

            <button
              onClick={() => setCurrentView('fun-learning')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Fun Records
            </button>
            
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center"
              title="Change student name"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Change Name
            </button>
          </div>
        </header>

        {currentView === 'home' && (
          <GradeSelector
            selectedGrade={selectedGrade}
            onGradeChange={(grade) => {
              setSelectedGrade(grade);
              setCurrentView('home');
            }}
          />
        )}

        <main>
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;