import React, { useState } from 'react';
import { BookOpen, Users, Flag, Star, Target, Heart, Calendar, MapPin, Award, Sparkles } from 'lucide-react';

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
  occupation: string;
  funFact: string;
  age: number;
}

const documentSections: DocumentSection[] = [
  {
    id: 'preamble',
    title: 'The Preamble',
    subtitle: 'Why We Are Writing This',
    content: 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.',
    explanation: 'This opening explains that sometimes people need to break away from their government and form a new country. It says they have the right to do this and should explain why.',
    keyPoints: [
      'Sometimes people need to break away from their government',
      'They have the right to form a new country',
      'They should explain why they are doing this',
      'This is a natural right given by God'
    ],
    icon: '📜',
    color: 'border-l-blue-500'
  },
  {
    id: 'principles',
    title: 'The Principles',
    subtitle: 'What We Believe',
    content: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness.',
    explanation: 'This is the most famous part! It says that all people are equal and have rights that cannot be taken away: life, freedom, and the right to pursue happiness. Governments exist to protect these rights, and if they don\'t, people can change or replace the government.',
    keyPoints: [
      'All people are created equal',
      'Everyone has unalienable rights: Life, Liberty, and the pursuit of Happiness',
      'Governments exist to protect these rights',
      'If a government doesn\'t protect rights, people can change it',
      'Governments get their power from the people'
    ],
    icon: '⚖️',
    color: 'border-l-green-500'
  },
  {
    id: 'grievances',
    title: 'The Grievances',
    subtitle: 'What the King Did Wrong',
    content: 'The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.',
    explanation: 'This section lists all the things King George III did wrong. It explains why the colonists felt they had no choice but to break away from Great Britain. The document then lists 27 specific complaints against the king.',
    keyPoints: [
      'King George III repeatedly hurt the colonies',
      'He tried to establish absolute control over America',
      'The colonists had many specific complaints',
      'They felt the king was being a tyrant',
      'This section proves why independence was necessary'
    ],
    icon: '👑',
    color: 'border-l-red-500'
  },
  {
    id: 'resolution',
    title: 'The Resolution',
    subtitle: 'What We Are Doing',
    content: 'We, therefore, the Representatives of the united States of America, in General Congress, Assembled, appealing to the Supreme Judge of the world for the rectitude of our intentions, do, in the Name, and by Authority of the good People of these Colonies, solemnly publish and declare, That these United Colonies are, and of Right ought to be Free and Independent States; that they are Absolved from all Allegiance to the British Crown, and that all political connection between them and the State of Great Britain, is and ought to be totally dissolved; and that as Free and Independent States, they have full Power to levy War, conclude Peace, contract Alliances, establish Commerce, and to do all other Acts and Things which Independent States may of right do.',
    explanation: 'This is where the colonies officially declare themselves independent! They say they are now free and independent states, no longer under British rule. They can now make their own laws, trade with other countries, and govern themselves.',
    keyPoints: [
      'The colonies declare themselves independent',
      'They are no longer under British rule',
      'They can make their own laws and decisions',
      'They can trade with other countries',
      'They have full power as independent states'
    ],
    icon: '🏛️',
    color: 'border-l-purple-500'
  }
];

const famousSigners: Signer[] = [
  {
    name: 'John Hancock',
    state: 'Massachusetts',
    occupation: 'Merchant',
    funFact: 'His signature is the largest on the document!',
    age: 39
  },
  {
    name: 'Benjamin Franklin',
    state: 'Pennsylvania',
    occupation: 'Printer & Inventor',
    funFact: 'He discovered electricity and invented bifocal glasses!',
    age: 70
  },
  {
    name: 'Thomas Jefferson',
    state: 'Virginia',
    occupation: 'Lawyer & Planter',
    funFact: 'He wrote most of the Declaration of Independence!',
    age: 33
  },
  {
    name: 'John Adams',
    state: 'Massachusetts',
    occupation: 'Lawyer',
    funFact: 'He later became the 2nd President of the United States!',
    age: 40
  },
  {
    name: 'George Washington',
    state: 'Virginia',
    occupation: 'General & Planter',
    funFact: 'He was not at the signing - he was leading the army!',
    age: 44
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
      explanation: "Thomas Jefferson wrote most of the Declaration of Independence."
    },
    {
      question: "What are the three unalienable rights mentioned in the Declaration?",
      options: ["Life, Liberty, and Property", "Life, Liberty, and the pursuit of Happiness", "Freedom, Justice, and Equality", "Peace, Love, and Understanding"],
      correct: 1,
      explanation: "The Declaration states that all people have the right to Life, Liberty, and the pursuit of Happiness."
    },
    {
      question: "What year was the Declaration of Independence signed?",
      options: ["1775", "1776", "1777", "1778"],
      correct: 1,
      explanation: "The Declaration of Independence was signed in 1776."
    },
    {
      question: "Which signer had the largest signature?",
      options: ["Benjamin Franklin", "John Hancock", "Thomas Jefferson", "John Adams"],
      correct: 1,
      explanation: "John Hancock's signature is the largest and most famous on the document."
    },
    {
      question: "What does 'self-evident' mean in the Declaration?",
      options: ["Obvious", "Hidden", "Complicated", "Secret"],
      correct: 0,
      explanation: "'Self-evident' means obvious or clear without needing proof."
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
        <p className="text-gray-700 text-lg">Explore America's most important document and understand what it means!</p>
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
              The Declaration of Independence is divided into four main parts. Each part has a specific purpose 
              and together they explain why the American colonies decided to break away from Great Britain and 
              form their own country.
            </p>
            <p className="text-gray-700">
              Click on each section to learn more about what it means and why it's important!
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
                    <p className="text-gray-600 text-sm italic mb-3">"{section.content.substring(0, 150)}..."</p>
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
              Meet some of the brave men who signed the Declaration of Independence. They risked their lives 
              and fortunes to create a new nation based on freedom and equality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-gray-500 text-xs">{signer.occupation}</p>
                  <p className="text-blue-600 text-xs font-semibold mt-2">Age: {signer.age}</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Declaration of Independence Quiz!</h2>
            <p className="text-gray-600">Test your knowledge about America's founding document.</p>
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
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                  <h3 className="font-semibold text-gray-800 mb-2">Original Text</h3>
                  <p className="text-gray-700 italic">{selectedSection.content}</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">What This Means</h3>
                  <p className="text-blue-700">{selectedSection.explanation}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-800 mb-2">Key Points</h3>
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
                    <strong>Occupation:</strong> {selectedSigner.occupation}<br/>
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