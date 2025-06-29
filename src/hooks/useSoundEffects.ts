import { useCallback } from 'react';

interface SoundEffects {
  playCorrect: () => void;
  playIncorrect: () => void;
  playAchievement: () => void;
  playLevelUp: () => void;
  playClick: () => void;
  playSuccess: () => void;
}

export const useSoundEffects = (): SoundEffects => {
  const playSound = useCallback((frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      // Create a nice envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported or blocked');
    }
  }, []);

  const playCorrect = useCallback(() => {
    // Play a happy ascending chord
    playSound(523.25, 0.1); // C
    setTimeout(() => playSound(659.25, 0.1), 50); // E
    setTimeout(() => playSound(783.99, 0.2), 100); // G
  }, [playSound]);

  const playIncorrect = useCallback(() => {
    // Play a descending sad sound
    playSound(440, 0.1); // A
    setTimeout(() => playSound(415.30, 0.1), 50); // Ab
    setTimeout(() => playSound(392, 0.2), 100); // G
  }, [playSound]);

  const playAchievement = useCallback(() => {
    // Play a triumphant fanfare
    playSound(523.25, 0.1); // C
    setTimeout(() => playSound(659.25, 0.1), 50); // E
    setTimeout(() => playSound(783.99, 0.1), 100); // G
    setTimeout(() => playSound(1046.50, 0.3), 150); // High C
  }, [playSound]);

  const playLevelUp = useCallback(() => {
    // Play an exciting level up sound
    playSound(261.63, 0.1); // Low C
    setTimeout(() => playSound(523.25, 0.1), 50); // C
    setTimeout(() => playSound(1046.50, 0.1), 100); // High C
    setTimeout(() => playSound(2093.00, 0.4), 150); // Very High C
  }, [playSound]);

  const playClick = useCallback(() => {
    // Play a subtle click sound
    playSound(800, 0.05, 'square');
  }, [playSound]);

  const playSuccess = useCallback(() => {
    // Play a success chime
    playSound(659.25, 0.1); // E
    setTimeout(() => playSound(783.99, 0.1), 50); // G
    setTimeout(() => playSound(987.77, 0.2), 100); // B
  }, [playSound]);

  return {
    playCorrect,
    playIncorrect,
    playAchievement,
    playLevelUp,
    playClick,
    playSuccess
  };
}; 