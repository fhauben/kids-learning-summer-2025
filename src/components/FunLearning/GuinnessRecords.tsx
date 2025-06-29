import React, { useState } from 'react';
import { ArrowLeft, Trophy, Star, Zap, Globe, Clock, Users, Heart } from 'lucide-react';

interface GuinnessRecordsProps {
  onBack: () => void;
}

interface Record {
  id: string;
  title: string;
  record: string;
  description: string;
  funFact: string;
  category: 'animals' | 'food' | 'people' | 'nature' | 'technology' | 'sports';
  icon: string;
  year?: string;
}

const records: Record[] = [
  {
    id: '1',
    title: 'Tallest Dog Ever',
    record: '44 inches (111.8 cm) tall',
    description: 'Zeus, a Great Dane, was the tallest dog ever recorded!',
    funFact: 'Zeus was so tall he could drink from the kitchen faucet without standing on his hind legs!',
    category: 'animals',
    icon: '🐕',
    year: '2011'
  },
  {
    id: '2',
    title: 'Most Pizza Eaten in 30 Seconds',
    record: '8 slices',
    description: 'Kelvin Medina ate 8 slices of pizza in just 30 seconds!',
    funFact: 'That\'s faster than most people can even pick up a slice!',
    category: 'food',
    icon: '🍕',
    year: '2019'
  },
  {
    id: '3',
    title: 'Youngest Person to Visit All Countries',
    record: '21 years old',
    description: 'Lexie Alford visited all 196 countries by age 21!',
    funFact: 'She started traveling when she was just 12 years old with her family!',
    category: 'people',
    icon: '✈️',
    year: '2019'
  },
  {
    id: '4',
    title: 'Largest Snowflake',
    record: '15 inches wide',
    description: 'The largest snowflake ever recorded was 15 inches wide and 8 inches thick!',
    funFact: 'It was bigger than a dinner plate and fell in Montana in 1887!',
    category: 'nature',
    icon: '❄️',
    year: '1887'
  },
  {
    id: '5',
    title: 'Most Socks Put On One Foot',
    record: '28 socks',
    description: 'Pavol Durdik put 28 socks on one foot in 30 seconds!',
    funFact: 'His foot was so big with all those socks, he could barely fit it in a shoe!',
    category: 'people',
    icon: '🧦',
    year: '2017'
  },
  {
    id: '6',
    title: 'Fastest Time to Eat a Bowl of Pasta',
    record: '26.69 seconds',
    description: 'Michelle Lesco ate a bowl of pasta in under 27 seconds!',
    funFact: 'She barely had time to taste it - that\'s super speedy slurping!',
    category: 'food',
    icon: '🍝',
    year: '2017'
  },
  {
    id: '7',
    title: 'Most Toilet Rolls Balanced on Head',
    record: '12 toilet rolls',
    description: 'Silvio Sabba balanced 12 toilet rolls on his head while walking!',
    funFact: 'He had to walk very carefully so they wouldn\'t fall - like a toilet paper tower!',
    category: 'people',
    icon: '🧻',
    year: '2020'
  },
  {
    id: '8',
    title: 'Longest Cat Ever',
    record: '48.5 inches long',
    description: 'Mymains Stewart Gilligan was the longest domestic cat ever!',
    funFact: 'He was longer than a baseball bat and loved to stretch out on the couch!',
    category: 'animals',
    icon: '🐱',
    year: '2010'
  },
  {
    id: '9',
    title: 'Most Marshmallows Caught in Mouth',
    record: '25 marshmallows',
    description: 'Anthony Falzon caught 25 marshmallows in his mouth in 1 minute!',
    funFact: 'That\'s like catching a marshmallow every 2.4 seconds - amazing aim!',
    category: 'food',
    icon: '🍡',
    year: '2014'
  },
  {
    id: '10',
    title: 'Smallest Dog Living',
    record: '3.8 inches tall',
    description: 'Pearl, a Chihuahua, is only 3.8 inches tall and weighs 1.22 pounds!',
    funFact: 'She\'s so small she could fit in a teacup and loves to ride in purses!',
    category: 'animals',
    icon: '🐕',
    year: '2022'
  },
  {
    id: '11',
    title: 'Most Juice Boxes Opened in 1 Minute',
    record: '27 juice boxes',
    description: 'Dinesh Shivnath Upadhyaya opened 27 juice boxes in just 1 minute!',
    funFact: 'That\'s almost one juice box every 2 seconds - super speedy sipping prep!',
    category: 'food',
    icon: '🧃',
    year: '2019'
  },
  {
    id: '12',
    title: 'Most Hula Hoops Spun Simultaneously',
    record: '200 hula hoops',
    description: 'Marawa Ibrahim spun 200 hula hoops at the same time!',
    funFact: 'She looked like a human tornado with all those colorful hoops spinning around her!',
    category: 'sports',
    icon: '🤸',
    year: '2015'
  }
];

