import React, { useState } from 'react';
import { BookOpen, Calculator, Globe, User, BarChart3, LogOut, Trophy, Map, Calendar, Target, Keyboard, Zap, Flag } from 'lucide-react';
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
import AmericanIndependence from './components/FifthGrade/SocialStudies/AmericanIndependence';
import FourthOfJuly from './components/FifthGrade/SocialStudies/FourthOfJuly';
import DeclarationOfIndependence from './components/FifthGrade/SocialStudies/DeclarationOfIndependence';
import CountriesQuiz from './components/FifthGrade/SocialStudies/CountriesQuiz';
import LongDivision from './components/FifthGrade/Math/LongDivision';
import MathProblemGenerator from './components/FifthGrade/Math/MathProblemGenerator';
import FifthGradeMultiplicationTables from './components/FifthGrade/Math/MultiplicationTables';
import SimpleMachines from './components/FifthGrade/Science/SimpleMachines';
import ElectricityCircuits from './components/FifthGrade/Science/ElectricityCircuits';

// 3rd Grade Components
import TextRetelling from './components/ThirdGrade/Reading/TextRetelling';
import AdditionSubtraction from './components/ThirdGrade/Math/AdditionSubtraction';
import AnalogClock from './components/ThirdGrade/Math/AnalogClock';
import MultiplicationTables from './components/ThirdGrade/Math/MultiplicationTables';
import AnglesActivity from './components/ThirdGrade/Math/AnglesActivity';
import TypingPractice from './components/ThirdGrade/Typing/TypingPractice';
import StatesOfMatter from './components/ThirdGrade/Science/StatesOfMatter';
import AnimalHabitats from './components/ThirdGrade/Science/AnimalHabitats';
import ThirdGradeAmericanIndependence from './components/ThirdGrade/SocialStudies/AmericanIndependence';
import ThirdGradeFourthOfJuly from './components/ThirdGrade/SocialStudies/FourthOfJuly';
import ThirdGradeDeclarationOfIndependence from './components/ThirdGrade/SocialStudies/DeclarationOfIndependence';
import ThirdGradeCountriesQuiz from './components/ThirdGrade/SocialStudies/CountriesQuiz';

