import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Target, CheckCircle, XCircle, RotateCcw, Settings, Lightbulb, Battery, Wire, Switch, Resistor } from 'lucide-react';
import CelebrationModal from '../../shared/CelebrationModal';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

interface ElectricityCircuitsProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

interface CircuitComponent {
  id: string;
  type: 'battery' | 'bulb' | 'wire' | 'switch' | 'resistor';
  name: string;
  symbol: string;
  description: string;
  voltage?: number;
  resistance?: number;
  position: { x: number; y: number };
  connections: string[];
  isOn?: boolean;
}

interface Circuit {
  id: string;
  name: string;
  description: string;
  components: CircuitComponent[];
  isWorking: boolean;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  objective: string;
  materials: string[];
  steps: string[];
  safetyNotes: string[];
  questions: Array<{
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }>;
}

const ElectricityCircuits: React.FC<ElectricityCircuitsProps> = ({ onBack, onSaveProgress }) => {
  const [currentView, setCurrentView] = useState<'main' | 'circuit-builder' | 'experiments' | 'quiz' | 'safety'>('main');
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [currentExperiment, setCurrentExperiment] = useState<Experiment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  [showResults, setShowResults] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [circuitComponents, setCircuitComponents] = useState<CircuitComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [circuitWorking, setCircuitWorking] = useState(false);
  
  const { playCorrect, playIncorrect } = useSoundEffects();

  const sampleCircuits: Circuit[] = [
    {
      id: 'simple-circuit',
      name: 'Simple Circuit',
      description: 'A basic circuit with a battery and light bulb',
      difficulty: 'easy',
      components: [
        { id: 'battery1', type: 'battery', name: 'Battery', symbol: '🔋', description: 'Power source', voltage: 9, position: { x: 100, y: 100 }, connections: ['wire1'] },
        { id: 'bulb1', type: 'bulb', name: 'Light Bulb', symbol: '💡', description: 'Converts electricity to light', position: { x: 300, y: 100 }, connections: ['wire1', 'wire2'], isOn: false },
        { id: 'wire1', type: 'wire', name: 'Wire', symbol: '➖', description: 'Conducts electricity', position: { x: 200, y: 100 }, connections: ['battery1', 'bulb1'] },
        { id: 'wire2', type: 'wire', name: 'Wire', symbol: '➖', description: 'Conducts electricity', position: { x: 400, y: 100 }, connections: ['bulb1', 'battery1'] }
      ],
      isWorking: true,
      explanation: 'This is a complete circuit. Electricity flows from the battery through the wire to the bulb, then back to the battery through the second wire.'
    },
    {
      id: 'switch-circuit',
      name: 'Circuit with Switch',
      description: 'A circuit with a switch to control the light',
      difficulty: 'medium',
      components: [
        { id: 'battery1', type: 'battery', name: 'Battery', symbol: '🔋', description: 'Power source', voltage: 9, position: { x: 100, y: 100 }, connections: ['wire1'] },
        { id: 'switch1', type: 'switch', name: 'Switch', symbol: '🔘', description: 'Controls the circuit', position: { x: 200, y: 100 }, connections: ['wire1', 'wire2'], isOn: false },
        { id: 'bulb1', type: 'bulb', name: 'Light Bulb', symbol: '💡', description: 'Converts electricity to light', position: { x: 300, y: 100 }, connections: ['wire2', 'wire3'], isOn: false },
        { id: 'wire1', type: 'wire', name: 'Wire', symbol: '➖', description: 'Conducts electricity', position: { x: 150, y: 100 }, connections: ['battery1', 'switch1'] },
        { id: 'wire2', type: 'wire', name: 'Wire', symbol: '➖', description: 'Conducts electricity', position: { x: 250, y: 100 }, connections: ['switch1', 'bulb1'] },
        { id: 'wire3', type: 'wire', name: 'Wire', symbol: '➖', description: 'Conducts electricity', position: { x: 350, y: 100 }, connections: ['bulb1', 'battery1'] }
      ],
      isWorking: false,
      explanation: 'This circuit has a switch that can turn the light on and off. When the switch is closed, electricity flows and the bulb lights up.'
    }
  ];

  const experiments: Experiment[] = [
    {
      id: 'conductors-insulators',
      title: 'Conductors vs Insulators',
      description: 'Test different materials to see which conduct electricity',
      objective: 'Understand the difference between conductors and insulators',
      materials: ['Battery', 'Light bulb', 'Wires', 'Various materials (metal, plastic, wood, rubber, aluminum foil)'],
      steps: [
        'Set up a simple circuit with battery, wires, and light bulb',
        'Test each material by placing it in the circuit',
        'Record which materials make the bulb light up (conductors)',
        'Record which materials don\'t make the bulb light up (insulators)',
        'Create a chart of your findings'
      ],
      safetyNotes: [
        'Never touch electrical outlets or appliances',
        'Only use low-voltage batteries (1.5V or 9V)',
        'Have an adult supervise the experiment',
        'Don\'t test materials near water'
      ],
      questions: [
        {
          question: 'Which of these materials is a good conductor of electricity?',
          options: ['Plastic', 'Metal', 'Wood', 'Rubber'],
          answer: 'Metal',
          explanation: 'Metals like copper, aluminum, and steel are excellent conductors of electricity because they have free electrons that can move easily.'
        },
        {
          question: 'Why do we use rubber to cover electrical wires?',
          options: ['To make them stronger', 'To conduct electricity better', 'To insulate and prevent shocks', 'To make them colorful'],
          answer: 'To insulate and prevent shocks',
          explanation: 'Rubber is an insulator that prevents electricity from escaping the wire and shocking people who touch it.'
        }
      ]
    },
    {
      id: 'series-parallel',
      title: 'Series vs Parallel Circuits',
      description: 'Compare how electricity flows in different circuit arrangements',
      objective: 'Understand the difference between series and parallel circuits',
      materials: ['Multiple batteries', 'Multiple light bulbs', 'Wires', 'Switch'],
      steps: [
        'Build a series circuit with two bulbs',
        'Observe what happens when one bulb is removed',
        'Build a parallel circuit with two bulbs',
        'Observe what happens when one bulb is removed',
        'Compare the brightness of bulbs in each circuit'
      ],
      safetyNotes: [
        'Use only low-voltage batteries',
        'Don\'t connect too many batteries together',
        'Have an adult supervise',
        'Don\'t touch the circuit while it\'s powered'
      ],
      questions: [
        {
          question: 'In a series circuit, what happens if one bulb burns out?',
          options: ['All bulbs stay on', 'All bulbs turn off', 'Only that bulb turns off', 'The circuit explodes'],
          answer: 'All bulbs turn off',
          explanation: 'In a series circuit, electricity must flow through all components. If one breaks, the entire circuit stops working.'
        },
        {
          question: 'Which type of circuit is used in homes for electrical outlets?',
          options: ['Series', 'Parallel', 'Mixed', 'None of the above'],
          answer: 'Parallel',
          explanation: 'Homes use parallel circuits so that if one appliance stops working, others continue to function normally.'
        }
      ]
    }
  ];

  const questions = [
    {
      question: 'What is the purpose of a battery in a circuit?',
      options: ['To provide light', 'To provide power', 'To conduct electricity', 'To insulate wires'],
      answer: 'To provide power',
      explanation: 'A battery is a power source that provides the electrical energy needed to make the circuit work.'
    },
    {
      question: 'Which of these is NOT a conductor of electricity?',
      options: ['Copper wire', 'Aluminum foil', 'Plastic', 'Steel'],
      answer: 'Plastic',
      explanation: 'Plastic is an insulator, meaning it does not allow electricity to flow through it easily.'
    },
    {
      question: 'What happens in a complete circuit when you flip a switch to "on"?',
      options: ['Electricity stops flowing', 'Electricity starts flowing', 'The battery dies', 'Nothing happens'],
      answer: 'Electricity starts flowing',
      explanation: 'When a switch is turned on, it completes the circuit and allows electricity to flow from the battery to the components.'
    },
    {
      question: 'Why do light bulbs have a filament inside?',
      options: ['To look pretty', 'To conduct electricity and glow', 'To insulate the bulb', 'To save energy'],
      answer: 'To conduct electricity and glow',
      explanation: 'The filament is a thin wire that gets very hot when electricity flows through it, causing it to glow and produce light.'
    },
    {
      question: 'What is the main safety rule when working with electricity?',
      options: ['Always work alone', 'Never use batteries', 'Never touch electrical outlets', 'Always use high voltage'],
      answer: 'Never touch electrical outlets',
      explanation: 'Electrical outlets carry dangerous high voltage that can cause serious injury or death. Always stay away from them.'
    }
  ];

  const startCircuitBuilder = () => {
    setCurrentView('circuit-builder');
    setCircuitComponents([]);
    setCircuitWorking(false);
  };

  const startExperiments = () => {
    setCurrentView('experiments');
  };

  const startQuiz = () => {
    setCurrentView('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const startSafety = () => {
    setCurrentView('safety');
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

  const addComponent = (type: CircuitComponent['type']) => {
    const newComponent: CircuitComponent = {
      id: `${type}${Date.now()}`,
      type,
      name: type.charAt(0).toUpperCase() + type.slice(1),
      symbol: type === 'battery' ? '🔋' : type === 'bulb' ? '💡' : type === 'wire' ? '➖' : type === 'switch' ? '🔘' : '⚡',
      description: type === 'battery' ? 'Power source' : type === 'bulb' ? 'Light source' : type === 'wire' ? 'Conductor' : type === 'switch' ? 'Controller' : 'Resistor',
      position: { x: Math.random() * 400 + 50, y: Math.random() * 200 + 50 },
      connections: [],
      isOn: type === 'switch' ? false : undefined
    };
    setCircuitComponents([...circuitComponents, newComponent]);
  };

  const checkCircuit = () => {
    // Simple circuit validation
    const hasBattery = circuitComponents.some(c => c.type === 'battery');
    const hasBulb = circuitComponents.some(c => c.type === 'bulb');
    const hasWires = circuitComponents.some(c => c.type === 'wire');
    
    setCircuitWorking(hasBattery && hasBulb && hasWires);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to 5th Grade Science
      </button>

      <CelebrationModal 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)}
        score={score}
        total={questions.length}
        message="Electricity Expert!"
      />

      {currentView === 'main' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-yellow-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Electricity & Circuits</h1>
            </div>
            <p className="text-gray-600">Discover how electricity flows and build your own circuits!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🔋</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Power Sources</h3>
                <p className="text-gray-600 mb-4">Batteries and electrical energy</p>
                <div className="text-sm text-gray-500 mb-4">
                  Learn about voltage and current
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Light & Energy</h3>
                <p className="text-gray-600 mb-4">How electricity creates light</p>
                <div className="text-sm text-gray-500 mb-4">
                  Energy transformation
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">➖</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Conductors</h3>
                <p className="text-gray-600 mb-4">Materials that carry electricity</p>
                <div className="text-sm text-gray-500 mb-4">
                  Metals and wires
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🔘</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Controls</h3>
                <p className="text-gray-600 mb-4">Switches and circuit control</p>
                <div className="text-sm text-gray-500 mb-4">
                  On/off mechanisms
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={startCircuitBuilder}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center"
            >
              <Settings className="w-5 h-5 mr-2" />
              Circuit Builder
            </button>
            <button
              onClick={startSafety}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Safety First
            </button>
            <button
              onClick={startExperiments}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Experiments
            </button>
            <button
              onClick={startQuiz}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center"
            >
              <Target className="w-5 h-5 mr-2" />
              Take Quiz
            </button>
          </div>
        </div>
      )}

      {currentView === 'circuit-builder' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Circuit Builder</h2>
              <p className="text-gray-600">Build and test your own electrical circuits</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Component Library */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Component Library</h3>
              <div className="space-y-3">
                <button
                  onClick={() => addComponent('battery')}
                  className="w-full p-3 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors flex items-center"
                >
                  <span className="text-2xl mr-3">🔋</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Battery</div>
                    <div className="text-sm text-gray-600">Power source</div>
                  </div>
                </button>
                
                <button
                  onClick={() => addComponent('bulb')}
                  className="w-full p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
                >
                  <span className="text-2xl mr-3">💡</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Light Bulb</div>
                    <div className="text-sm text-gray-600">Light source</div>
                  </div>
                </button>
                
                <button
                  onClick={() => addComponent('wire')}
                  className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <span className="text-2xl mr-3">➖</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Wire</div>
                    <div className="text-sm text-gray-600">Conductor</div>
                  </div>
                </button>
                
                <button
                  onClick={() => addComponent('switch')}
                  className="w-full p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors flex items-center"
                >
                  <span className="text-2xl mr-3">🔘</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Switch</div>
                    <div className="text-sm text-gray-600">Controller</div>
                  </div>
                </button>
                
                <button
                  onClick={() => addComponent('resistor')}
                  className="w-full p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors flex items-center"
                >
                  <span className="text-2xl mr-3">⚡</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Resistor</div>
                    <div className="text-sm text-gray-600">Limits current</div>
                  </div>
                </button>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setCircuitComponents([])}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Circuit
                </button>
              </div>
            </div>

            {/* Circuit Canvas */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Circuit Canvas</h3>
                <button
                  onClick={checkCircuit}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Test Circuit
                </button>
              </div>
              
              <div className="relative h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4">
                {circuitComponents.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔌</div>
                      <p>Drag components here to build your circuit</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    {circuitComponents.map((component) => (
                      <div
                        key={component.id}
                        className="absolute cursor-move p-2 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-blue-300 transition-colors"
                        style={{ left: component.position.x, top: component.position.y }}
                      >
                        <div className="text-2xl text-center">{component.symbol}</div>
                        <div className="text-xs text-center text-gray-600">{component.name}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {circuitWorking && (
                  <div className="absolute top-4 right-4 bg-green-100 border border-green-300 rounded-lg p-3">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Circuit Working!</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Tip:</strong> A working circuit needs a power source (battery), a load (light bulb), and conductors (wires) to complete the path.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'safety' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Electrical Safety</h2>
              <p className="text-gray-600">Learn how to stay safe around electricity</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-400">
            <h3 className="text-xl font-bold text-red-800 mb-4">⚠️ Never Do These Things:</h3>
            <ul className="space-y-3 text-red-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">❌</span>
                <span><strong>Touch electrical outlets</strong> - They carry dangerous high voltage</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">❌</span>
                <span><strong>Use electrical devices near water</strong> - Water conducts electricity</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">❌</span>
                <span><strong>Overload outlets</strong> - Too many devices can cause fires</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">❌</span>
                <span><strong>Use damaged cords</strong> - Exposed wires can cause shocks</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
            <h3 className="text-xl font-bold text-green-800 mb-4">✅ Always Do These Things:</h3>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span><strong>Ask an adult for help</strong> with electrical projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span><strong>Use only low-voltage batteries</strong> for experiments</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span><strong>Keep electrical devices away from water</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span><strong>Turn off devices</strong> before unplugging them</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
            <h3 className="text-xl font-bold text-blue-800 mb-4">🔍 What to Look For:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Safe for Experiments:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• 1.5V AA batteries</li>
                  <li>• 9V batteries</li>
                  <li>• LED lights</li>
                  <li>• Small motors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Never Touch:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Electrical outlets</li>
                  <li>• Power cords</li>
                  <li>• Appliances</li>
                  <li>• Light switches</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'experiments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Science Experiments</h2>
              <p className="text-gray-600">Hands-on experiments to explore electricity safely</p>
            </div>
            <button
              onClick={() => setCurrentView('main')}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {currentExperiment ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentExperiment.title}</h3>
                <p className="text-gray-600">{currentExperiment.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Objective</h4>
                  <p className="text-gray-600 mb-4">{currentExperiment.objective}</p>
                  
                  <h4 className="font-semibold text-gray-700 mb-3">Materials Needed</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {currentExperiment.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Steps</h4>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    {currentExperiment.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Safety Notes</h4>
                <ul className="text-yellow-700 space-y-1">
                  {currentExperiment.safetyNotes.map((note, index) => (
                    <li key={index}>• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {experiments.map((experiment) => (
                <div
                  key={experiment.id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setCurrentExperiment(experiment)}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{experiment.title}</h3>
                  <p className="text-gray-600 mb-4">{experiment.description}</p>
                  <div className="text-sm text-gray-500">Click to view experiment</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentView === 'quiz' && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Electricity & Circuits Quiz</h2>
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
              <div className="text-6xl mb-4">⚡</div>
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
    </div>
  );
};

export default ElectricityCircuits; 