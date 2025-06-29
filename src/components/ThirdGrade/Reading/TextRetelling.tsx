import React, { useState } from 'react';
import { BookOpen, ArrowLeft, CheckCircle } from 'lucide-react';

interface TextRetellingProps {
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

const storiesBase = [
  {
    title: "The Little Seed",
    text: "Once upon a time, there was a tiny seed buried deep in the dark soil. The seed was scared because it was all alone and couldn't see the sun. Days passed, and rain began to fall. The seed drank the water and slowly began to grow. First, a small green shoot pushed through the soil. Then leaves appeared, reaching toward the warm sunlight. The little seed had become a beautiful flower, bringing joy to everyone who saw it.",
    questions: [
      { question: "Where was the seed at the beginning?", answer: "Buried in the soil" },
      { question: "What helped the seed grow?", answer: "Rain/water and sunlight" },
      { question: "What did the seed become?", answer: "A beautiful flower" },
      { question: "How did the seed feel at first?", answer: "Scared and alone" }
    ]
  },
  {
    title: "The Helpful Squirrel",
    text: "Sally the squirrel lived in a big oak tree. Every autumn, she would collect acorns to store for winter. One day, she noticed that her neighbor, Oliver the owl, looked very sad. 'What's wrong?' asked Sally. Oliver explained that he had hurt his wing and couldn't hunt for food. Without hesitation, Sally shared her acorns with Oliver every day until his wing healed. When spring came, Oliver thanked Sally by helping her build a new nest. They became the best of friends.",
    questions: [
      { question: "Who are the main characters?", answer: "Sally the squirrel and Oliver the owl" },
      { question: "What was wrong with Oliver?", answer: "He hurt his wing" },
      { question: "How did Sally help Oliver?", answer: "She shared her acorns" },
      { question: "What happened when Oliver's wing healed?", answer: "He helped Sally build a nest and they became friends" }
    ]
  },
  {
    title: "The Magic Paintbrush",
    text: "Emma found an old paintbrush in her grandmother's attic. When she dipped it in paint and drew a butterfly, something amazing happened - the butterfly came to life and flew around her room! Emma was so excited that she painted a garden full of flowers, and they all bloomed instantly. She painted a small pond, and real fish began swimming in it. Emma realized she had found a magic paintbrush that could make her drawings come alive. She decided to use it to help others by painting things they needed.",
    questions: [
      { question: "Where did Emma find the paintbrush?", answer: "In her grandmother's attic" },
      { question: "What happened when Emma painted a butterfly?", answer: "It came to life and flew around" },
      { question: "What made the paintbrush special?", answer: "It was magic and made drawings come alive" },
      { question: "How did Emma decide to use the paintbrush?", answer: "To help others by painting things they needed" }
    ]
  },
  {
    title: "The Brave Little Mouse",
    text: "Max was the smallest mouse in his family, and he was afraid of almost everything. One day, a big cat got stuck in the barn and couldn't get out. All the other animals were too scared to help. Max knew he was small enough to squeeze through the tiny gap in the barn door. Even though he was frightened, Max crept into the barn and gnawed through the rope that was trapping the cat. The cat was so grateful that she promised never to chase mice again. Max learned that being small could be an advantage, and that courage comes in all sizes.",
    questions: [
      { question: "What was Max afraid of?", answer: "Almost everything" },
      { question: "What problem did the cat have?", answer: "She got stuck in the barn" },
      { question: "How was Max able to help?", answer: "He was small enough to squeeze through the gap" },
      { question: "What did Max learn?", answer: "Being small could be an advantage and courage comes in all sizes" }
    ]
  },
  {
    title: "The Singing Tree",
    text: "In the middle of the forest stood a very special tree that could sing beautiful songs. Every morning, the tree would wake up the forest with its gentle melodies. The animals loved to gather around and listen. One day, the tree stopped singing because it felt lonely - no one ever sang back to it. A little girl named Lily discovered the sad tree and began to sing with it every day after school. Soon, all the forest animals joined in, creating the most beautiful choir the forest had ever heard. The tree was never lonely again.",
    questions: [
      { question: "What was special about the tree?", answer: "It could sing beautiful songs" },
      { question: "Why did the tree stop singing?", answer: "It felt lonely because no one sang back" },
      { question: "Who helped the tree feel better?", answer: "A little girl named Lily" },
      { question: "What happened at the end?", answer: "All the animals joined in and created a beautiful choir" }
    ]
  },
  {
    title: "The Lost Puppy",
    text: "Benny was a playful golden retriever puppy who loved to explore. One sunny afternoon, he wandered too far from home while chasing a colorful butterfly. When he looked around, nothing seemed familiar. Benny was lost and scared. He sat down and began to howl sadly. A kind mail carrier heard his cries and recognized Benny from his daily route. The mail carrier gently picked up Benny and carried him home to his worried family. Benny learned to stay closer to home, but he never stopped being curious about the world around him.",
    questions: [
      { question: "What kind of dog was Benny?", answer: "A golden retriever puppy" },
      { question: "How did Benny get lost?", answer: "He wandered too far while chasing a butterfly" },
      { question: "Who helped Benny get home?", answer: "A kind mail carrier" },
      { question: "What did Benny learn?", answer: "To stay closer to home" }
    ]
  }
];

const TextRetelling: React.FC<TextRetellingProps> = ({ onBack, onSaveProgress }) => {
  const [stories] = useState(() => shuffleArray(storiesBase));
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<'read' | 'retell' | 'questions'>('read');
  const [userRetelling, setUserRetelling] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [totalScore, setTotalScore] = useState(0);

  const currentStory = stories[currentStoryIndex];
  const currentQuestion = currentStory.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setUserAnswers([...userAnswers, currentAnswer]);
    setCurrentAnswer('');
    
    // Simple scoring: give a point if they wrote something meaningful (more than 3 characters)
    if (currentAnswer.trim().length > 3) {
      setTotalScore(totalScore + 1);
    }
    
    if (currentQuestionIndex < currentStory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next story or finish
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        setCurrentStep('read');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setUserRetelling('');
      } else {
        // Finished all stories - save progress
        const totalQuestions = stories.reduce((sum, story) => sum + story.questions.length, 0);
        if (onSaveProgress) {
          onSaveProgress(totalScore, totalQuestions);
        }
        resetActivity();
      }
    }
  };

  const resetActivity = () => {
    setCurrentStoryIndex(0);
    setCurrentStep('read');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setUserRetelling('');
    setCurrentAnswer('');
    setTotalScore(0);
  };

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Text Retelling</h2>
          </div>
          <div className="text-sm text-gray-600">
            Story {currentStoryIndex + 1} of {stories.length}
          </div>
        </div>

        {currentStep === 'read' && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentStory.title}</h3>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {currentStory.text}
              </p>
            </div>
            <button
              onClick={() => setCurrentStep('retell')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Retell the Story
            </button>
          </div>
        )}

        {currentStep === 'retell' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Now, retell "{currentStory.title}" in your own words
            </h3>
            <p className="text-gray-600 mb-4">
              Try to include the main characters, what happened, and how the story ended.
            </p>
            <textarea
              value={userRetelling}
              onChange={(e) => setUserRetelling(e.target.value)}
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              placeholder="Start retelling the story here..."
            />
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setCurrentStep('read')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Read Again
              </button>
              <button
                onClick={() => setCurrentStep('questions')}
                disabled={userRetelling.trim().length < 10}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Answer Questions
              </button>
            </div>
          </div>
        )}

        {currentStep === 'questions' && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Question {currentQuestionIndex + 1} of {currentStory.questions.length}
                </h3>
                <span className="text-sm text-gray-600">About "{currentStory.title}"</span>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <p className="text-lg text-gray-800 font-semibold">
                  {currentQuestion.question}
                </p>
              </div>

              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                className="w-full h-24 p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Type your answer here..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentStep('retell')}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Retelling
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentAnswer.trim().length < 3}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {currentQuestionIndex < currentStory.questions.length - 1 ? 'Next Question' : 
                 currentStoryIndex < stories.length - 1 ? 'Next Story' : 'Finish'}
              </button>
            </div>

            {currentQuestionIndex === 0 && (
              <button
                onClick={() => setCurrentStep('read')}
                className="w-full mt-4 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Need to read the story again?
              </button>
            )}
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-8">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStoryIndex + 1) / stories.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600">
            Story Progress: {currentStoryIndex + 1} of {stories.length} stories
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={resetActivity}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            Start Over with New Random Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextRetelling;