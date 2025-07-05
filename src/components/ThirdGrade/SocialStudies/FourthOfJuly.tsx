import React, { useState } from 'react';
import { Flag, Sparkles, Star, Users, Heart } from 'lucide-react';

interface FourthOfJulyProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Tradition {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  funFact: string;
}

const traditions: Tradition[] = [
  {
    id: 'fireworks',
    title: 'Fireworks',
    description: 'Beautiful lights in the sky',
    icon: '🎆',
    details: 'Fireworks are colorful explosions that light up the night sky. They help us celebrate America\'s birthday! People gather to watch them together.',
    funFact: 'Fireworks come in many colors - red, white, and blue!'
  },
  {
    id: 'parades',
    title: 'Parades',
    description: 'People march and celebrate together',
    icon: '🎭',
    details: 'Parades are when people walk down the street together to celebrate. There are bands playing music, floats with decorations, and lots of fun!',
    funFact: 'Some parades have people dressed up as famous Americans!'
  },
  {
    id: 'barbecues',
    title: 'BBQs & Picnics',
    description: 'Families eat yummy food together',
    icon: '🍔',
    details: 'Families and friends get together to eat delicious food outdoors. Hot dogs, hamburgers, and watermelon are popular Fourth of July foods!',
    funFact: 'Hot dogs are the most popular food on the Fourth of July!'
  },
  {
    id: 'flag-display',
    title: 'American Flag',
    description: 'The flag flies everywhere',
    icon: '🇺🇸',
    details: 'The American flag is displayed on homes and buildings. The flag has 50 stars (for the states) and 13 stripes (for the original colonies).',
    funFact: 'The flag should never touch the ground!'
  },
  {
    id: 'concerts',
    title: 'Music',
    description: 'Patriotic songs fill the air',
    icon: '🎵',
    details: 'People sing patriotic songs like "The Star-Spangled Banner" and "America the Beautiful." Music brings everyone together to celebrate!',
    funFact: 'Many cities have free concerts in the park!'
  }
];

const FourthOfJuly: React.FC<FourthOfJulyProps> = ({ onBack, onSaveProgress }) => {
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      question: "What do we call July 4th?",
      options: ["America's Birthday", "Christmas", "Halloween", "Thanksgiving"],
      correct: 0,
      explanation: "July 4th is America's Birthday, also called Independence Day!"
    },
    {
      question: "What colors are fireworks usually?",
      options: ["Red, white, and blue", "Green and yellow", "Purple and pink", "Orange and brown"],
      correct: 0,
      explanation: "Fireworks are usually red, white, and blue - the colors of the American flag!"
    },
    {
      question: "What food do people eat most on the Fourth of July?",
      options: ["Pizza", "Hot dogs", "Ice cream", "Tacos"],
      correct: 1,
      explanation: "Hot dogs are the most popular food on the Fourth of July!"
    },
    {
      question: "How many stars are on the American flag?",
      options: ["13", "25", "50", "100"],
      correct: 2,
      explanation: "The American flag has 50 stars, one for each state!"
    },
    {
      question: "What do people do at parades?",
      options: ["Sleep", "March and celebrate", "Cook food", "Play video games"],
      correct: 1,
      explanation: "At parades, people march and celebrate together!"
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
          <Sparkles className="w-8 h-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">The Fourth of July: America's Birthday!</h1>
        </div>
        <p className="text-gray-700 text-lg">Learn about America's special day and how we celebrate!</p>
      </div>

      {/* What is the Fourth of July Section */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-8 mb-8 border-l-4 border-red-400">
        <div className="flex items-center mb-6">
          <Star className="w-8 h-8 text-yellow-500 mr-4" />
          <h2 className="text-2xl font-bold text-gray-800">What is the Fourth of July?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">America's Birthday</h3>
            <p className="text-gray-700 mb-4">
              The Fourth of July is <strong>America's birthday</strong>! On July 4, 1776, America became 
              a free country. Before that, America was ruled by Great Britain, but the American people 
              wanted to be free and make their own rules.
            </p>
            <p className="text-gray-700">
              This special day reminds us that America is a country where people can be free and 
              have the chance to follow their dreams!
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why We Celebrate</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Freedom:</strong> We can choose what we want to do and say</span>
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Together:</strong> We celebrate as one big American family</span>
              </li>
              <li className="flex items-start">
                <Flag className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Pride:</strong> We're proud to be Americans</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Fun:</strong> We have parties and celebrations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Traditions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How We Celebrate the Fourth of July</h2>
        <p className="text-gray-600 text-center mb-8">Click on each picture to learn more about Fourth of July fun!</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {traditions.map((tradition) => (
            <div
              key={tradition.id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-blue-300"
              onClick={() => setSelectedTradition(tradition)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{tradition.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tradition.title}</h3>
                <p className="text-gray-600 text-sm">{tradition.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tradition Details Modal */}
      {selectedTradition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedTradition.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTradition.title}</h2>
                    <p className="text-gray-600">{selectedTradition.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTradition(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">What is this?</h3>
                  <p className="text-blue-700">{selectedTradition.details}</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-yellow-800 mb-2">Fun Fact!</h3>
                  <p className="text-yellow-700">{selectedTradition.funFact}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedTradition(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* American Values Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8 border-l-4 border-blue-400">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Makes America Special</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Freedom</h3>
            <p className="text-sm text-gray-600">We can choose what we want to do</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Friendship</h3>
            <p className="text-sm text-gray-600">We help each other and work together</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Pride</h3>
            <p className="text-sm text-gray-600">We're proud to be Americans</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Fun</h3>
            <p className="text-sm text-gray-600">We celebrate and have fun together</p>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 border-l-4 border-red-400">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Fourth of July Quiz!</h2>
          <p className="text-gray-600">Test what you know about America's birthday!</p>
        </div>
        
        {!showQuiz ? (
          <div className="text-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center mx-auto"
            >
              <Star className="w-5 h-5 mr-2" />
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

      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400 mt-8 text-center">
        <span className="font-semibold">Happy Fourth of July! 🇺🇸</span>
      </div>
    </div>
  );
};

export default FourthOfJuly; 