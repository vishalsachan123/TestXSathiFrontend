import { useState, useEffect } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function DoubtChat({
  question,
  options,
  selected,
  correct,
  onClose,
}: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      { role: "bot", text: "Hi 👋 Ask me anything about this question" },
      { role: "bot", text: `Q: ${question}` },
      { role: "bot", text: `Your Answer: ${selected ?? "Not answered"}` },
    ]);
  }, [question]);

  async function send() {
    if (!input.trim()) return;

    const userMessage = input;

    // show user message instantly
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/gen/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
          options: options, // ✅ FIXED
          correct: correct,
          user_answer: selected, // ✅ FIXED
          query: userMessage, // ✅ FIXED
        }),
      });

      // ✅ IMPORTANT: backend returns string
      const text = await res.text();

      setMessages((prev) => [...prev, { role: "bot", text: text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Error connecting to server" },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* CHAT PANEL */}
      <div className="relative w-[380px] h-full bg-[#111827] flex flex-col border-l border-gray-700 animate-slideIn">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-700 flex justify-between">
          <span className="font-bold">Ask Doubt</span>
          <button onClick={onClose}>✕</button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-auto space-y-3 text-sm">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                m.role === "user" ? "ml-auto bg-green-600" : "bg-[#1f2937]"
              }`}
            >
              {m.text}
            </div>
          ))}

          {/* LOADING */}
          {loading && (
            <div className="bg-[#1f2937] px-3 py-2 rounded-lg w-fit text-gray-400 animate-pulse">
              Bot is typing...
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-gray-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 p-2 bg-[#1f2937] rounded outline-none"
          />
          <button
            onClick={send}
            disabled={loading}
            className="bg-green-600 px-4 rounded disabled:opacity-50"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
