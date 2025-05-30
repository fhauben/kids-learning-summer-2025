import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { ChevronDown, ChevronRight } from "lucide-react";

// Collapsible Instruction Component
function CollapsibleInstruction({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 border border-gray-700 rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 flex items-center justify-between"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-gray-800 text-sm text-gray-300 border-t border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [code, setCode] = useState("// Start typing JavaScript here...");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newChatLog }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    setChatLog([...newChatLog, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="dark bg-gray-900 text-gray-100 flex h-screen">
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="h-1/2 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-2">Instructions</h2>
          <div className="text-gray-300">
            <CollapsibleInstruction title="Instruction 1">
              Write a function that returns the square of a number.
            </CollapsibleInstruction>
            <CollapsibleInstruction title="Instruction 2">
              Convert the function to an arrow function and test with different inputs.
            </CollapsibleInstruction>
            <CollapsibleInstruction title="More to come…">
              We'll keep adding challenges and prompts in this format.
            </CollapsibleInstruction>
          </div>
        </div>
      </div>
    </div>
  );
}