import React, { useState } from 'react';
import { BookOpen, Users, Flag, Star, Target, Heart, Sparkles } from 'lucide-react';

interface DeclarationOfIndependenceProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface DocumentSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  explanation: string;
  keyPoints: string[];
  icon: string;
  color: string;
}

interface Signer {
  name: string;
  state: string;
  funFact: string;
  age: number;
}

const documentSections: DocumentSection[] = [
  {
    id: 'preamble',
    title: 'The Beginning',
    subtitle: 'Why We Are Writing This',
    content: 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another...',
    explanation: 'This part explains that sometimes people need to break away from their government and form a new country. It says they have the right to do this and should explain why.',
    keyPoints: [
      'Sometimes people need to break away from their government',
      'They have the right to form a new country',
      'They should explain why they are doing this'
    ],
    icon: '📜',
    color: 'border-l-blue-500'
  },
  {
    id: 'principles',
    title: 'What We Believe',
    subtitle: 'Our Important Ideas',
    content: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.',
    explanation: 'This is the most famous part! It says that all people are equal and have rights that cannot be taken away: life, freedom, and the right to be happy. Governments exist to protect these rights.',
    keyPoints: [
      'All people are created equal',
      'Everyone has rights: Life, Liberty, and the pursuit of Happiness',
      'Governments exist to protect these rights',
      'If a government doesn\'t protect rights, people can change it'
    ],
    icon: '⚖️',
    color: 'border-l-green-500'
  },
  {
    id: 'grievances',
    title: 'What the King Did Wrong',
    subtitle: 'Why We Are Angry',
    content: 'The history of the present King of Great Britain is a history of repeated injuries and usurpations...',
    explanation: 'This section lists all the things King George III did wrong. It explains why the colonists felt they had no choice but to break away from Great Britain.',
    keyPoints: [
      'King George III repeatedly hurt the colonies',
      'He tried to control America too much',
      'The colonists had many complaints',
      'They felt the king was being unfair'
    ],
    icon: '👑',
    color: 'border-l-red-500'
  },
  {
    id: 'resolution',
    title: 'What We Are Doing',
    subtitle: 'Our Decision',
    content: 'We, therefore, the Representatives of the united States of America... do solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States.',
    explanation: 'This is where the colonies officially declare themselves independent! They say they are now free and independent states, no longer under British rule.',
    keyPoints: [
      'The colonies declare themselves independent',
      'They are no longer under British rule',
      'They can make their own laws and decisions',
      'They are now free states'
    ],
    icon: '🏛️',
    color: 'border-l-purple-500'
  }
];

const famousSigners: Signer[] = [
  {
    name: 'John Hancock',
    state: 'Massachusetts',
    funFact: 'His signature is the biggest on the document!',
    age: 39
  },
  {
    name: 'Benjamin Franklin',
    state: 'Pennsylvania',
    funFact: 'He discovered electricity and invented glasses!',
    age: 70
  },
  {
    name: 'Thomas Jefferson',
    state: 'Virginia',
    funFact: 'He wrote most of the Declaration of Independence!',
    age: 33
  },
  {
    name: 'John Adams',
    state: 'Massachusetts',
    funFact: 'He later became President of the United States!',
    age: 40
  }
];