const GuinnessRecords: React.FC<GuinnessRecordsProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);

  const categories = [
    { id: 'all', name: 'All Records', icon: Trophy, color: 'text-yellow-600 bg-yellow-50' },
    { id: 'animals', name: 'Animals', icon: Heart, color: 'text-pink-600 bg-pink-50' },
    { id: 'food', name: 'Food', icon: Star, color: 'text-orange-600 bg-orange-50' },
    { id: 'people', name: 'People', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { id: 'nature', name: 'Nature', icon: Globe, color: 'text-green-600 bg-green-50' },
    { id: 'sports', name: 'Sports', icon: Zap, color: 'text-purple-600 bg-purple-50' }
  ];

  const filteredRecords = selectedCategory === 'all' 
    ? records 
    : records.filter(record => record.category === selectedCategory);

  const currentRecord = filteredRecords[currentRecordIndex];

  const nextRecord = () => {
    setCurrentRecordIndex((prev) => (prev + 1) % filteredRecords.length);
  };

  const prevRecord = () => {
    setCurrentRecordIndex((prev) => (prev - 1 + filteredRecords.length) % filteredRecords.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'animals': return 'border-pink-400 bg-pink-50';
      case 'food': return 'border-orange-400 bg-orange-50';
      case 'people': return 'border-blue-400 bg-blue-50';
      case 'nature': return 'border-green-400 bg-green-50';
      case 'sports': return 'border-purple-400 bg-purple-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Learning
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Amazing World Records</h1>
            <Trophy className="w-12 h-12 text-yellow-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600">
            Discover incredible records from the Guinness Book of World Records!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentRecordIndex(0);
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? category.color + ' border-2'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Record Display */}
        {currentRecord && (
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-xl p-8 border-l-8 ${getCategoryColor(currentRecord.category)} mb-6`}>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{currentRecord.icon}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentRecord.title}
                </h2>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {currentRecord.record}
                </div>
                {currentRecord.year && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Record set in {currentRecord.year}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 What happened?</h3>
                  <p className="text-gray-700 text-lg">{currentRecord.description}</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">🤯 Fun Fact!</h3>
                  <p className="text-yellow-700 text-lg">{currentRecord.funFact}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevRecord}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ← Previous Record
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  Record {currentRecordIndex + 1} of {filteredRecords.length}
                </div>
                <div className="flex space-x-2">
                  {filteredRecords.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentRecordIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentRecordIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextRecord}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Next Record →
              </button>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">🌟 Did You Know?</h3>
          <p className="text-blue-700">
            The Guinness Book of World Records started in 1955 and has recorded over 40,000 records! 
            People from all around the world try to break records every day. Maybe you could set a record too someday!
          </p>
        </div>

        {/* Challenge Section */}
        <div className="mt-6 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🏆 Try This at Home!</h3>
          <div className="grid md:grid-cols-2 gap-4 text-green-700">
            <div>
              <p className="mb-2">• How many jumping jacks can you do in 1 minute?</p>
              <p className="mb-2">• How long can you balance on one foot?</p>
              <p>• How many books can you stack before they fall?</p>
            </div>
            <div>
              <p className="mb-2">• How fast can you say the alphabet?</p>
              <p className="mb-2">• How many times can you write your name in 1 minute?</p>
              <p>• How many paper airplanes can you make in 5 minutes?</p>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-4 font-semibold">
            Remember: Always be safe and have an adult help you with any challenges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuinnessRecords;