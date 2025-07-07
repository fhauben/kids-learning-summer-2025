import React, { useState } from 'react';
import { ArrowLeft, Zap, Target, Settings, Lightbulb, Battery, Power, Circle, Minus } from 'lucide-react';

interface ElectricityCircuitsProps {
  onBack: () => void;
  onSaveProgress?: (score: number, total: number) => void;
}

type CompType = 'battery' | 'bulb' | 'switch';

interface SimComponent {
  id: string;
  type: CompType;
  x: number;
  y: number;
  connectedTo: string[];
}

const palette = [
  { type: 'battery', label: 'Battery', icon: <Battery className="w-6 h-6" /> },
  { type: 'bulb', label: 'Bulb', icon: <Lightbulb className="w-6 h-6" /> },
  { type: 'switch', label: 'Switch', icon: <Power className="w-6 h-6" /> },
];

const iconForType = (type: CompType, on?: boolean) => {
  switch (type) {
    case 'battery': return <Battery className="w-8 h-8 text-red-600" />;
    case 'bulb': return <Lightbulb className={`w-8 h-8 ${on ? 'text-yellow-400' : 'text-gray-400'}`} />;
    case 'switch': return <Power className={`w-8 h-8 ${on ? 'text-green-500' : 'text-gray-400'}`} />;
    default: return <Circle className="w-8 h-8" />;
  }
};