const DeclarationOfIndependence: React.FC<DeclarationOfIndependenceProps> = ({ onBack, onSaveProgress }) => {
  const [selectedSection, setSelectedSection] = useState<DocumentSection | null>(null);
  const [selectedSigner, setSelectedSigner] = useState<Signer | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'document' | 'signers' | 'quiz'>('document');

  const quizQuestions = [
    {
      question: "Who wrote most of the Declaration of Independence?",
      options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
      correct: 2,
      explanation: "Thomas Jefferson wrote most of the Declaration of Independence!"
    },
    {
      question: "What are the three rights mentioned in the Declaration?",
      options: ["Life, Liberty, and Happiness", "Food, Water, and Shelter", "Money, Cars, and Houses", "Toys, Games, and Books"],
      correct: 0,
      explanation: "The Declaration says people have the right to Life, Liberty, and the pursuit of Happiness!"
    },
    {
      question: "What year was the Declaration signed?",
      options: ["1775", "1776", "1777", "1778"],
      correct: 1,
      explanation: "The Declaration of Independence was signed in 1776!"
    },
    {
      question: "Which signer had the biggest signature?",
      options: ["Benjamin Franklin", "John Hancock", "Thomas Jefferson", "John Adams"],
      correct: 1,
      explanation: "John Hancock's signature is the biggest and most famous!"
    },
    {
      question: "What did the Declaration say about people?",
      options: ["All people are created equal", "Some people are better than others", "Only rich people matter", "Only men matter"],
      correct: 0,
      explanation: "The Declaration says that all people are created equal!"
    }
  ];

  const handleQuizAnswer = (selectedAnswer: number) => {
    const question = quizQuestions[currentQuizQuestion];
    if (selectedAnswer === question.correct) {
      setQuizScore(quizScore + 1);
    }
    
    if (currentQuizQuestion < quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      // Quiz completed
      if (onSaveProgress) {
        onSaveProgress(quizScore + (selectedAnswer === question.correct ? 1 : 0), quizQuestions.length);
      }
      setShowQuiz(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Social Studies
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">The Declaration of Independence</h1>
        </div>
        <p className="text-gray-700 text-lg">Learn about America's most important document!</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('document')}
            className={`px-6 py-3 rounded-md font-semibold transition-colors ${
              activeTab === 'document' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Document
          </button>
          <button
            onClick={() => setActiveTab('signers')}
            className={`px-6 py-3 rounded-md font-semibold transition-colors ${
              activeTab === 'signers' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Signers
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-3 rounded-md font-semibold transition-colors ${
              activeTab === 'quiz' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            Quiz
          </button>
        </div>
      </div>

      {/* Document Tab */}
      {activeTab === 'document' && (
        <div>
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-8 mb-8 border-l-4 border-red-400">
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-yellow-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Understanding the Declaration</h2>
            </div>
            <p className="text-gray-700 mb-4">
              The Declaration of Independence is divided into four main parts. Each part tells us something 
              important about why America became its own country.
            </p>
            <p className="text-gray-700">
              Click on each part to learn more about what it means!
            </p>
          </div>

          <div className="grid gap-6">
            {documentSections.map((section) => (
              <div
                key={section.id}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-l-4 ${section.color}`}
                onClick={() => setSelectedSection(section)}
              >
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{section.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{section.subtitle}</p>
                    <p className="text-gray-700">{section.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signers Tab */}
      {activeTab === 'signers' && (
        <div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8 border-l-4 border-blue-400">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-blue-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">The Signers</h2>
            </div>
            <p className="text-gray-700">
              Meet some of the brave men who signed the Declaration of Independence. They helped create 
              a new country based on freedom and equality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {famousSigners.map((signer) => (
              <div
                key={signer.name}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-blue-300"
                onClick={() => setSelectedSigner(signer)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{signer.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{signer.state}</p>
                  <p className="text-blue-600 text-xs font-semibold">Age: {signer.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 border-l-4 border-red-400">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Declaration Quiz!</h2>
            <p className="text-gray-600">Test what you know about America's founding document.</p>
          </div>
          
          {!showQuiz ? (
            <div className="text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center mx-auto"
              >
                <Target className="w-5 h-5 mr-2" />
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Question {currentQuizQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    Score: {quizScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuizQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {quizQuestions[currentQuizQuestion].question}
              </h3>
              
              <div className="grid gap-3">
                {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Details Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedSection.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedSection.title}</h2>
                    <p className="text-blue-600 font-semibold">{selectedSection.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">What This Means</h3>
                  <p className="text-blue-700">{selectedSection.explanation}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-800 mb-2">Important Points</h3>
                  <ul className="space-y-2">
                    {selectedSection.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <Sparkles className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSection(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signer Details Modal */}
      {selectedSigner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedSigner.name}</h2>
                    <p className="text-gray-600">{selectedSigner.state}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSigner(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">About {selectedSigner.name}</h3>
                  <p className="text-blue-700">
                    <strong>Age in 1776:</strong> {selectedSigner.age} years old<br/>
                    <strong>State:</strong> {selectedSigner.state}
                  </p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-yellow-800 mb-2">Fun Fact!</h3>
                  <p className="text-yellow-700">{selectedSigner.funFact}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedSigner(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400 mt-8 text-center">
        <span className="font-semibold">"We hold these truths to be self-evident, that all men are created equal..." 🇺🇸</span>
      </div>
    </div>
  );
};

export default DeclarationOfIndependence; 