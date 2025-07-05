import React, { useState } from 'react';
import { Flag, Sparkles, Star, Users, Calendar, MapPin, Target, Award, Heart } from 'lucide-react';

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
    description: 'Colorful explosions light up the night sky',
    icon: '🎆',
    details: 'Fireworks represent the "rockets\' red glare" mentioned in the Star-Spangled Banner. They symbolize the celebration of freedom and independence. The first Fourth of July fireworks were set off in Philadelphia in 1777, just one year after the Declaration was signed!',
    funFact: 'Americans spend over $1 billion on fireworks each year!'
  },
  {
    id: 'parades',
    title: 'Parades',
    description: 'Communities march together in celebration',
    icon: '🎭',
    details: 'Parades bring communities together to celebrate American pride. They often feature marching bands, floats, veterans, and local organizations. The oldest Fourth of July parade is in Bristol, Rhode Island, which started in 1785!',
    funFact: 'The Bristol parade is over 230 years old and still going strong!'
  },
  {
    id: 'barbecues',
    title: 'Barbecues & Picnics',
    description: 'Families gather for outdoor feasts',
    icon: '🍔',
    details: 'Barbecues and picnics are a way for families and friends to celebrate together outdoors. Hot dogs, hamburgers, and apple pie are traditional Fourth of July foods. This tradition represents the American spirit of community and celebration.',
    funFact: 'Americans eat about 150 million hot dogs on the Fourth of July!'
  },
  {
    id: 'flag-display',
    title: 'Flag Display',
    description: 'The American flag flies proudly everywhere',
    icon: '🇺🇸',
    details: 'The American flag is displayed on homes, businesses, and public buildings. The flag represents the 50 states (stars) and the original 13 colonies (stripes). Flag etiquette includes displaying it from sunrise to sunset and never letting it touch the ground.',
    funFact: 'The current flag design has been used since 1960 when Hawaii became a state!'
  },
  {
    id: 'concerts',
    title: 'Concerts & Music',
    description: 'Patriotic music fills the air',
    icon: '🎵',
    details: 'Patriotic concerts feature songs like "The Star-Spangled Banner," "America the Beautiful," and "God Bless America." Many cities have free concerts in parks, and the Boston Pops Orchestra has a famous Fourth of July concert.',
    funFact: 'The Boston Pops has been performing on the Fourth of July since 1929!'
  }
];

const FourthOfJuly: React.FC<FourthOfJulyProps> = ({ onBack, onSaveProgress }) => {
  const [selectedTradition, setSelectedTradition] = useState<Tradition | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      question: "What year was the first Fourth of July celebration?",
      options: ["1775", "1776", "1777", "1778"],
      correct: 2,
      explanation: "The first Fourth of July celebration was in 1777, one year after the Declaration was signed."
    },
    {
      question: "What do the 50 stars on the American flag represent?",
      options: ["The original colonies", "The states", "The presidents", "The years since independence"],
      correct: 1,
      explanation: "The 50 stars represent the 50 states of the United States."
    },
    {
      question: "Which city has the oldest Fourth of July parade?",
      options: ["New York", "Boston", "Bristol, Rhode Island", "Philadelphia"],
      correct: 2,
      explanation: "Bristol, Rhode Island has the oldest Fourth of July parade, starting in 1785."
    },
    {
      question: "What traditional food is most popular on the Fourth of July?",
      options: ["Pizza", "Hot dogs", "Tacos", "Sushi"],
      correct: 1,
      explanation: "Hot dogs are the most popular Fourth of July food, with about 150 million eaten."
    },
    {
      question: "What do fireworks symbolize on the Fourth of July?",
      options: ["The weather", "The rockets from the Star-Spangled Banner", "The food", "The music"],
      correct: 1,
      explanation: "Fireworks represent the 'rockets' red glare' mentioned in the Star-Spangled Banner."
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
          <h1 className="text-3xl font-bold text-blue-800">The Fourth of July: America's Birthday</h1>
        </div>
        <p className="text-gray-700 text-lg">Discover what makes Independence Day so special and how Americans celebrate!</p>
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
              The Fourth of July, also called <strong>Independence Day</strong>, is America's birthday! On July 4, 1776, 
              leaders from the 13 colonies signed the Declaration of Independence, declaring that America would be 
              a free and independent country, no longer ruled by Great Britain.
            </p>
            <p className="text-gray-700">
              This day represents the birth of American democracy and the values of freedom, equality, and 
              self-government that the United States was founded upon.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why We Celebrate</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Heart className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Freedom:</strong> We celebrate the freedom to choose our leaders and make our own laws</span>
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Unity:</strong> We come together as Americans, regardless of our differences</span>
              </li>
              <li className="flex items-start">
                <Flag className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Patriotism:</strong> We show love and pride for our country and its values</span>
              </li>
              <li className="flex items-start">
                <Sparkles className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Hope:</strong> We celebrate the American dream and opportunities for all</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Traditions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Fourth of July Traditions</h2>
        <p className="text-gray-600 text-center mb-8">Click on each tradition to learn more about how Americans celebrate Independence Day!</p>
        
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
                  <h3 className="font-semibold text-blue-800 mb-2">About This Tradition</h3>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">American Values We Celebrate</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Freedom</h3>
            <p className="text-sm text-gray-600">The right to speak, worship, and live as we choose</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Equality</h3>
            <p className="text-sm text-gray-600">All people are created equal and deserve equal rights</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Democracy</h3>
            <p className="text-sm text-gray-600">Government by the people, for the people</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Opportunity</h3>
            <p className="text-sm text-gray-600">The chance to pursue our dreams and goals</p>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 border-l-4 border-red-400">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Your Fourth of July Knowledge!</h2>
          <p className="text-gray-600">Take a quiz to see how much you know about Independence Day traditions.</p>
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

      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400 mt-8 text-center">
        <span className="font-semibold">Happy Independence Day! 🇺🇸</span>
      </div>
    </div>
  );
};

export default FourthOfJuly; 