import React from 'react';

interface CelebrationModalProps {
  show: boolean;
  onClose: () => void;
  type?: 'unicorn' | 'donkey' | 'bunny' | 'narwhal' | 'rocket' | 'star';
  message?: string;
  subMessage?: string;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  show, 
  onClose, 
  type = 'star',
  message = 'CORRECT!',
  subMessage = 'Great Job!'
}) => {
  if (!show) return null;

  const getAnimationContent = () => {
    switch (type) {
      case 'unicorn':
        return {
          emoji: '🦄',
          colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
          trailColor: 'purple',
          message: '🌟 Magical! 🌟'
        };
      case 'donkey':
        return {
          emoji: '🫏',
          colors: ['green'],
          trailColor: 'green',
          message: '🎉 CORRECT! 🎉'
        };
      case 'bunny':
        return {
          emoji: '🐰',
          colors: ['purple', 'pink'],
          trailColor: 'purple',
          message: '⏰ PERFECT TIME! ⏰'
        };
      case 'narwhal':
        return {
          emoji: '🦄',
          colors: ['blue', 'cyan', 'teal'],
          trailColor: 'blue',
          message: '🌊 Narwhal-icious! 🌊'
        };
      case 'rocket':
        return {
          emoji: '🚀',
          colors: ['red', 'orange', 'yellow'],
          trailColor: 'orange',
          message: '🚀 Blast Off! 🚀'
        };
      default:
        return {
          emoji: '⭐',
          colors: ['yellow', 'gold'],
          trailColor: 'yellow',
          message: '⭐ Amazing! ⭐'
        };
    }
  };

  const animation = getAnimationContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Main emoji animation */}
        <div className="animate-bounce">
          <div className="text-9xl animate-pulse filter drop-shadow-lg">{animation.emoji}</div>
        </div>
        
        {/* Flying motion trail */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`w-40 h-2 bg-gradient-to-r from-transparent via-${animation.trailColor}-400 to-transparent animate-pulse opacity-60`}></div>
          <div className={`w-32 h-1 bg-gradient-to-r from-transparent via-${animation.trailColor}-300 to-transparent animate-pulse opacity-40 mt-1`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`w-24 h-1 bg-gradient-to-r from-transparent via-${animation.trailColor}-200 to-transparent animate-pulse opacity-30 mt-1`} style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Success message */}
        <div className="text-center mt-6">
          <div className={`text-4xl font-bold text-${animation.trailColor}-600 animate-pulse mb-2`}>
            {message}
          </div>
          <div className={`text-2xl font-semibold text-${animation.trailColor}-700 animate-bounce`}>
            {subMessage}
          </div>
        </div>
        
        {/* Rainbow sparkles */}
        {animation.colors.map((color, index) => (
          <div
            key={index}
            className={`absolute text-${color}-400 text-3xl animate-ping`}
            style={{
              top: `${20 + (index * 15)}%`,
              left: `${10 + (index * 12)}%`,
              animationDelay: `${index * 0.2}s`
            }}
          >
            {index % 2 === 0 ? '⭐' : '✨'}
          </div>
        ))}
        
        {/* Additional sparkles on the right */}
        {animation.colors.map((color, index) => (
          <div
            key={`right-${index}`}
            className={`absolute text-${color}-400 text-2xl animate-ping`}
            style={{
              top: `${30 + (index * 10)}%`,
              right: `${10 + (index * 8)}%`,
              animationDelay: `${(index * 0.3) + 0.5}s`
            }}
          >
            {index % 2 === 0 ? '✨' : '⭐'}
          </div>
        ))}
        
        {/* Celebration confetti */}
        <div className="absolute -top-16 left-0 text-red-400 text-2xl animate-bounce">🎊</div>
        <div className="absolute -top-12 right-2 text-blue-400 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎉</div>
        <div className="absolute -bottom-16 left-4 text-purple-400 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎊</div>
        <div className="absolute -bottom-12 right-0 text-pink-400 text-2xl animate-bounce" style={{ animationDelay: '0.9s' }}>🎉</div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-${animation.trailColor}-400 rounded-full opacity-20 animate-ping scale-150`}></div>
        <div className={`absolute inset-0 bg-${animation.trailColor}-300 rounded-full opacity-10 animate-ping scale-200`} style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Click anywhere to close */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
    </div>
  );
};

export default CelebrationModal;