import React, { useState } from 'react';
import { Globe, MapPin, Flag, Target, Award, Sparkles, Users } from 'lucide-react';

interface CountriesQuizProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Country {
  name: string;
  capital: string;
  flag: string;
  continent: string;
  funFact: string;
  landmarks: string[];
}

const countries: Country[] = [
  {
    name: 'Japan',
    capital: 'Tokyo',
    flag: '🇯🇵',
    continent: 'Asia',
    funFact: 'Japan has more than 6,800 islands!',
    landmarks: ['Mount Fuji', 'Tokyo Tower']
  },
  {
    name: 'Spain',
    capital: 'Madrid',
    flag: '🇪🇸',
    continent: 'Europe',
    funFact: 'Spain has the world\'s oldest restaurant!',
    landmarks: ['Sagrada Familia', 'Alhambra']
  },
  {
    name: 'France',
    capital: 'Paris',
    flag: '🇫🇷',
    continent: 'Europe',
    funFact: 'France has the most time zones of any country!',
    landmarks: ['Eiffel Tower', 'Louvre Museum']
  },
  {
    name: 'Germany',
    capital: 'Berlin',
    flag: '🇩🇪',
    continent: 'Europe',
    funFact: 'Germany has over 1,500 different types of sausages!',
    landmarks: ['Brandenburg Gate', 'Neuschwanstein Castle']
  },
  {
    name: 'Switzerland',
    capital: 'Bern',
    flag: '🇨🇭',
    continent: 'Europe',
    funFact: 'Switzerland has four official languages!',
    landmarks: ['Matterhorn', 'Lake Geneva']
  },
  {
    name: 'Liechtenstein',
    capital: 'Vaduz',
    flag: '🇱🇮',
    continent: 'Europe',
    funFact: 'Liechtenstein is one of the smallest countries in the world!',
    landmarks: ['Vaduz Castle', 'Liechtenstein National Museum']
  },
  {
    name: 'Greece',
    capital: 'Athens',
    flag: '🇬🇷',
    continent: 'Europe',
    funFact: 'Greece has over 6,000 islands!',
    landmarks: ['Parthenon', 'Santorini']
  },
  {
    name: 'Austria',
    capital: 'Vienna',
    flag: '🇦🇹',
    continent: 'Europe',
    funFact: 'Austria is the birthplace of classical music!',
    landmarks: ['Schönbrunn Palace', 'Hofburg Palace']
  },
  {
    name: 'Italy',
    capital: 'Rome',
    flag: '🇮🇹',
    continent: 'Europe',
    funFact: 'Italy has the most UNESCO World Heritage sites!',
    landmarks: ['Colosseum', 'Leaning Tower of Pisa']
  },
  {
    name: 'Azerbaijan',
    capital: 'Baku',
    flag: '🇦🇿',
    continent: 'Asia',
    funFact: 'Azerbaijan is known as the Land of Fire!',
    landmarks: ['Flame Towers', 'Old City of Baku']
  },
  {
    name: 'Zimbabwe',
    capital: 'Harare',
    flag: '🇿🇼',
    continent: 'Africa',
    funFact: 'Zimbabwe has the world\'s largest waterfall by volume!',
    landmarks: ['Victoria Falls', 'Great Zimbabwe Ruins']
  },
  {
    name: 'Zambia',
    capital: 'Lusaka',
    flag: '🇿🇲',
    continent: 'Africa',
    funFact: 'Zambia is home to the mighty Victoria Falls!',
    landmarks: ['Victoria Falls', 'South Luangwa National Park']
  },
  {
    name: 'Ecuador',
    capital: 'Quito',
    flag: '🇪🇨',
    continent: 'South America',
    funFact: 'Ecuador is named after the equator!',
    landmarks: ['Galápagos Islands', 'Cotopaxi Volcano']
  },
  {
    name: 'South Korea',
    capital: 'Seoul',
    flag: '🇰🇷',
    continent: 'Asia',
    funFact: 'South Korea has the world\'s fastest internet!',
    landmarks: ['Gyeongbokgung Palace', 'N Seoul Tower']
  },
  {
    name: 'Taiwan',
    capital: 'Taipei',
    flag: '🇹🇼',
    continent: 'Asia',
    funFact: 'Taiwan is famous for its bubble tea!',
    landmarks: ['Taipei 101', 'Taroko Gorge']
  },
  {
    name: 'China',
    capital: 'Beijing',
    flag: '🇨🇳',
    continent: 'Asia',
    funFact: 'China has the world\'s largest population!',
    landmarks: ['Great Wall of China', 'Forbidden City']
  },
  {
    name: 'Vietnam',
    capital: 'Hanoi',
    flag: '🇻🇳',
    continent: 'Asia',
    funFact: 'Vietnam has the world\'s largest cave!',
    landmarks: ['Ha Long Bay', 'Hoi An Ancient Town']
  },
  {
    name: 'Denmark',
    capital: 'Copenhagen',
    flag: '🇩🇰',
    continent: 'Europe',
    funFact: 'Denmark is the happiest country in the world!',
    landmarks: ['Little Mermaid Statue', 'Tivoli Gardens']
  },
  {
    name: 'Norway',
    capital: 'Oslo',
    flag: '🇳🇴',
    continent: 'Europe',
    funFact: 'Norway has the world\'s longest road tunnel!',
    landmarks: ['Northern Lights', 'Geirangerfjord']
  },
  {
    name: 'Sweden',
    capital: 'Stockholm',
    flag: '🇸🇪',
    continent: 'Europe',
    funFact: 'Sweden has the world\'s largest furniture store!',
    landmarks: ['Vasa Museum', 'Gamla Stan']
  },
  {
    name: 'Mexico',
    capital: 'Mexico City',
    flag: '🇲🇽',
    continent: 'North America',
    funFact: 'Mexico introduced chocolate to the world!',
    landmarks: ['Chichen Itza', 'Teotihuacan']
  },
  {
    name: 'Canada',
    capital: 'Ottawa',
    flag: '🇨🇦',
    continent: 'North America',
    funFact: 'Canada has the longest coastline in the world!',
    landmarks: ['Niagara Falls', 'CN Tower']
  }
];

