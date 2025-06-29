import React, { useState } from 'react';
import { Book, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';

interface DictionaryThesaurusProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

// Utility function to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const dictionaryWordsBase = [
  { word: 'Resilient', definition: 'Able to recover quickly from difficulties', synonyms: ['Strong', 'Tough', 'Durable'] },
  { word: 'Eloquent', definition: 'Fluent and persuasive in speaking or writing', synonyms: ['Articulate', 'Expressive', 'Fluent'] },
  { word: 'Meticulous', definition: 'Showing great attention to detail', synonyms: ['Careful', 'Thorough', 'Precise'] },
  { word: 'Astute', definition: 'Having or showing an ability to accurately assess situations', synonyms: ['Sharp', 'Clever', 'Perceptive'] },
  { word: 'Benevolent', definition: 'Well meaning and kindly', synonyms: ['Kind', 'Generous', 'Caring'] },
  { word: 'Diligent', definition: 'Having or showing care and conscientiousness in work', synonyms: ['Hardworking', 'Dedicated', 'Persistent'] },
  { word: 'Gregarious', definition: 'Fond of the company of others; sociable', synonyms: ['Sociable', 'Outgoing', 'Friendly'] },
  { word: 'Innovative', definition: 'Featuring new methods; advanced and original', synonyms: ['Creative', 'Original', 'Inventive'] },
  { word: 'Jubilant', definition: 'Feeling or expressing great happiness and triumph', synonyms: ['Joyful', 'Elated', 'Ecstatic'] },
  { word: 'Luminous', definition: 'Giving off light; bright or shining', synonyms: ['Bright', 'Glowing', 'Radiant'] },
  { word: 'Magnificent', definition: 'Impressively beautiful, elaborate, or extravagant', synonyms: ['Splendid', 'Grand', 'Spectacular'] },
  { word: 'Nostalgic', definition: 'Feeling a sentimental longing for the past', synonyms: ['Wistful', 'Sentimental', 'Reminiscent'] },
  { word: 'Optimistic', definition: 'Hopeful and confident about the future', synonyms: ['Hopeful', 'Positive', 'Confident'] },
  { word: 'Persistent', definition: 'Continuing firmly despite difficulty or opposition', synonyms: ['Determined', 'Tenacious', 'Steadfast'] },
  { word: 'Quintessential', definition: 'Representing the most perfect example of a quality', synonyms: ['Perfect', 'Ideal', 'Classic'] },
  { word: 'Radiant', definition: 'Sending out light; shining or glowing brightly', synonyms: ['Glowing', 'Brilliant', 'Luminous'] },
  { word: 'Serene', definition: 'Calm, peaceful, and untroubled', synonyms: ['Peaceful', 'Tranquil', 'Calm'] },
  { word: 'Tenacious', definition: 'Tending to keep a firm hold; persistent', synonyms: ['Persistent', 'Determined', 'Stubborn'] },
  { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere', synonyms: ['Everywhere', 'Common', 'Universal'] },
  { word: 'Vivacious', definition: 'Attractively lively and animated', synonyms: ['Lively', 'Energetic', 'Spirited'] }
];

const DictionaryThesaurus: React.FC<DictionaryThesaurusProps> = ({ onBack, onSaveProgress }) => {
  const [currentView, setCurrentView] = useState<'intro' | 'practice'>('intro');
  const [dictionaryWords] = useState(() => shuffleArray(dictionaryWordsBase));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = dictionaryWords[currentWordIndex];
  const allOptions = [...currentWord.synonyms, 'Confused', 'Weak', 'Boring', 'Lazy', 'Rude', 'Dull'].sort(() => Math.random() - 0.5).slice(0, 4);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (currentWord.synonyms.includes(answer)) {
      setScore(score + 1);
      setShowCelebration(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
    
    setTimeout(() => {
      setAnsweredQuestions(answeredQuestions + 1);
      if (currentWordIndex < dictionaryWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentView('intro');
    setCurrentWordIndex(0);
    setScore(0);
    setAnsweredQuestions(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowCelebration(false);
  };

  if (currentView === 'intro') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Reading
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Book className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Dictionary & Thesaurus</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">What is a Dictionary?</h3>
              <p className="text-gray-700">
                A dictionary is a reference book that contains words listed alphabetically with their meanings, 
                pronunciations, and sometimes examples of how to use them. It helps you understand what words mean!
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">What is a Thesaurus?</h3>
              <p className="text-gray-700">
                A thesaurus is a reference book that lists words with similar meanings (synonyms) and opposite 
                meanings (antonyms). It helps you find different words to express the same idea and make your 
                writing more interesting!
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Why Use These Tools?</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Learn new vocabulary words and their meanings</li>
                <li>• Find more interesting words to use in your writing</li>
                <li>• Improve your reading comprehension</li>
                <li>• Express yourself more clearly and creatively</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">📚 Fun Fact!</h3>
              <p className="text-gray-700">
                This quiz has <strong>{dictionaryWords.length} different vocabulary words</strong> that appear in 
                random order each time you play! Challenge yourself to learn them all!
              </p>
            </div>

            <button
              onClick={() => setCurrentView('practice')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Practice Quiz ({dictionaryWords.length} Words)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (answeredQuestions === dictionaryWords.length) {
    // Save progress when quiz is completed
    if (onSaveProgress) {
      onSaveProgress(score, dictionaryWords.length);
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Reading
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Vocabulary Master!</h2>
          <p className="text-xl text-gray-600 mb-6">
            You scored {score} out of {dictionaryWords.length}!
          </p>
          <div className="mb-6">
            <div className="text-lg font-semibold text-blue-600">
              Accuracy: {Math.round((score / dictionaryWords.length) * 100)}%
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again with New Random Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Reading
      </button>

      <CelebrationModal 
        show={showCelebration} 
        onClose={() => setShowCelebration(false)}
        type="star"
        message="Perfect Word Choice!"
        subMessage="Vocabulary Master!"
      />

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Find the Synonym</h2>
          <div className="text-sm text-gray-600">
            Question {currentWordIndex + 1} of {dictionaryWords.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">{currentWord.word}</h3>
            <p className="text-gray-700 text-lg">{currentWord.definition}</p>
          </div>

          <p className="text-lg font-semibold text-gray-800 mb-4">
            Which word means the same as "{currentWord.word}"?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {allOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all ${
                  showResult
                    ? currentWord.synonyms.includes(option)
                      ? 'bg-green-100 border-green-500 text-green-800'
                      : selectedAnswer === option
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-500'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{option}</span>
                  {showResult && currentWord.synonyms.includes(option) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && selectedAnswer === option && !currentWord.synonyms.includes(option) && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-800 mb-2">All Synonyms for "{currentWord.word}":</h4>
              <p className="text-yellow-700">
                {currentWord.synonyms.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentWordIndex + 1) / dictionaryWords.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600">
          Progress: {currentWordIndex + 1} of {dictionaryWords.length} words
        </p>
      </div>
    </div>
  );
};

export default DictionaryThesaurus;