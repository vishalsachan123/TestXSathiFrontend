import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ExamResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the structured data passed from ExamPlayground
  const {
    results = [],
    stats = null,
    ai_feedback = null,
  } = location.state || {};

  // Safety fallback if someone navigates here directly without taking a test
  if (!stats) {
    return (
      <div className="min-h-screen bg-[#0B0D17] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Result Data Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-[#5A52E5] px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((stats.score / stats.total) * 100);
  const feedbackMap = new Map();

  ai_feedback?.wrong_questions_feedback?.forEach((item: any) => {
    feedbackMap.set(item.questionNumber, item);
  });

  return (
    <div className="min-h-screen bg-[#0B0D17] text-slate-200 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Test Results Summary
          </h1>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#141625] border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm mb-1">Total Score</p>
            <p className="text-3xl font-bold text-white">
              {stats.score}{" "}
              <span className="text-lg text-slate-500">/ {stats.total}</span>
            </p>
          </div>
          <div className="bg-[#141625] border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm mb-1">Accuracy</p>
            <p className="text-3xl font-bold text-[#5A52E5]">{percentage}%</p>
          </div>
          <div className="bg-[#141625] border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm mb-1">Attempted</p>
            <p className="text-3xl font-bold text-emerald-400">
              {stats.attempted}
            </p>
          </div>
          <div className="bg-[#141625] border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center">
            <p className="text-slate-400 text-sm mb-1">Unattempted</p>
            <p className="text-3xl font-bold text-slate-400">
              {stats.unattempted}
            </p>
          </div>
        </div>

        {ai_feedback && (
          <div className="mb-10 bg-[#141625] border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-white mb-4">
              AI Analysis
            </h2>

            <div className="mb-4">
              <p className="text-red-400 font-medium mb-2">Weaknesses</p>
              <ul className="list-disc pl-5 text-sm text-slate-300">
                {ai_feedback?.final_summary?.weaknesses?.map(
                  (w: string, i: number) => (
                    <li key={i}>{w}</li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <p className="text-emerald-400 font-medium mb-2">Suggestions</p>
              <ul className="list-disc pl-5 text-sm text-slate-300">
                {ai_feedback?.final_summary?.suggestions?.map(
                  (s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Detailed Review Section */}
        <h2 className="text-xl font-semibold text-white mb-6">
          Detailed Review
        </h2>
        <div className="space-y-6 pb-20">
          {/* Map through the structured results array */}
          {results.map((item: any, index: number) => {
            const isCorrect = item.userResponse === item.correctAnswer;
            const isSkipped = item.userResponse === null;

            const ai = !isCorrect ? feedbackMap.get(item.questionNumber) : null;

            return (
              <div
                key={index}
                className="bg-[#141625] border border-slate-800 rounded-2xl p-6"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#252836] flex items-center justify-center text-sm font-bold text-slate-300 shrink-0">
                      {item.questionNumber}
                    </div>
                    <p className="text-lg text-white mt-1">
                      {item.questionText}
                    </p>
                  </div>

                  {/* Status Badge */}
                  {isSkipped ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-sm font-medium shrink-0">
                      <AlertCircle size={16} /> Skipped
                    </span>
                  ) : isCorrect ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium shrink-0">
                      <CheckCircle2 size={16} /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium shrink-0">
                      <XCircle size={16} /> Incorrect
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="pl-12 grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {item.options.map((opt: string, optIdx: number) => {
                    let style =
                      "bg-[#1C1F2E] text-slate-400 border border-transparent";
                    let marker = "";

                    if (optIdx === item.correctAnswer) {
                      style =
                        "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium";
                      marker = "(Correct Answer)";
                    } else if (optIdx === item.userResponse && !isCorrect) {
                      style = "bg-red-500/10 border-red-500 text-red-400";
                      marker = "(Your Answer)";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg text-sm flex justify-between items-center ${style}`}
                      >
                        <span>{opt}</span>
                        <span className="text-xs opacity-80">{marker}</span>
                      </div>
                    );
                  })}
                </div>

                {/* AI Feedback Block */}
                {ai && (
                  <div className="ml-12 mt-4 bg-[#252836] border border-slate-700 p-4 rounded-xl">
                    <span className="text-yellow-400 text-sm font-semibold block mb-2">
                      AI Feedback
                    </span>

                    <p className="text-slate-300 text-sm mb-3">{ai.feedback}</p>

                    <ul className="list-disc pl-5 text-slate-400 text-sm space-y-1">
                      {ai.steps.map((step: string, idx: number) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Explanation Block */}
                <div className="ml-12 mt-3 bg-[#1C1F2E] border border-slate-700/50 p-4 rounded-xl">
                  <span className="text-emerald-400 text-sm font-semibold block mb-1">
                    Explanation
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