const CountriesQuiz: React.FC<CountriesQuizProps> = ({ onBack, onSaveProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const questions = [
    {
      type: 'capital' as const,
      question: 'What is the capital of Japan?',
      options: ['Osaka', 'Tokyo', 'Kyoto', 'Yokohama'],
      correct: 1,
      country: countries.find(c => c.name === 'Japan')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Spain?',
      options: ['Barcelona', 'Madrid', 'Valencia', 'Seville'],
      correct: 1,
      country: countries.find(c => c.name === 'Spain')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of France?',
      options: ['Lyon', 'Paris', 'Marseille', 'Nice'],
      correct: 1,
      country: countries.find(c => c.name === 'France')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Germany?',
      options: ['Munich', 'Berlin', 'Hamburg', 'Frankfurt'],
      correct: 1,
      country: countries.find(c => c.name === 'Germany')!
    },
    {
      type: 'flag' as const,
      question: 'Which country has this flag? 🇯🇵',
      options: ['China', 'Japan', 'South Korea', 'Taiwan'],
      correct: 1,
      country: countries.find(c => c.name === 'Japan')!
    },
    {
      type: 'flag' as const,
      question: 'Which country has this flag? 🇪🇸',
      options: ['France', 'Italy', 'Spain', 'Portugal'],
      correct: 2,
      country: countries.find(c => c.name === 'Spain')!
    },
    {
      type: 'flag' as const,
      question: 'Which country has this flag? 🇫🇷',
      options: ['France', 'Italy', 'Spain', 'Germany'],
      correct: 0,
      country: countries.find(c => c.name === 'France')!
    },
    {
      type: 'flag' as const,
      question: 'Which country has this flag? 🇨🇭',
      options: ['Austria', 'Switzerland', 'Liechtenstein', 'Germany'],
      correct: 1,
      country: countries.find(c => c.name === 'Switzerland')!
    },
    {
      type: 'fact' as const,
      question: 'Which country has more than 6,800 islands?',
      options: ['Philippines', 'Japan', 'Indonesia', 'Malaysia'],
      correct: 1,
      country: countries.find(c => c.name === 'Japan')!
    },
    {
      type: 'fact' as const,
      question: 'Which country has four official languages?',
      options: ['Belgium', 'Switzerland', 'Luxembourg', 'Netherlands'],
      correct: 1,
      country: countries.find(c => c.name === 'Switzerland')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of South Korea?',
      options: ['Busan', 'Seoul', 'Incheon', 'Daegu'],
      correct: 1,
      country: countries.find(c => c.name === 'South Korea')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of China?',
      options: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
      correct: 1,
      country: countries.find(c => c.name === 'China')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Denmark?',
      options: ['Aarhus', 'Copenhagen', 'Odense', 'Aalborg'],
      correct: 1,
      country: countries.find(c => c.name === 'Denmark')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Norway?',
      options: ['Bergen', 'Oslo', 'Trondheim', 'Stavanger'],
      correct: 1,
      country: countries.find(c => c.name === 'Norway')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Mexico?',
      options: ['Guadalajara', 'Mexico City', 'Monterrey', 'Puebla'],
      correct: 1,
      country: countries.find(c => c.name === 'Mexico')!
    },
    {
      type: 'capital' as const,
      question: 'What is the capital of Canada?',
      options: ['Toronto', 'Ottawa', 'Montreal', 'Vancouver'],
      correct: 1,
      country: countries.find(c => c.name === 'Canada')!
    },
    {
      type: 'fact' as const,
      question: 'Which country has the world\'s fastest internet?',
      options: ['Japan', 'South Korea', 'Singapore', 'Taiwan'],
      correct: 1,
      country: countries.find(c => c.name === 'South Korea')!
    },
    {
      type: 'fact' as const,
      question: 'Which country is famous for its bubble tea?',
      options: ['Japan', 'South Korea', 'Taiwan', 'Thailand'],
      correct: 2,
      country: countries.find(c => c.name === 'Taiwan')!
    },
    {
      type: 'fact' as const,
      question: 'Which country has the world\'s largest population?',
      options: ['India', 'China', 'United States', 'Indonesia'],
      correct: 1,
      country: countries.find(c => c.name === 'China')!
    },
    {
      type: 'fact' as const,
      question: 'Which country is the happiest in the world?',
      options: ['Norway', 'Denmark', 'Sweden', 'Finland'],
      correct: 1,
      country: countries.find(c => c.name === 'Denmark')!
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex);
    setShowExplanation(true);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      if (onSaveProgress) {
        onSaveProgress(score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0), questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const currentQ = questions[currentQuestion];

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
          <Globe className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-blue-800">World Countries Quiz</h1>
        </div>
        <p className="text-gray-700 text-lg">Learn about countries, capitals, and flags from around the world!</p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentQ.question}</h2>
            
            {/* Flag Display for Flag Questions */}
            {currentQ.type === 'flag' && (
              <div className="text-6xl mb-4">{currentQ.question.split('🇯🇵')[1] || currentQ.question.split('🇪🇸')[1] || currentQ.question.split('🇫🇷')[1] || currentQ.question.split('🇨🇭')[1]}</div>
            )}
          </div>

          {/* Answer Options */}
          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedAnswer === null
                    ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    : selectedAnswer === index
                    ? index === currentQ.correct
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : index === currentQ.correct
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-800">{option}</span>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-400">
              <div className="flex items-start">
                <div className="text-4xl mr-4">{currentQ.country.flag}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {selectedAnswer === currentQ.correct ? 'Correct!' : 'Incorrect!'}
                  </h3>
                  <p className="text-blue-700 mb-3">
                    {currentQ.type === 'capital' && `The capital of ${currentQ.country.name} is ${currentQ.country.capital}.`}
                    {currentQ.type === 'flag' && `This is the flag of ${currentQ.country.name}.`}
                    {currentQ.type === 'fact' && currentQ.country.funFact}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Capital:</strong> {currentQ.country.capital}
                    </div>
                    <div>
                      <strong>Continent:</strong> {currentQ.country.continent}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <strong>Famous Places:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentQ.country.landmarks.map((landmark, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <p className="text-xl text-gray-600 mb-6">
              You got {score} out of {questions.length} questions correct!
            </p>
            
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {Math.round((score / questions.length) * 100)}%
            </div>
            
            <div className="mb-8">
              {score === questions.length && (
                <div className="text-green-600 font-semibold text-lg">Perfect Score! 🌟</div>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <div className="text-green-600 font-semibold text-lg">Excellent! 🎉</div>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <div className="text-blue-600 font-semibold text-lg">Good Job! 👍</div>
              )}
              {score < questions.length * 0.6 && (
                <div className="text-orange-600 font-semibold text-lg">Keep Learning! 📚</div>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Social Studies
            </button>
          </div>
        </div>
      )}

      {/* Countries Explorer */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Countries</h2>
        <p className="text-gray-600 text-center mb-8">Click on any country to learn more about it!</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div
              key={country.name}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-blue-300"
              onClick={() => setSelectedCountry(country)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{country.flag}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{country.name}</h3>
                <p className="text-gray-600 text-sm mb-2">Capital: {country.capital}</p>
                <p className="text-gray-500 text-xs">{country.continent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Details Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{selectedCountry.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCountry.name}</h2>
                    <p className="text-gray-600">Capital: {selectedCountry.capital}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Continent:</strong> {selectedCountry.continent}
                  </div>
                  <div>
                    <strong>Capital:</strong> {selectedCountry.capital}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-800 mb-2">Fun Fact!</h3>
                  <p className="text-blue-700">{selectedCountry.funFact}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-800 mb-2">Famous Places</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.landmarks.map((landmark, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountriesQuiz; 