type CurrentView = 
  | 'home'
  | 'reading'
  | 'math'
  | 'social-studies'
  | 'science'
  | 'progress'
  | 'daily-challenges'
  | 'learning-paths'
  | 'fun-learning'
  | 'dictionary-thesaurus'
  | 'reading-comprehension'
  | 'state-capitals'
  | 'american-history'
  | 'interactive-geography'
  | 'american-independence'
  | 'fourth-of-july'
  | 'declaration-of-independence'
  | 'countries-quiz'
  | 'long-division'
  | 'math-problem-generator'
  | 'fifth-grade-multiplication-tables'
  | 'text-retelling'
  | 'addition-subtraction'
  | 'analog-clock'
  | 'multiplication-tables'
  | 'angles-activity'
  | 'typing-practice'
  | 'states-of-matter'
  | 'animal-habitats'
  | 'simple-machines'
  | 'electricity-circuits';

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
          <LearningPath onNavigate={setCurrentView} />
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
            <ActivityCard
              title="American Independence"
              description="Learn about the Fourth of July, Declaration of Independence, and the American Revolution"
              icon={Flag}
              color="border-l-red-500"
              onClick={() => setCurrentView('american-independence')}
            />
            <ActivityCard
              title="Fourth of July Celebrations"
              description="Discover what the Fourth of July represents and how Americans celebrate Independence Day"
              icon={Flag}
              color="border-l-blue-500"
              onClick={() => setCurrentView('fourth-of-july')}
            />
            <ActivityCard
              title="Declaration of Independence"
              description="Explore America's founding document and understand what it means"
              icon={BookOpen}
              color="border-l-purple-500"
              onClick={() => setCurrentView('declaration-of-independence')}
            />
            <ActivityCard
              title="World Countries Quiz"
              description="Test your knowledge of countries, capitals, flags, and fun facts from around the world"
              icon={Globe}
              color="border-l-indigo-500"
              onClick={() => setCurrentView('countries-quiz')}
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
            <ActivityCard
              title="Multiplication Tables"
              description="Master times tables up to 12 with text entry practice"
              icon={Calculator}
              color="border-l-green-500"
              onClick={() => setCurrentView('fifth-grade-multiplication-tables')}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'science') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">5th Grade Science</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="Simple Machines & Levers"
              description="Explore levers, mechanical advantage, and physics experiments"
              icon={Zap}
              color="border-l-orange-500"
              onClick={() => setCurrentView('simple-machines')}
            />
            <ActivityCard
              title="Electricity & Circuits"
              description="Build circuits, learn about conductors, and electrical safety"
              icon={Zap}
              color="border-l-yellow-500"
              onClick={() => setCurrentView('electricity-circuits')}
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
        <SubjectCard
          title="Science"
          description="Simple machines, electricity, and physics experiments"
          icon={Zap}
          color="border-l-orange-500"
          onClick={() => setCurrentView('science')}
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
            <ActivityCard
              title="American Independence"
              description="Learn about the Fourth of July and why we celebrate Independence Day"
              icon={Flag}
              color="border-l-red-500"
              onClick={() => setCurrentView('american-independence')}
            />
            <ActivityCard
              title="Fourth of July Celebrations"
              description="Learn about America's birthday and how we celebrate with fireworks, parades, and fun!"
              icon={Flag}
              color="border-l-blue-500"
              onClick={() => setCurrentView('fourth-of-july')}
            />
            <ActivityCard
              title="Declaration of Independence"
              description="Learn about America's most important document and what it says"
              icon={BookOpen}
              color="border-l-purple-500"
              onClick={() => setCurrentView('declaration-of-independence')}
            />
            <ActivityCard
              title="World Countries Quiz"
              description="Learn about countries, capitals, and flags from around the world"
              icon={Globe}
              color="border-l-indigo-500"
              onClick={() => setCurrentView('countries-quiz')}
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

    if (currentView === 'science') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setCurrentView('home')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">3rd Grade Science</h2>
          <div className="grid gap-6">
            <ActivityCard
              title="States of Matter"
              description="Explore solids, liquids, and gases with interactive particle simulator"
              icon={Zap}
              color="border-l-purple-500"
              onClick={() => setCurrentView('states-of-matter')}
            />
            <ActivityCard
              title="Animal Habitats"
              description="Explore different ecosystems and learn about animal adaptations"
              icon={Globe}
              color="border-l-green-500"
              onClick={() => setCurrentView('animal-habitats')}
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
        <SubjectCard
          title="Typing"
          description="Learn to type with structured lessons and progress tracking"
          icon={Keyboard}
          color="border-l-indigo-500"
          onClick={() => setCurrentView('typing-practice')}
        />
        <SubjectCard
          title="Science"
          description="Explore states of matter, simple machines, and animal habitats"
          icon={Zap}
          color="border-l-yellow-500"
          onClick={() => setCurrentView('science')}
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
      case 'american-independence':
        return (
          selectedGrade === '5th' ? (
            <AmericanIndependence 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'American Independence')}
            />
          ) : (
            <ThirdGradeAmericanIndependence 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'American Independence')}
            />
          )
        );
      case 'fourth-of-july':
        return (
          selectedGrade === '5th' ? (
            <FourthOfJuly 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'Fourth of July Celebrations')}
            />
          ) : (
            <ThirdGradeFourthOfJuly 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'Fourth of July Celebrations')}
            />
          )
        );
      case 'declaration-of-independence':
        return (
          selectedGrade === '5th' ? (
            <DeclarationOfIndependence 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'Declaration of Independence')}
            />
          ) : (
            <ThirdGradeDeclarationOfIndependence 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'Declaration of Independence')}
            />
          )
        );
      case 'countries-quiz':
        return (
          selectedGrade === '5th' ? (
            <CountriesQuiz 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'World Countries Quiz')}
            />
          ) : (
            <ThirdGradeCountriesQuiz 
              onBack={() => setCurrentView('social-studies')} 
              onSaveProgress={createProgressHandler('social-studies', 'World Countries Quiz')}
            />
          )
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
      case 'fifth-grade-multiplication-tables':
        return (
          <FifthGradeMultiplicationTables 
            onBack={() => setCurrentView('math')} 
            onSaveProgress={createProgressHandler('math', 'Multiplication Tables')}
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
      case 'typing-practice':
        return (
          <TypingPractice 
            onBack={() => setCurrentView('home')} 
            onSaveProgress={createProgressHandler('typing', 'Typing Practice')}
          />
        );
      case 'states-of-matter':
        return (
          <StatesOfMatter 
            onBack={() => setCurrentView('science')} 
            onSaveProgress={createProgressHandler('science', 'States of Matter')}
          />
        );
      case 'animal-habitats':
        return (
          <AnimalHabitats 
            onBack={() => setCurrentView('science')} 
            onSaveProgress={createProgressHandler('science', 'Animal Habitats')}
          />
        );
      case 'simple-machines':
        return (
          <SimpleMachines 
            onBack={() => setCurrentView('science')} 
            onSaveProgress={createProgressHandler('science', 'Simple Machines & Levers')}
          />
        );
      case 'electricity-circuits':
        return (
          <ElectricityCircuits 
            onBack={() => setCurrentView('science')} 
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