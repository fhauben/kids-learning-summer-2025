import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { HelpCircle, CheckCircle } from "lucide-react";

export default function App() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [persona, setPersona] = useState("");
  const [technology, setTechnology] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [executionOutput, setExecutionOutput] = useState("");
  const [chatError, setChatError] = useState("");

  useEffect(() => {
    if (!showModal) {
      fetch("/public/starterCode.json")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.python) {
            setCode(data.python);
          }
        })
        .catch((err) => console.error("Failed to load starter code:", err));

      fetch("/public/starterPrompt.txt")
        .then((res) => res.text())
        .then((promptText) => {
          const initialMessage = `\n${promptText}\n\nProfile: ${persona}\nLanguage: ${technology}`;
          setLoadingInstructions(true);
          handleSend(initialMessage, true);
        });
    }
  }, [showModal]);

  const handleSend = async (initialMessage = null, isInitial = false) => {
    const userMessage = initialMessage
      ? { role: "user", content: initialMessage }
      : { role: "user", content: input };
    const newChatLog = [...chatLog, userMessage];
    setChatLog(newChatLog);
    if (!initialMessage) setInput("");
    setChatError("");

    try {
      console.log('Sending request to server with messages:', newChatLog);
      
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newChatLog }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        credentials: 'include'
      });

      // Log the response status
      console.log('Response status:', response.status);
      
      // Handle errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorText = await response.text().catch(() => '');
        console.error('Server error response:', {
          status: response.status,
          errorData,
          errorText
        });
        
        const errorMessage = errorData.error || errorText || `HTTP error! status: ${response.status}`;
        setChatError(errorMessage);
        setChatLog([...newChatLog, { 
          role: "assistant", 
          content: `Error: ${errorMessage}`,
          error: true
        }]);
        throw new Error(errorMessage);
      }
      
      // Get the response text first
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      // Parse the JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        setChatError("Failed to parse server response");
        setChatLog([...newChatLog, { 
          role: "assistant", 
          content: `Error: Failed to parse server response`,
          error: true
        }]);
        throw parseError;
      }
      
      if (!data || !data.reply) {
        setChatError("Invalid response format from server");
        setChatLog([...newChatLog, { 
          role: "assistant", 
          content: `Error: Invalid response format from server`,
          error: true
        }]);
        throw new Error('Invalid response format from server');
      }
      
      console.log('Processed response:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.message || 'An unexpected error occurred';
      setChatError(errorMessage);
      setChatLog([...newChatLog, { 
        role: "assistant", 
        content: `Error: ${errorMessage}`,
        error: true
      }]);
      throw error;
    }

    const assistantMessage = { role: "assistant", content: data.reply };
    setChatLog([...newChatLog, assistantMessage]);

    if (isInitial) {
      const steps = data.reply.split(/(?=Step \d+)/);
      setInstructions(steps);
      setLoadingInstructions(false);
    }
  };

  const loadPyodideScript = async () => {
    if (window.loadPyodide) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const runPython = async () => {
    await loadPyodideScript();
    if (!window.pyodide) {
      window.pyodide = await window.loadPyodide();
    }
    try {
      await window.pyodide.loadPackage("micropip");
      await window.pyodide.runPythonAsync(`
        import sys
        from io import StringIO
        sys.stdout = sys.stderr = StringIO()
      `);

      await window.pyodide.runPythonAsync(code);

      const output = await window.pyodide.runPythonAsync(
        "sys.stdout.getvalue()"
      );
      setExecutionOutput(output);
    } catch (err) {
      setExecutionOutput(err.message);
    }
  };

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
              {[
                "Full Stack Developer",
                "Back end Developer",
                "Front End Developer",
                "Never Written Code Before",
              ].map((p) => (
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
              ))}
            </div>
          )}
          {modalStep === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                Select the technology you'd like to learn
              </h2>
              <button
                onClick={() => {
                  setTechnology("Python");
                  nextStep();
                }}
                className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg mb-2"
              >
                Python
              </button>
              <button
                onClick={prevStep}
                className="text-sm text-gray-400 hover:text-gray-200 mt-2"
              >
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
              <button
                onClick={() => setShowModal(false)}
                className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={prevStep}
                className="text-sm text-gray-400 hover:text-gray-200 mt-2"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
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
        <div className="mt-4">
          <button
            onClick={runPython}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Run Code
          </button>
          {executionOutput && (
            <pre className="mt-2 bg-gray-800 p-2 rounded text-green-400 whitespace-pre-wrap">
              {executionOutput}
            </pre>
          )}
        </div>
      </div>

      {/* Right: Chat + Instructions */}
      <div className="w-1/2 flex flex-col">
        {/* ChatGPT Panel */}
        <div className="h-1/2 p-4 border-b border-gray-700 flex flex-col">
          {chatError && (
            <div className="mb-2 p-2 bg-red-700 text-white rounded font-bold text-center">
              {chatError}
            </div>
          )}
          <h2 className="text-xl font-bold mb-2">ChatGPT</h2>
          <div className="flex-1 overflow-y-auto border border-gray-600 p-2 mb-2 rounded bg-gray-800">
            {chatLog.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
                <div className="prose prose-invert mt-1">
                  <ReactMarkdown
                    children={msg.content}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeHighlight]}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setChatError("");
              }}
              className="flex-1 border border-gray-600 bg-gray-700 text-white p-2 rounded"
              placeholder="Ask something..."
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="h-1/2 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-2">Instructions</h2>
          {loadingInstructions ? (
            <p>Loading instructions...</p>
          ) : (
            <div className="space-y-2">
              {instructions.map((step, index) => (
                <details
                  key={index}
                  className="bg-gray-800 border border-gray-600 rounded p-4"
                >
                  <summary className="cursor-pointer text-gray-200 font-medium">
                    {`Step ${index + 1}`}
                  </summary>
                  <div className="prose prose-invert mt-2">
                    <ReactMarkdown
                      children={step.trim()}
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeHighlight]}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded">
                      <HelpCircle size={16} />I need help
                    </button>
                    <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                      <CheckCircle size={16} />
                      I've completed this step
                    </button>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
