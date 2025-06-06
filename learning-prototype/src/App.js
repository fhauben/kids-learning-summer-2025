import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

// Utility to split instruction text into text and code segments
function parseMarkdownCodeBlocks(text) {
  const regex = /```(?:python)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  const segments = [];

  while ((match = regex.exec(text)) !== null) {
    // Text before code block
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    // Code block content
    segments.push({ type: "code", content: match[1] });
    lastIndex = regex.lastIndex;
  }
  // Text after last code block
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }

  return segments;
}

export default function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [persona, setPersona] = useState("");
  const [technology, setTechnology] = useState("");
  const [instructions, setInstructions] = useState([]);

  // Load initial prompt from file and send to backend
  useEffect(() => {
    if (!showModal) {
      // Load starter code
      fetch("/starterCode.json")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.python) {
            setCode(data.python);
          }
        })
        .catch((err) => console.error("Failed to load starter code:", err));

      // Load initial prompt text
      fetch("/starterPrompt.txt")
        .then((res) => res.text())
        .then((promptText) => {
          const promptWithVars = `${promptText}\n\nProfile: ${persona}\nLanguage: ${technology}`;

          handleSend(promptWithVars, true);
        })
        .catch((err) => console.error("Failed to load starter prompt:", err));
    }
  }, [showModal]);

  // Send message to backend
  const handleSend = async (message, isInitial = false) => {
    const userMessage = { role: "user", content: message };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    if (!isInitial) setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newChatLog }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    const assistantMessage = { role: "assistant", content: data.reply };
    setChatLog([...newChatLog, assistantMessage]);

    if (isInitial) {
      // Parse steps from initial prompt response and set instructions
      const steps = [];
      // Match "Step N" followed by content until next Step or end of string
      const stepRegex = /Step\s*\d+([\s\S]*?)(?=Step\s*\d+|$)/gi;
      let match;
      while ((match = stepRegex.exec(data.reply)) !== null) {
        steps.push(match[1].trim());
      }
      if (steps.length === 0) {
        // fallback: if no steps detected, show full text as single instruction
        steps.push(data.reply.trim());
      }
      setInstructions(steps);
    }
  };

  // Modal UI for persona and tech selection
  const renderModal = () => {
    if (!showModal) return null;

    const nextStep = () => setModalStep(modalStep + 1);
    const prevStep = () => setModalStep(modalStep - 1);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white p-6 rounded-xl w-96 shadow-xl transition-opacity duration-300">
          {modalStep === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">What is your persona?</h2>
              {["Full Stack Developer", "Back end Developer", "Front End Developer", "Never Written Code Before"].map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPersona(p);
                      nextStep();
                    }}
                    className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2"
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          )}
          {modalStep === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Select the technology you'd like to learn</h2>
              <button
                onClick={() => {
                  setTechnology("Python");
                  nextStep();
                }}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2"
              >
                Python
              </button>
              <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-200 mt-2">
                Back
              </button>
            </div>
          )}
          {modalStep === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Confirm Your Selection</h2>
              <p className="mb-4">
                Persona: <strong>{persona}</strong>
                <br />
                Technology: <strong>{technology}</strong>
              </p>
              <button onClick={() => setShowModal(false)} className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Confirm
              </button>
              <button onClick={prevStep} className="text-sm text-gray-400 hover:text-gray-200 mt-2">
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render each instruction step with syntax highlighting for code blocks
  const renderInstructionStep = (stepText, index) => {
    const segments = parseMarkdownCodeBlocks(stepText);
    return (
      <details key={index} className="bg-gray-800 border border-gray-600 rounded p-4">
        <summary className="cursor-pointer text-gray-200 font-medium">{`Step ${index + 1}`}</summary>
        <div className="mt-2 text-gray-400">
          {segments.map((seg, i) =>
            seg.type === "text" ? (
              <p key={i} className="whitespace-pre-wrap">
                {seg.content}
              </p>
            ) : (
              <CodeMirror
                key={i}
                value={seg.content}
                height="auto"
                theme={oneDark}
                extensions={[python()]}
                readOnly={true}
                basicSetup={{ lineNumbers: true, highlightActiveLine: false, highlightActiveLineGutter: false }}
                style={{ marginTop: 8, marginBottom: 8, borderRadius: 4 }}
              />
            )
          )}
          <div className="mt-4 flex gap-3">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              onClick={() => console.log(`Completed step ${index + 1}`)}
            >
              ✅ I've completed this step
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
              onClick={() => console.log(`Needs help on step ${index + 1}`)}
            >
              ❓ I need help
            </button>
          </div>
        </div>
      </details>
    );
  };
  
  return (
    <div className="dark bg-gray-900 text-gray-100 flex h-screen">
      {renderModal()}

      {/* Left: Code Editor */}
      <div className="w-1/2 p-4 border-r border-gray-700 flex flex-col">
        <h2 className="text-xl font-bold mb-2">Text Editor</h2>
        <div className="flex-1 overflow-auto">
          <CodeMirror
            value={code}
            height="100%"
            extensions={[python()]}
            theme={oneDark}
            onChange={(value) => setCode(value)}
          />
        </div>
      </div>

      {/* Right: Chat + Instructions */}
      <div className="w-1/2 flex flex-col">
        {/* ChatGPT Panel */}
        <div className="h-1/2 p-4 border-b border-gray-700 flex flex-col">
          <h2 className="text-xl font-bold mb-2">ChatGPT</h2>
          <div className="flex-1 overflow-y-auto border border-gray-600 p-2 mb-2 rounded bg-gray-800">
            {chatLog.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-600 bg-gray-700 text-white p-2 rounded"
              placeholder="Ask something..."
            />
            <button onClick={() => handleSend()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="h-1/2 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-2">Instructions</h2>
          <div className="space-y-2">
            {instructions.length > 0 ? (
              instructions.map((step, idx) => renderInstructionStep(step, idx))
            ) : (
              <p className="text-gray-400">Loading instructions...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
