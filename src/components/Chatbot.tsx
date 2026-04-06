import React, { useState, useEffect, useRef } from "react";
import { Send, X, Bot } from "lucide-react";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


interface QuestionData {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number;
  questionData: QuestionData;
  userSelectedOption?: number;
  examType: string;
  subjects: string[];
}

interface ChatMessage {
  id: string;
  sender: "assistant" | "user";
  text: string;
  isContextBlock?: boolean;
}

interface QuestionContextPayload {
  question: string;
  options: string[];
  userSelectedOption: string | null;
  correctOption: string;
  questionNo: number;
  examType: string;
  subjects: string[];
}

interface ChatRequestPayload {
  question_context: QuestionContextPayload;
  user_query: string;
  history: {
    role: "assistant" | "user";
    content: string;
  }[];
}

const API = import.meta.env.VITE_API_URL;

export default function Chatbot({
  isOpen,
  onClose,
  questionNumber,
  questionData,
  userSelectedOption,
  examType,
  subjects,
}: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset chat and set initial context whenever the active question changes
  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "assistant",
        isContextBlock: true,
        text: `You're asking about Question ${questionNumber}. What didn't you understand about the explanation?`,
      },
    ]);
  }, [questionNumber, questionData]);

  const buildChatHistory = (): { role: "assistant" | "user"; content: string }[] => {
    return messages
      .filter((msg) => !msg.isContextBlock)
      .slice(-5)
      .map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));
  };

  const buildPayload = (userQuery: string) => {
    const payload: ChatRequestPayload = {
      question_context: {
        questionNo: questionNumber,
        question: questionData.text,
        options: questionData.options,
        userSelectedOption:
          userSelectedOption !== undefined
            ? questionData.options[userSelectedOption]
            : null,
        correctOption: questionData.options[questionData.correct],
        examType: examType,
        subjects: subjects,
      },
      user_query: userQuery,
      history: buildChatHistory(),
    };

    return payload;
  };

  const sendQueryToBackend = async (payload: ChatRequestPayload) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API}/gen/api/chat`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const data = response.data.answer;
      return data;
    } catch (error) {
      console.error("Backend error:", error);
      return { answer: "Server error. Please try again." };
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userQuery = inputValue;

    console.log(inputValue);
    // Add user message

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userQuery,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    const payload = buildPayload(userQuery);

    console.log("Sending payload →", payload);
    // Simulate AI response (Replace this with real API call later)

    const backendResponse = await sendQueryToBackend(payload);

    console.log(messages);
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: backendResponse || "I couldn't generate a response for that.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
    console.log(messages);
  };

  return (
    <div
      className={`${
        isOpen ? "w-80 md:w-96 border-l" : "w-0 border-l-0"
      } bg-[#141625] flex flex-col border-slate-800 shrink-0 transition-all duration-300 overflow-hidden`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0B0D17] shrink-0 min-w-[320px]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Bot size={18} />
          </div>
          <h3 className="font-medium text-white">AI Tutor</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-w-[320px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            {/* AI Context Block (Only shows on the first message) */}
            {msg.isContextBlock && (
              <div className="bg-[#1C1F2E] p-4 rounded-2xl rounded-tl-sm border border-slate-800 w-full mb-2 shadow-sm">
                <p className="text-sm text-slate-300 mb-3">
                  You're asking about{" "}
                  <span className="text-emerald-400 font-medium">
                    Question {questionNumber}
                  </span>
                  . Here is the context:
                </p>
                <div className="bg-[#0B0D17] p-3 rounded-xl border border-slate-800/50 mb-3">
                  <p className="text-sm font-medium text-white mb-2">
                    {questionData.text}
                  </p>
                  <ul className="text-xs text-slate-400 space-y-1">
                    {questionData.options.map((opt, i) => (
                      <li
                        key={i}
                        className={
                          questionData.correct === i
                            ? "text-emerald-400 font-medium"
                            : ""
                        }
                      >
                        • {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Standard Chat Bubble */}
            {/* <div
              className={`max-w-[85%] p-3 text-sm rounded-2xl ${
                msg.sender === "user"
                  ? "bg-[#5A52E5] text-white rounded-tr-sm"
                  : "bg-[#1C1F2E] text-slate-200 border border-slate-800 rounded-tl-sm"
              }`}
            >
              {msg.text}
            </div> */}
            <div
              className={`max-w-[85%] p-3 text-sm rounded-2xl ${
                msg.sender === "user"
                  ? "bg-[#5A52E5] text-white rounded-tr-sm"
                  : "bg-[#1C1F2E] text-slate-200 border border-slate-800 rounded-tl-sm"
              }`}
            >
              {msg.sender === "assistant" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-slate-800 px-1 rounded">
                          {children}
                        </code>
                      );
                    },
                  }}
                  // className="prose prose-invert prose-sm max-w-none"
                >
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-slate-800 bg-[#0B0D17] shrink-0 min-w-[320px]">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-[#1C1F2E] rounded-full p-1 pr-2 border border-slate-700 focus-within:border-emerald-500/50 transition-colors"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a doubt..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white px-4 placeholder:text-slate-500 outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-8 h-8 rounded-full bg-[#5A52E5] flex items-center justify-center text-white hover:bg-[#4a43c7] disabled:opacity-50 disabled:hover:bg-[#5A52E5] transition shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
