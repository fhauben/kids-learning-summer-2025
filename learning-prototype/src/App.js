import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // highlight.js theme CSS

export default function App() {
  const [code, setCode] = useState("// Start typing JavaScript here...");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fold state for instructions dropdowns
  const [folded, setFolded] = useState({
    instr1: true,
    instr2: true,
    instr3: true,
  });

  const toggleFold = (key) => {
    setFolded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newChatLog }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      setChatLog([...newChatLog, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setChatLog([
        ...newChatLog,
        {
          role: "assistant",
          content: "Error: Unable to get response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const userBubble =
    "bg-blue-600 text-white self-end rounded-lg rounded-br-none px-4 py-3 max-w-[75%] whitespace-pre-wrap";
  const aiBubble =
    "bg-gray-700 text-gray-100 self-start rounded-lg rounded-bl-none px-4 py-3 max-w-[75%] whitespace-pre-wrap";

  return (
    <>
      {/* Inline CSS for animated dots */}
      <style>{`
        @keyframes blink {
          0%, 20% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .dot {
          animation-name: blink;
          animation-duration: 1.4s;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          font-weight: bold;
          font-size: 1.5rem;
          margin-left: 2px;
          color: #eee;
        }
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

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
          <div className="h-1/2 flex flex-col border-b border-gray-700 bg-gray-900">
            <h2 className="text-xl font-bold p-4 border-b border-gray-700">
              ChatGPT
            </h2>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
              {chatLog.length === 0 && (
                <p className="text-gray-400 italic">No messages yet. Say hi!</p>
              )}
              {chatLog.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={isUser ? userBubble : aiBubble}
                    role="article"
                    aria-label={isUser ? "User message" : "Assistant message"}
                  >
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        children={msg.content}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {loading && (
                <div
                  className={aiBubble}
                  role="status"
                  aria-live="polite"
                  aria-label="ChatGPT is typing"
                >
                  <span>ChatGPT is typing</span>
                  <span className="inline-flex">
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-700 flex gap-2 bg-gray-900">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-gray-600 bg-gray-800 text-white p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask something..."
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>

          {/* Instructions Panel */}
          <div className="h-1/2 p-4 overflow-auto border-t border-gray-700 bg-gray-800 text-gray-300">
            <h2 className="text-xl font-bold mb-4">Instructions</h2>

            {/* Foldable Instruction 1 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFold("instr1")}
                className="w-full flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                <span>Instruction 1</span>
                <span>{folded.instr1 ? "+" : "-"}</span>
              </button>
              {!folded.instr1 && (
                <div className="mt-2 px-4 text-gray-300 bg-gray-900 rounded">
                  <p>Details or steps for Instruction 1 go here.</p>
                </div>
              )}
            </div>

            {/* Foldable Instruction 2 */}
            <div className="mb-4">
              <button
                onClick={() => toggleFold("instr2")}
                className="w-full flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                <span>Instruction 2</span>
                <span>{folded.instr2 ? "+" : "-"}</span>
              </button>
              {!folded.instr2 && (
                <div className="mt-2 px-4 text-gray-300 bg-gray-900 rounded">
                  <p>Details or steps for Instruction 2 go here.</p>
                </div>
              )}
            </div>

            {/* Foldable Instruction 3 */}
            <div>
              <button
                onClick={() => toggleFold("instr3")}
                className="w-full flex justify-between items-center bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                <span>More to come…</span>
                <span>{folded.instr3 ? "+" : "-"}</span>
              </button>
              {!folded.instr3 && (
                <div className="mt-2 px-4 text-gray-300 bg-gray-900 rounded">
                  <p>Additional instructions will be added here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
