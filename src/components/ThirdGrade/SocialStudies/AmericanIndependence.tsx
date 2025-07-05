import React, { useState } from 'react';
import { Flag, Sparkles, Star, ScrollText, Users, MapPin, Target, Award } from 'lucide-react';

interface AmericanIndependenceProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
  details: string;
  funFact: string;
  completed: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'tea-party',
    year: 1773,
    title: 'Boston Tea Party',
    description: 'Colonists dump tea into the ocean to protest taxes',
    icon: '☕',
    details: 'The British government made the colonists pay extra money for tea. The colonists were angry! They dressed up and dumped all the tea into Boston Harbor. This was a big way to say "we don\'t like these taxes!"',
    funFact: 'They dumped enough tea to make 18 million cups!',
    completed: false
  },
  {
    id: 'first-shots',
    year: 1775,
    title: 'First Shots Fired',
    description: 'The war begins at Lexington and Concord',
    icon: '⚔️',
    details: 'British soldiers came to take away the colonists\' guns. Paul Revere rode his horse to warn everyone! The first shots of the war were fired. This was called "the shot heard round the world."',
    funFact: 'Paul Revere\'s famous ride happened at night!',
    completed: false
  },
  {
    id: 'declaration',
    year: 1776,
    title: 'Declaration of Independence',
    description: 'America says it wants to be free',
    icon: '📜',
    details: 'Thomas Jefferson wrote a very important paper called the Declaration of Independence. It said that America wanted to be its own country, not ruled by Britain. It was signed on July 4th, which is why we celebrate Independence Day!',
    funFact: 'John Hancock signed his name really big so the king could read it!',
    completed: false
  },
  {
    id: 'yorktown',
    year: 1781,
    title: 'Battle of Yorktown',
    description: 'The last big battle of the war',
    icon: '🎯',
    details: 'This was the last big battle of the war. American and French soldiers surrounded the British army. The British had to give up. They played music when they surrendered!',
    funFact: 'The British band played "The World Turned Upside Down" when they gave up!',
    completed: false
  },
  {
    id: 'freedom',
    year: 1783,
    title: 'America is Free!',
    description: 'Britain says America is independent',
    icon: '🇺🇸',
    details: 'Britain finally agreed that America could be its own country! They signed a paper called the Treaty of Paris. America was now free and independent. The war was over!',
    funFact: 'Benjamin Franklin helped make the peace treaty!',
    completed: false
  }
];

const AmericanIndependence: React.FC<AmericanIndependenceProps> = ({ onBack, onSaveProgress }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [completedEvents, setCompletedEvents] = useState<Set<string>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    {
      question: "What year was the Declaration of Independence signed?",
      options: ["1775", "1776", "1777", "1778"],
      correct: 1,
      explanation: "The Declaration of Independence was signed in 1776."
    },
    {
      question: "What happened at the Boston Tea Party?",
      options: ["Colonists drank tea", "Colonists dumped tea in the ocean", "Colonists bought tea", "Colonists sold tea"],
      correct: 1,
      explanation: "The colonists dumped tea into Boston Harbor to protest British taxes."
    },
    {
      question: "Who wrote most of the Declaration of Independence?",
      options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
      correct: 1,
      explanation: "Thomas Jefferson wrote most of the Declaration of Independence."
    },
    {
      question: "What year did the American Revolution end?",
      options: ["1781", "1782", "1783", "1784"],
      correct: 2,
      explanation: "The war ended in 1783 with the Treaty of Paris."
    }
  ];

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setCompletedEvents(prev => new Set([...prev, event.id]));
  };

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

  const completedCount = completedEvents.size;
  const totalEvents = timelineEvents.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Social Studies
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Flag className="w-8 h-8 text-red-600 mr-3" />
          <h1 className="text-2xl font-bold text-blue-800">The Fourth of July Story</h1>
        </div>
        <p className="text-gray-700 text-lg">Click on the timeline to learn about America's birthday!</p>
        
        {/* Progress Bar */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {completedCount}/{totalEvents} events explored</span>
            <span>{Math.round((completedCount / totalEvents) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalEvents) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Simple Timeline */}
      <div className="space-y-6 mb-8">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative">
            <div 
              className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 ${
                completedEvents.has(event.id) 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {event.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                    <div className="flex items-center">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-2">
                        {event.year}
                      </span>
                      {completedEvents.has(event.id) && (
                        <Award className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{event.description}</p>
                </div>
              </div>
            </div>
            
            {/* Connecting Line */}
            {index < timelineEvents.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-6 bg-blue-300 transform translate-x-4"></div>
            )}
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedEvent.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedEvent.title}</h2>
                    <p className="text-gray-600">{selectedEvent.year}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">What Happened?</h3>
                  <p className="text-blue-700">{selectedEvent.details}</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-yellow-800 mb-2">Fun Fact!</h3>
                  <p className="text-yellow-700">{selectedEvent.funFact}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 border-l-4 border-red-400">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Test What You Learned!</h2>
          <p className="text-gray-600">Take a fun quiz about the Fourth of July.</p>
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
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
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

export default AmericanIndependence; 