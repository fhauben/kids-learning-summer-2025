import React, { useState } from 'react';
import { ArrowLeft, Map, Leaf, Sun, Snowflake, Droplets, Mountain, Globe, Target, CheckCircle, XCircle } from 'lucide-react';
import { AnimalHabitat, animalHabitats, getRandomQuestions } from '../../../data/scienceData';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import AnimalWorldMap from './AnimalWorldMap';

interface AnimalHabitatsProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface Animal {
  name: string;
  habitat: string;
  image: string;
  description: string;
}

const AnimalHabitats: React.FC<AnimalHabitatsProps> = ({ onBack, onSaveProgress }) => {
  const [currentView, setCurrentView] = useState<'main' | 'explorer' | 'matching' | 'quiz' | 'map'>('main');
  const [selectedHabitat, setSelectedHabitat] = useState<AnimalHabitat | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [matchingScore, setMatchingScore] = useState(0);
  const [matchedAnimals, setMatchedAnimals] = useState<string[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  
  const { playCorrect, playIncorrect } = useSoundEffects();

  const questions = getRandomQuestions('animal-habitats', 5);

  // Sample animals for matching game
  const animals: Animal[] = [
    { name: 'Camel', habitat: 'Desert', image: '🐪', description: 'Stores water in humps' },
    { name: 'Polar Bear', habitat: 'Arctic', image: '🐻‍❄️', description: 'Thick fur and blubber' },
    { name: 'Monkey', habitat: 'Rainforest', image: '🐒', description: 'Lives in trees' },
    { name: 'Lion', habitat: 'Grassland', image: '🦁', description: 'Lives in prides' },
    { name: 'Dolphin', habitat: 'Ocean', image: '🐬', description: 'Swims in pods' },
    { name: 'Cactus Wren', habitat: 'Desert', image: '🐦', description: 'Builds nests in cacti' },
    { name: 'Arctic Fox', habitat: 'Arctic', image: '🦊', description: 'White camouflage' },
    { name: 'Tree Frog', habitat: 'Rainforest', image: '🐸', description: 'Bright colors' },
    { name: 'Elephant', habitat: 'Grassland', image: '🐘', description: 'Large ears for cooling' },
    { name: 'Shark', habitat: 'Ocean', image: '🦈', description: 'Sharp teeth' }
  ];

  // Animal locations for the world map
  const animalLocations = [
    { name: 'African Elephant', position: { lat: -1.2921, lng: 36.8219 }, habitat: 'Grassland', emoji: '🐘' },
    { name: 'Lion', position: { lat: -2.0469, lng: 34.6857 }, habitat: 'Grassland', emoji: '🦁' },
    { name: 'Polar Bear', position: { lat: 78.2208, lng: -15.6406 }, habitat: 'Arctic', emoji: '🐻‍❄️' },
    { name: 'Arctic Fox', position: { lat: 67.5706, lng: -133.4167 }, habitat: 'Arctic', emoji: '🦊' },
    { name: 'Camel', position: { lat: 24.7136, lng: 46.6753 }, habitat: 'Desert', emoji: '🐪' },
    { name: 'Cactus Wren', position: { lat: 33.7490, lng: -112.0740 }, habitat: 'Desert', emoji: '🐦' },
    { name: 'Monkey', position: { lat: -3.4653, lng: -58.3804 }, habitat: 'Rainforest', emoji: '🐒' },
    { name: 'Tree Frog', position: { lat: 1.3521, lng: 103.8198 }, habitat: 'Rainforest', emoji: '🐸' },
    { name: 'Dolphin', position: { lat: 25.7617, lng: -80.1918 }, habitat: 'Ocean', emoji: '🐬' },
    { name: 'Shark', position: { lat: -33.8688, lng: 151.2093 }, habitat: 'Ocean', emoji: '🦈' }
  ];

  // Animal summaries and fun facts
  const animalDetails = {
    'African Elephant': {
      summary: 'The African elephant is the largest land animal on Earth. It lives in the savanna, where it uses its long trunk to grab food and water. Elephants travel in family groups and are very smart!',
      funFact: 'Elephants use their big ears to keep cool in the hot sun.'
    },
    'Lion': {
      summary: 'Lions are powerful big cats that live in grasslands called savannas. They hunt in groups called prides and are known as the "King of the Jungle" even though they don\'t live in jungles!',
      funFact: 'A lion\'s roar can be heard from 5 miles away!'
    },
    'Polar Bear': {
      summary: 'Polar bears live in the icy Arctic. They are strong swimmers and use their thick white fur to stay warm. Polar bears hunt for seals on the ice.',
      funFact: 'A polar bear\'s fur looks white, but it\'s actually clear! Their skin underneath is black to soak up the sun\'s warmth.'
    },
    'Arctic Fox': {
      summary: 'Arctic foxes live in the cold Arctic regions. They have thick white fur in winter and brown fur in summer to blend in with their surroundings.',
      funFact: 'Arctic foxes can survive temperatures as low as -70°F!'
    },
    'Camel': {
      summary: 'Camels are desert animals that can go for days without water. They store fat in their humps and can carry heavy loads across hot deserts.',
      funFact: 'Camels can drink up to 40 gallons of water in just 10 minutes!'
    },
    'Cactus Wren': {
      summary: 'Cactus wrens are small birds that live in deserts. They build their nests inside cacti to stay safe from predators.',
      funFact: 'The cactus wren is the state bird of Arizona!'
    },
    'Monkey': {
      summary: 'Monkeys are smart animals that live in rainforests. They use their hands and feet to climb trees and find food like fruits and insects.',
      funFact: 'Some monkeys can use tools like sticks to get food!'
    },
    'Tree Frog': {
      summary: 'Tree frogs are colorful frogs that live in rainforests. They have sticky toes that help them climb trees and leaves.',
      funFact: 'Some tree frogs can change color to match their surroundings!'
    },
    'Dolphin': {
      summary: 'Dolphins are intelligent sea animals that live in oceans around the world. They swim in groups called pods and communicate with clicks and whistles.',
      funFact: 'Dolphins can jump up to 20 feet out of the water!'
    },
    'Shark': {
      summary: 'Sharks are powerful ocean predators that have been around for millions of years. They have sharp teeth and excellent senses to find their prey.',
      funFact: 'Sharks can smell a drop of blood from a mile away!'
    }
  };

  const habitatIcons = {
    'Desert': { icon: '🏜️', color: 'border-l-orange-500', bgColor: 'bg-orange-50' },
    'Rainforest': { icon: '🌴', color: 'border-l-green-500', bgColor: 'bg-green-50' },
    'Ocean': { icon: '🌊', color: 'border-l-blue-500', bgColor: 'bg-blue-50' },
    'Arctic': { icon: '❄️', color: 'border-l-cyan-500', bgColor: 'bg-cyan-50' },
    'Grassland': { icon: '🌾', color: 'border-l-yellow-500', bgColor: 'bg-yellow-50' }
  };

  const startExplorer = (habitat: AnimalHabitat) => {
    setSelectedHabitat(habitat);
    setCurrentView('explorer');
  };

  const startMatching = () => {
    setCurrentView('matching');
    setMatchingScore(0);
    setMatchedAnimals([]);
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const startMap = () => {
    setCurrentView('map');
    setSelectedAnimal(null);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const question = questions[currentQuestion];
    const correct = answer === question.answer;
    setIsCorrect(correct);
    
    if (correct) {
      playCorrect();
      setScore(score + 1);
    } else {
      playIncorrect();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResults(true);
        if (onSaveProgress) {
          onSaveProgress(score + (correct ? 1 : 0), questions.length);
        }
      }
    }, 1500);
  };

  const handleAnimalMatch = (animalName: string, habitatName: string) => {
    const animal = animals.find(a => a.name === animalName);
    if (animal && animal.habitat === habitatName) {
      if (!matchedAnimals.includes(animalName)) {
        playCorrect();
        setMatchingScore(matchingScore + 1);
        setMatchedAnimals([...matchedAnimals, animalName]);
      }
    } else {
      playIncorrect();
    }
  };

  const handleAnimalClick = (animalName: string) => {
    setSelectedAnimal(animalName);
  };

  const getNextAnimal = () => {
    const currentIndex = animalLocations.findIndex(animal => animal.name === selectedAnimal);
    const nextIndex = (currentIndex + 1) % animalLocations.length;
    setSelectedAnimal(animalLocations[nextIndex].name);
  };

  const getPreviousAnimal = () => {
    const currentIndex = animalLocations.findIndex(animal => animal.name === selectedAnimal);
    const prevIndex = currentIndex === 0 ? animalLocations.length - 1 : currentIndex - 1;
    setSelectedAnimal(animalLocations[prevIndex].name);
  };

  const getHabitatAnimals = (habitatName: string) => {
    return animals.filter(animal => animal.habitat === habitatName);
  };

  const getHabitatInfo = (habitat: AnimalHabitat) => {
    const icon = habitatIcons[habitat.name as keyof typeof habitatIcons];
    
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <span className="text-6xl mr-4">{icon.icon}</span>
          <div>
            <h3 className="text-3xl font-bold text-gray-800">{habitat.name}</h3>
            <p className="text-gray-600 text-lg">{habitat.description}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2" />
              Climate
            </h4>
            <p className="text-gray-600 mb-4">{habitat.climate}</p>
            
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Leaf className="w-5 h-5 mr-2" />
              Plants
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {habitat.plants.map((plant, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {plant}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Animals
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {habitat.animals.map((animal, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {animal}
                </span>
              ))}
            </div>
            
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Adaptations
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {habitat.adaptations.map((adaptation, index) => (
                <li key={index}>{adaptation}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to 3rd Grade Science
      </button>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={score}
        total={questions.length}
        message="Habitat Explorer!"
      />

      {currentView === 'main' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Animal Habitats</h1>
            </div>
            <p className="text-gray-600">Explore different ecosystems and learn about the animals that live there!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {animalHabitats.map((habitat) => {
              const icon = habitatIcons[habitat.name as keyof typeof habitatIcons];
              return (
                <div
                  key={habitat.name}
                  className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${icon.color} hover:shadow-xl transition-all duration-200 cursor-pointer`}
                  onClick={() => startExplorer(habitat)}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{icon.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{habitat.name}</h3>
                    <p className="text-gray-600 mb-4">{habitat.description}</p>
                    <div className="text-sm text-gray-500 mb-4">
                      {habitat.animals.length} animals • {habitat.plants.length} plants
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Explore {habitat.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startMatching}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Animal Matching Game
            </button>
            <button
              onClick={startQuiz}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
            <button
              onClick={startMap}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center"
            >
              <Map className="w-5 h-5 mr-2" />
              World Map
            </button>
          </div>
        </div>
      )}

      {currentView === 'explorer' && selectedHabitat && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Habitat Explorer</h2>
              <p className="text-gray-600">Learn about the {selectedHabitat.name.toLowerCase()} ecosystem</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={startMap}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center text-sm"
              >
                <Map className="w-4 h-4 mr-2" />
                View on World Map
              </button>
              <button
                onClick={() => setCurrentView('main')}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>

          {getHabitatInfo(selectedHabitat)}

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Animals in this Habitat</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getHabitatAnimals(selectedHabitat.name).map((animal) => {
                // Find the corresponding animal in animalLocations with flexible matching
                const mapAnimal = animalLocations.find(a => 
                  a.name === animal.name || 
                  a.name.includes(animal.name) || 
                  animal.name.includes(a.name.split(' ')[0])
                );
                return (
                  <div 
                    key={animal.name} 
                    className={`border rounded-lg p-4 text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-300 ${
                      mapAnimal ? 'hover:bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      if (mapAnimal) {
                        setSelectedAnimal(mapAnimal.name); // Use the full name from animalLocations
                        setCurrentView('map');
                      }
                    }}
                  >
                    <div className="text-4xl mb-2">{animal.image}</div>
                    <h4 className="font-semibold text-gray-800">{animal.name}</h4>
                    <p className="text-sm text-gray-600">{animal.description}</p>
                    {mapAnimal && (
                      <div className="mt-2">
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Click to see on map
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {currentView === 'matching' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Animal Matching Game</h2>
            <p className="text-gray-600 mb-4">Match animals to their correct habitats!</p>
            <div className="text-lg font-semibold text-blue-600">
              Score: {matchingScore} / {animals.length}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Animals</h3>
              <div className="space-y-3">
                {animals.map((animal) => (
                  <div
                    key={animal.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      matchedAnimals.includes(animal.name)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => {
                      // This will be handled by habitat selection
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{animal.image}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{animal.name}</div>
                        <div className="text-sm text-gray-600">{animal.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Habitats</h3>
              <div className="space-y-3">
                {animalHabitats.map((habitat) => {
                  const icon = habitatIcons[habitat.name as keyof typeof habitatIcons];
                  return (
                    <div
                      key={habitat.name}
                      className="p-4 border-2 border-gray-300 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{icon.icon}</span>
                        <div className="font-semibold text-gray-800">{habitat.name}</div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{habitat.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {getHabitatAnimals(habitat.name).map((animal) => (
                          <button
                            key={animal.name}
                            onClick={() => handleAnimalMatch(animal.name, habitat.name)}
                            disabled={matchedAnimals.includes(animal.name)}
                            className={`px-3 py-1 rounded-full text-sm transition-all ${
                              matchedAnimals.includes(animal.name)
                                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            }`}
                          >
                            {animal.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentView('main')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Back to Main
            </button>
          </div>
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Animal Habitats Quiz</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
          </div>

          {!showResults ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{option}</span>
                      {selectedAnswer === option && (
                        isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer && (
                <div className={`mt-6 p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Complete!</h3>
              <p className="text-xl text-gray-600 mb-6">
                You got {score} out of {questions.length} questions correct!
              </p>
              
              {score >= 4 && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowCelebration(true)}
                    className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                  >
                    🏆 Celebrate!
                  </button>
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={startQuiz}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setCurrentView('main')}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Back to Main
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'map' && (
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => setCurrentView('main')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Animal Habitats
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Animal World Map</h2>
            <p className="text-gray-600 mb-4">Click on an animal to learn more about its habitat!</p>
          </div>

          <AnimalWorldMap
            animalLocations={animalLocations}
            selectedAnimal={selectedAnimal}
            animalDetails={animalDetails}
            onAnimalClick={handleAnimalClick}
          />
        </div>
      )}
    </div>
  );
};

export default AnimalHabitats; 