function isCircuitComplete(components: SimComponent[]) {
  // For now: circuit is complete if there is a battery and a bulb, and they are directly or indirectly connected
  const battery = components.find(c => c.type === 'battery');
  const bulb = components.find(c => c.type === 'bulb');
  if (!battery || !bulb) return false;
  // BFS to see if bulb is reachable from battery
  const visited = new Set<string>();
  const queue = [battery.id];
  while (queue.length) {
    const id = queue.shift()!;
    if (id === bulb.id) return true;
    visited.add(id);
    const comp = components.find(c => c.id === id);
    if (comp) {
      for (const neighbor of comp.connectedTo) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
  }
  return false;
}

const ElectricityCircuits: React.FC<ElectricityCircuitsProps> = ({ onBack, onSaveProgress }) => {
  const [view, setView] = useState<'main' | 'explorer' | 'simulator' | 'experiments' | 'quiz'>('main');
  const [selectedCircuit, setSelectedCircuit] = useState<any>(null);

  // Simulator state
  const [simComponents, setSimComponents] = useState<SimComponent[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({x:0, y:0});
  const [connecting, setConnecting] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<null | boolean>(null);

  // Main menu
  if (view === 'main') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to 5th Grade Science
        </button>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-yellow-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Electricity & Circuits</h1>
          </div>
          <p className="text-gray-600">Discover how electricity flows and build amazing circuits!</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button onClick={() => setView('explorer')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center">
            <Target className="w-5 h-5 mr-2" /> Circuit Explorer
          </button>
          <button onClick={() => setView('simulator')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center">
            <Settings className="w-5 h-5 mr-2" /> Circuit Simulator
          </button>
          <button onClick={() => setView('experiments')} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" /> Experiments
          </button>
          <button onClick={() => setView('quiz')} className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 flex items-center">
            <Target className="w-5 h-5 mr-2" /> Take Quiz
          </button>
        </div>
      </div>
    );
  }

  // Circuit Simulator
  if (view === 'simulator') {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <button
          onClick={() => setView('main')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Electricity & Circuits
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Circuit Simulator</h2>
        <div className="flex gap-8">
          {/* Palette */}
          <div className="w-48">
            <h3 className="font-semibold text-gray-700 mb-2">Components</h3>
            <div className="space-y-3">
              {palette.map((item) => (
                <button
                  key={item.type}
                  className="w-full flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded p-2 border"
                  onClick={() => {
                    const id = `${item.type}-${Date.now()}`;
                    setSimComponents([...simComponents, { id, type: item.type as CompType, x: 100, y: 100 + simComponents.length*40, connectedTo: [] }]);
                  }}
                >
                  {item.icon} <span>{item.label}</span>
                </button>
              ))}
              <button
                className="w-full mt-4 bg-gray-200 hover:bg-gray-300 rounded p-2 text-sm"
                onClick={() => {
                  setSimComponents([]);
                  setTestResult(null);
                }}
              >Reset</button>
            </div>
          </div>
          {/* Canvas */}
          <div
            className="flex-1 relative bg-gray-50 rounded border h-[500px] overflow-hidden"
            onMouseUp={() => setDragId(null)}
          >
            {/* Wires */}
            {simComponents.map((c1) => c1.connectedTo.map(cid => {
              const c2 = simComponents.find(c => c.id === cid);
              if (!c2) return null;
              // Only draw one direction
              if (c1.id > c2.id) return null;
              const x1 = c1.x + 24, y1 = c1.y + 24;
              const x2 = c2.x + 24, y2 = c2.y + 24;
              return (
                <svg key={c1.id+cid} className="absolute pointer-events-none" style={{left:0,top:0}} width="100%" height="100%">
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth={4} />
                </svg>
              );
            }))}
            {/* Components */}
            {simComponents.map((comp) => (
              <div
                key={comp.id}
                className={`absolute cursor-move select-none`}
                style={{ left: comp.x, top: comp.y, zIndex: dragId === comp.id ? 10 : 1, border: connecting === comp.id ? '2px solid #f59e42' : 'none', borderRadius: 8, background: '#fff', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001', transition: 'border 0.2s' }}
                onMouseDown={e => {
                  setDragId(comp.id);
                  setDragOffset({ x: e.clientX - comp.x, y: e.clientY - comp.y });
                }}
                onDoubleClick={() => {
                  if (connecting && connecting !== comp.id) {
                    // Connect
                    setSimComponents(simComponents.map(c =>
                      c.id === connecting
                        ? { ...c, connectedTo: [...c.connectedTo, comp.id] }
                        : c.id === comp.id
                          ? { ...c, connectedTo: [...c.connectedTo, connecting] }
                          : c
                    ));
                    setConnecting(null);
                  } else {
                    setConnecting(comp.id);
                  }
                }}
              >
                {iconForType(comp.type, !!(testResult && comp.type === 'bulb' && isCircuitComplete(simComponents)))}
              </div>
            ))}
            {/* Drag logic */}
            <div
              style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
              onMouseMove={e => {
                if (dragId) {
                  setSimComponents(simComponents.map(c =>
                    c.id === dragId ? { ...c, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y } : c
                  ));
                }
              }}
            />
          </div>
          {/* Instructions & Test */}
          <div className="w-64">
            <h3 className="font-semibold text-gray-700 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
              <li>Click a component to add it to the canvas</li>
              <li>Drag to move components</li>
              <li>Double-click one, then another to connect them</li>
              <li>Click Reset to clear</li>
            </ul>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 mb-2"
              onClick={() => {
                const result = isCircuitComplete(simComponents);
                setTestResult(result);
                // Save progress when testing circuits
                if (onSaveProgress && simComponents.length > 0) {
                  const score = result ? 100 : Math.min(50, simComponents.length * 10);
                  onSaveProgress(score, 100);
                }
              }}
            >Test Circuit</button>
            {testResult !== null && (
              <div className={`mt-4 p-3 rounded-lg text-center font-bold ${testResult ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {testResult ? '✅ The bulb lights up! Circuit is complete.' : '❌ The circuit is not complete.'}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Circuit Explorer (unchanged)
  // Define circuits array here to fix error
  const circuits = [
    {
      id: 'simple-circuit',
      name: 'Simple Circuit',
      description: 'A basic circuit with a battery and light bulb.',
      diagram: [
        { type: 'battery', label: 'Battery', left: '10%' },
        { type: 'wire', label: '', left: '30%' },
        { type: 'bulb', label: 'Bulb', left: '50%' },
        { type: 'wire', label: '', left: '70%' },
        { type: 'battery', label: '', left: '90%' },
      ],
      explanation: 'A simple circuit needs a power source (battery), a path (wire), and a load (bulb). Electricity flows in a loop.'
    },
    {
      id: 'series-circuit',
      name: 'Series Circuit',
      description: 'Two bulbs in a single path.',
      diagram: [
        { type: 'battery', label: 'Battery', left: '10%' },
        { type: 'wire', label: '', left: '25%' },
        { type: 'bulb', label: 'Bulb 1', left: '40%' },
        { type: 'wire', label: '', left: '55%' },
        { type: 'bulb', label: 'Bulb 2', left: '70%' },
        { type: 'wire', label: '', left: '85%' },
        { type: 'battery', label: '', left: '95%' },
      ],
      explanation: 'In a series circuit, all parts are in one loop. If one bulb goes out, the circuit is broken.'
    },
    {
      id: 'parallel-circuit',
      name: 'Parallel Circuit',
      description: 'Two bulbs in separate paths.',
      diagram: [
        { type: 'battery', label: 'Battery', left: '10%' },
        { type: 'wire', label: '', left: '30%' },
        { type: 'bulb', label: 'Bulb 1', left: '50%', top: '30%' },
        { type: 'bulb', label: 'Bulb 2', left: '50%', top: '70%' },
        { type: 'wire', label: '', left: '70%' },
        { type: 'battery', label: '', left: '90%' },
      ],
      explanation: 'In a parallel circuit, each bulb has its own path. If one bulb goes out, the other stays lit.'
    },
  ];

  if (view === 'explorer') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setView('main')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Electricity & Circuits
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Circuit Explorer</h2>
        {!selectedCircuit ? (
          <div className="grid md:grid-cols-2 gap-6">
            {circuits.map((circuit: typeof circuits[0]) => (
              <div
                key={circuit.id}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl border-2 border-transparent hover:border-yellow-300"
                onClick={() => setSelectedCircuit(circuit)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{circuit.name}</h3>
                  <p className="text-gray-600 mb-4">{circuit.description}</p>
                  <div className="text-xs text-gray-500">Click to explore</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={() => setSelectedCircuit(null)}
              className="text-gray-400 hover:text-gray-600 mb-4"
            >
              ← Back to Circuits
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedCircuit.name}</h3>
            <p className="text-gray-600 mb-6">{selectedCircuit.description}</p>
            <div className="relative h-32 bg-gray-100 rounded border-2 border-gray-300 mb-6 flex items-center">
              {selectedCircuit.diagram.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center"
                  style={{ left: item.left, top: item.top || '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <div className="text-3xl mb-1">{iconForType(item.type as CompType)}</div>
                  {item.label && <div className="text-xs text-gray-700">{item.label}</div>}
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-800 mb-2">How It Works</h4>
              <p className="text-gray-700 text-sm">{selectedCircuit.explanation}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placeholders for other sections
  if (view === 'experiments' || view === 'quiz') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setView('main')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Electricity & Circuits
        </button>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⚡</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            This section is being developed. Stay tuned for interactive lessons!
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default ElectricityCircuits;
