import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default function App() {
  const [code, setCode] = useState("// Start typing JavaScript here...");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [persona, setPersona] = useState("");
  const [technology, setTechnology] = useState("");

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newChatLog }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    setChatLog([...newChatLog, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  const renderModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-xl w-96 animate-fade-in">
          {modalStep === 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">What is your persona?</h2>
              <div className="flex flex-col gap-2">
                {[
                  "Full Stack Developer",
                  "Back end Developer",
                  "Front End Developer",
                  "Never Written Code Before",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setPersona(option);
                      setModalStep(1);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {modalStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Select the technology you'd like to learn</h2>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setTechnology("Python");
                    setModalStep(2);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2"
                >
                  Python
                </button>
                <button
                  onClick={() => setModalStep(0)}
                  className="text-sm text-blue-300 hover:underline mt-2"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {modalStep === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Confirm your selections</h2>
              <p className="mb-4">
                Persona: <strong>{persona}</strong>
                <br />Technology: <strong>{technology}</strong>
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setModalStep(1)}
                  className="text-sm text-blue-300 hover:underline"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setModalStep(-1)}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dark bg-gray-900 text-gray-100 flex h-screen relative">
      {modalStep >= 0 && renderModal()}

      {/* Left: Code Editor */}
      <div className="w-1/2 p-4 border-r border-gray-700 flex flex-col">
        <h2 className="text-xl font-bold mb-2">Text Editor</h2>
        <div className="flex-1 overflow-auto">
          <CodeMirror
            value={code}
            height="100%"
            extensions={[javascript()]}
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
            {loading && <div className="italic text-gray-400">AI is typing<span className="animate-pulse">...</span></div>}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-600 bg-gray-700 text-white p-2 rounded"
              placeholder="Ask something..."
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="h-1/2 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-2">Instructions</h2>
          <div className="space-y-2">
            {["Instruction 1", "Instruction 2", "More to come…"].map((instruction, idx) => (
              <details key={idx} className="bg-gray-800 border border-gray-600 rounded p-4">
                <summary className="cursor-pointer font-semibold">{instruction}</summary>
                <div className="mt-2 text-gray-300 text-sm">
                  Detailed explanation for {instruction} goes here.
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
