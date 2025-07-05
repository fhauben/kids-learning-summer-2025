import React, { useState } from 'react';
import { Flag, ScrollText, Users, Star, Sparkles, Calendar, MapPin, Target, Award } from 'lucide-react';

interface AmericanIndependenceProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface TimelineEvent {
  id: string;
  year: number;
  month: string;
  title: string;
  description: string;
  location: string;
  icon: string;
  details: string;
  funFact: string;
  completed: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'boston-tea-party',
    year: 1773,
    month: 'December',
    title: 'Boston Tea Party',
    description: 'Colonists protest British taxes by dumping tea into Boston Harbor',
    location: 'Boston, Massachusetts',
    icon: '☕',
    details: 'The British government had placed a tax on tea, which made the colonists angry. On December 16, 1773, a group of colonists dressed as Native Americans boarded British ships and dumped 342 chests of tea into Boston Harbor. This was a major act of protest against British rule.',
    funFact: 'The tea that was dumped would be worth about $1.7 million today!',
    completed: false
  },
  {
    id: 'first-continental-congress',
    year: 1774,
    month: 'September',
    title: 'First Continental Congress',
    description: 'Representatives from 12 colonies meet to discuss their response to British policies',
    location: 'Philadelphia, Pennsylvania',
    icon: '🏛️',
    details: 'Delegates from 12 of the 13 colonies met in Philadelphia to discuss how to respond to British laws they felt were unfair. They decided to boycott British goods and send a petition to King George III asking for their rights to be respected.',
    funFact: 'Georgia was the only colony that didn\'t send representatives!',
    completed: false
  },
  {
    id: 'lexington-concord',
    year: 1775,
    month: 'April',
    title: 'Battles of Lexington & Concord',
    description: 'The first shots of the American Revolution are fired',
    location: 'Lexington & Concord, Massachusetts',
    icon: '⚔️',
    details: 'British soldiers marched to Concord to seize colonial weapons. Paul Revere and others warned the colonists. At Lexington, the first shots were fired - "the shot heard round the world." The British were forced to retreat back to Boston.',
    funFact: 'Paul Revere\'s famous ride actually happened the night before the battle!',
    completed: false
  },
  {
    id: 'second-continental-congress',
    year: 1775,
    month: 'May',
    title: 'Second Continental Congress',
    description: 'Congress creates the Continental Army and names George Washington as commander',
    location: 'Philadelphia, Pennsylvania',
    icon: '🎖️',
    details: 'After the battles at Lexington and Concord, the colonies needed to organize their defense. The Second Continental Congress created the Continental Army and chose George Washington to lead it. They also began printing money to pay for the war.',
    funFact: 'George Washington refused to be paid for leading the army!',
    completed: false
  },
  {
    id: 'declaration-independence',
    year: 1776,
    month: 'July',
    title: 'Declaration of Independence',
    description: 'The colonies declare their independence from Great Britain',
    location: 'Philadelphia, Pennsylvania',
    icon: '📜',
    details: 'Thomas Jefferson wrote most of the Declaration of Independence, which explained why the colonies wanted to be free from British rule. It was signed by 56 delegates on July 4, 1776. The most famous line is "We hold these truths to be self-evident, that all men are created equal."',
    funFact: 'John Hancock signed his name so large that "John Hancock" became another way to say "signature"!',
    completed: false
  },
  {
    id: 'saratoga',
    year: 1777,
    month: 'October',
    title: 'Battle of Saratoga',
    description: 'A major American victory that convinces France to help the colonies',
    location: 'Saratoga, New York',
    icon: '🏆',
    details: 'The American victory at Saratoga was a turning point in the war. It showed that the Americans could defeat the British army. This victory convinced France to become an ally of the United States, providing money, weapons, and soldiers.',
    funFact: 'The British general surrendered his sword, but the American general refused to accept it!',
    completed: false
  },
  {
    id: 'valley-forge',
    year: 1777,
    month: 'December',
    title: 'Valley Forge Winter',
    description: 'Washington\'s army suffers through a harsh winter but emerges stronger',
    location: 'Valley Forge, Pennsylvania',
    icon: '❄️',
    details: 'During the winter of 1777-1778, Washington\'s army camped at Valley Forge. They suffered from cold, hunger, and disease. However, a Prussian officer named Baron von Steuben trained the soldiers, making them a much better fighting force.',
    funFact: 'About 2,500 soldiers died at Valley Forge, mostly from disease, not battle!',
    completed: false
  },
  {
    id: 'yorktown',
    year: 1781,
    month: 'October',
    title: 'Battle of Yorktown',
    description: 'The final major battle of the American Revolution',
    location: 'Yorktown, Virginia',
    icon: '🎯',
    details: 'American and French forces surrounded the British army at Yorktown. After three weeks of fighting, the British general Cornwallis surrendered. This was the last major battle of the war. The British realized they could not win.',
    funFact: 'The British band played "The World Turned Upside Down" when they surrendered!',
    completed: false
  },
  {
    id: 'treaty-paris',
    year: 1783,
    month: 'September',
    title: 'Treaty of Paris',
    description: 'Great Britain officially recognizes American independence',
    location: 'Paris, France',
    icon: '🤝',
    details: 'The Treaty of Paris officially ended the American Revolution. Great Britain recognized the United States as an independent country. The new nation\'s borders extended from the Atlantic Ocean to the Mississippi River.',
    funFact: 'Benjamin Franklin, John Adams, and John Jay represented the United States in the treaty negotiations!',
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
      explanation: "The Declaration of Independence was signed on July 4, 1776."
    },
    {
      question: "Who was the main author of the Declaration of Independence?",
      options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
      correct: 2,
      explanation: "Thomas Jefferson wrote most of the Declaration of Independence."
    },
    {
      question: "What was the first battle of the American Revolution?",
      options: ["Saratoga", "Yorktown", "Lexington & Concord", "Bunker Hill"],
      correct: 2,
      explanation: "The Battles of Lexington & Concord in April 1775 were the first battles of the war."
    },
    {
      question: "Which battle convinced France to help the Americans?",
      options: ["Yorktown", "Saratoga", "Valley Forge", "Bunker Hill"],
      correct: 1,
      explanation: "The American victory at Saratoga in 1777 convinced France to become an ally."
    },
    {
      question: "What year did the American Revolution officially end?",
      options: ["1781", "1782", "1783", "1784"],
      correct: 2,
      explanation: "The Treaty of Paris was signed in 1783, officially ending the war."
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
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Social Studies
      </button>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Flag className="w-8 h-8 text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">American Revolution Timeline Explorer</h1>
        </div>
        <p className="text-gray-700 text-lg">Click on the timeline events to explore the American Revolution!</p>
        
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

      {/* Interactive Timeline */}
      <div className="relative mb-8">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 via-blue-500 to-green-500 h-full"></div>
        
        {/* Timeline Events */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Event Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div 
                  className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 ${
                    completedEvents.has(event.id) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{event.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.month} {event.year}</p>
                    </div>
                    {completedEvents.has(event.id) && (
                      <Award className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
              
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10"></div>
              
              {/* Year Label */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 -top-8 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                {event.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedEvent.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
                    <p className="text-gray-600">{selectedEvent.month} {selectedEvent.year}</p>
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
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{selectedEvent.location}</span>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Test Your Knowledge!</h2>
          <p className="text-gray-600">Take a quiz to see how much you learned about the American Revolution.</p>
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

export default AmericanIndependence; 