import { useState, useMemo } from "react";
import axios from "axios";
import {
  ArrowLeft,
  MessageCircle,
  Menu,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { QUESTION_BANK } from "../data/questionBank";
import Chatbot from "../components/Chatbot";
import Swal from "sweetalert2";

const API = import.meta.env.VITE_API_URL;

export default function ExamPlayground() {
  const navigate = useNavigate();
  const location = useLocation();

  const { type = "jee", subjects = ["Physics"] } = location.state || {};

  const questions = useMemo(() => {
    const examTypeKey = type.toUpperCase();
    const bank = QUESTION_BANK[examTypeKey];
    if (!bank) return [];
    return subjects.flatMap((subject: string) => bank[subject] || []);
  }, [type, subjects]);

  const totalQuestions = questions.length;

  // --- State Management ---
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<
    Record<number, boolean>
  >({});

  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const currentQuestionIndex = activeQuestion - 1;
  const currentQuestionData = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isCurrentSubmitted = submittedQuestions[currentQuestionIndex];

  // --- Handlers ---
  const handleOptionSelect = (optionIndex: number) => {
    if (isCurrentSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleQuestionSubmit = () => {
    if (currentAnswer !== undefined) {
      setSubmittedQuestions((prev) => ({
        ...prev,
        [currentQuestionIndex]: true,
      }));
    }
  };

  //   const handleFinalSubmit = () => {
  //     const finalResults = questions.map((q, idx) => ({
  //       questionNumber: idx + 1,
  //       questionText: q.text,
  //       options: q.options,
  //       correctAnswer: q.correct,
  //       userResponse: answers[idx] !== undefined ? answers[idx] : null,
  //       explanation: q.explanation,
  //     }));

  //     const score = finalResults.filter(
  //       (r) => r.userResponse === r.correctAnswer,
  //     ).length;

  //     navigate("/exam-result", {
  //       state: {
  //         results: finalResults,
  //         stats: {
  //           score,
  //           total: totalQuestions,
  //           attempted: answeredCount,
  //           unattempted: unansweredCount,
  //         },
  //       },
  //     });
  //   };
const handleFinalSubmit = () => {
  Swal.fire({
    title: "Submit Exam?",
    text: "Once submitted, you cannot change your answers.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Submit",
    cancelButtonText: "Review Answers",
    confirmButtonColor: "#5A52E5",
    cancelButtonColor: "#6b7280",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const finalResults = questions.map((q: any, idx: number) => ({
        questionNumber: idx + 1,
        questionText: q.text,
        options: q.options,
        correctAnswer: q.correct,
        userResponse: answers[idx] !== undefined ? answers[idx] : null,
        explanation: q.explanation,
      }));

      try {
        const response = await axios.post(
          `${API}/gen/evaluateAnswers`,
          {
            results: finalResults,
            exam: type.toUpperCase(),
            subject: subjects
          }
        );

        console.log("Backend Response 👉", response.data);

        // ✅ FIX: use inside try
        const data = response.data.data;

        const score = finalResults.filter(
          (r: any) => r.userResponse === r.correctAnswer
        ).length;

        navigate("/exam-result", {
          state: {
            results: finalResults,
            stats: {
              score,
              total: totalQuestions,
              attempted: answeredCount,
              unattempted: unansweredCount,
            },
            ai_feedback: data, // ✅ pass AI response
          },
        });

      } catch (error) {
        console.error("API Error ❌", error);
      }
    }
  });
};
  if (totalQuestions === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B0D17] text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">
            No questions found for this selection.
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#5A52E5] px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#0B0D17] text-slate-200 font-sans overflow-hidden">
      {/* --- Sidebar (Collapsible) --- */}
      <div
        className={`${isSidebarOpen ? "w-64 border-r" : "w-0 border-r-0"} bg-[#141625] flex flex-col border-slate-800 shrink-0 transition-all duration-300 overflow-hidden`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center gap-2 min-w-[256px]">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-semibold text-white">
            Questions ({totalQuestions})
          </h2>
        </div>

        <div className="p-4 grid grid-cols-5 gap-3 overflow-y-auto min-w-[256px] flex-1 content-start">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
            (num) => {
              const hasAnswer = answers[num - 1] !== undefined;
              const isSub = submittedQuestions[num - 1];
              const isActive = activeQuestion === num;

              let buttonStyle =
                "bg-[#252836] text-slate-300 hover:bg-[#32364a]";
              if (isActive)
                buttonStyle =
                  "bg-[#5A52E5] text-white ring-2 ring-[#5A52E5] ring-offset-2 ring-offset-[#141625]";
              else if (isSub)
                buttonStyle =
                  "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50";
              else if (hasAnswer)
                buttonStyle =
                  "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50";

              return (
                <button
                  key={num}
                  onClick={() => setActiveQuestion(num)}
                  className={`h-10 rounded-lg text-sm font-medium transition ${buttonStyle}`}
                >
                  {num}
                </button>
              );
            },
          )}
        </div>

        <div className="p-4 border-t border-slate-800 text-sm space-y-1 shrink-0 min-w-[256px]">
          <div className="flex justify-between">
            <span className="text-slate-400">Answered</span>
            <span className="text-emerald-500 font-medium">
              {answeredCount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Unanswered</span>
            <span className="text-red-500 font-medium">{unansweredCount}</span>
          </div>
        </div>

        <button
          onClick={handleFinalSubmit}
          className="w-full py-4 bg-[#5A52E5] text-white font-bold hover:bg-[#4a43c7] transition shrink-0 min-w-[256px]"
        >
          Submit Full Test
        </button>
      </div>

      {/* --- Main Area --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-white">
              Question {activeQuestion} / {totalQuestions}
            </h2>
          </div>
          <span className="text-slate-400 font-medium text-sm">4 Marks</span>
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto pb-40">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl text-white mb-8 leading-relaxed">
              {currentQuestionData.text}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQuestionData.options.map((opt: string, idx: number) => {
                const isSelected = currentAnswer === idx;
                const isCorrect = currentQuestionData.correct === idx;

                let labelStyle =
                  "bg-[#1C1F2E] border-transparent hover:border-slate-700 hover:bg-[#25293C]";
                if (isCurrentSubmitted) {
                  if (isCorrect)
                    labelStyle =
                      "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                  else if (isSelected)
                    labelStyle = "bg-red-500/10 border-red-500 text-red-400";
                  else
                    labelStyle = "bg-[#1C1F2E] border-transparent opacity-50";
                } else if (isSelected) {
                  labelStyle = "bg-[#5A52E5]/20 border-[#5A52E5] text-white";
                }

                return (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition ${labelStyle} ${isCurrentSubmitted ? "cursor-default" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        disabled={isCurrentSubmitted}
                        name={`question-${activeQuestion}`}
                        checked={isSelected}
                        onChange={() => handleOptionSelect(idx)}
                        className="w-4 h-4 text-[#5A52E5] bg-slate-800 border-slate-600 focus:ring-[#5A52E5] disabled:opacity-50"
                      />
                      <span
                        className={
                          isCurrentSubmitted && isCorrect ? "font-semibold" : ""
                        }
                      >
                        {opt}
                      </span>
                    </div>
                    {isCurrentSubmitted && isCorrect && (
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    )}
                    {isCurrentSubmitted && isSelected && !isCorrect && (
                      <XCircle size={20} className="text-red-500" />
                    )}
                  </label>
                );
              })}
            </div>

            <div className="mt-8">
              {!isCurrentSubmitted ? (
                <button
                  onClick={handleQuestionSubmit}
                  disabled={currentAnswer === undefined}
                  className="px-6 py-3 bg-[#5A52E5] text-white rounded-xl font-medium hover:bg-[#4a43c7] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-6 bg-[#252836] rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="text-emerald-400 font-semibold mb-2">
                    Explanation
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {currentQuestionData.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-6 border-t border-slate-800 bg-[#0B0D17] flex items-center justify-between shrink-0">
          <button
            disabled={activeQuestion === 1}
            onClick={() => setActiveQuestion((prev) => Math.max(1, prev - 1))}
            className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-40"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setActiveQuestion((prev) => Math.min(totalQuestions, prev + 1))
            }
            className="px-6 py-2 rounded-lg border border-slate-600 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2"
          >
            {activeQuestion === totalQuestions ? "Finish" : "Next →"}
          </button>
        </div>

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          disabled={!isCurrentSubmitted}
          title={
            !isCurrentSubmitted
              ? "Submit answer first to ask doubts"
              : "Ask AI tutor about this"
          }
          className={`absolute bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all z-10 ${
            isCurrentSubmitted
              ? "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 cursor-pointer"
              : "bg-slate-700 opacity-40 cursor-not-allowed"
          } ${isChatOpen ? "bg-slate-800 ring-4 ring-emerald-500/30" : ""}`}
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* --- 2. Implement the new Chatbot Component Here --- */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        questionNumber={activeQuestion}
        questionData={currentQuestionData}
      />
    </div>
  );
}

// -------------------------------------------------------------------------------

// import React, { useState, useMemo } from "react";
// import {
//   ArrowLeft,
//   MessageCircle,
//   Menu,
//   CheckCircle2,
//   XCircle,
//   Send,
//   X,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// import { QUESTION_BANK } from "../data/questionbank";

// export default function ExamPlayground() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { type = "jee", subjects = ["Physics"] } = location.state || {};

//   const questions = useMemo(() => {
//     const examTypeKey = type.toUpperCase();
//     const bank = QUESTION_BANK[examTypeKey];
//     if (!bank) return [];
//     return subjects.flatMap((subject: string) => bank[subject] || []);
//   }, [type, subjects]);

//   const totalQuestions = questions.length;

//   // --- State Management ---
//   const [activeQuestion, setActiveQuestion] = useState(1);
//   const [answers, setAnswers] = useState<Record<number, number>>({});
//   const [submittedQuestions, setSubmittedQuestions] = useState<
//     Record<number, boolean>
//   >({});

//   // UI States
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false); // Controls chat window visibility

//   const answeredCount = Object.keys(answers).length;
//   const unansweredCount = totalQuestions - answeredCount;

//   const currentQuestionIndex = activeQuestion - 1;
//   const currentQuestionData = questions[currentQuestionIndex];
//   const currentAnswer = answers[currentQuestionIndex];
//   const isCurrentSubmitted = submittedQuestions[currentQuestionIndex];

//   // --- Handlers ---
//   const handleOptionSelect = (optionIndex: number) => {
//     if (isCurrentSubmitted) return;
//     setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
//   };

//   const handleQuestionSubmit = () => {
//     if (currentAnswer !== undefined) {
//       setSubmittedQuestions((prev) => ({
//         ...prev,
//         [currentQuestionIndex]: true,
//       }));
//     }
//   };

//   // FEATURE 3 & 4: Final Submit Logic
//   const handleFinalSubmit = () => {
//     // Compile all data into the required structured format
//     const finalResults = questions.map((q, idx) => ({
//       questionNumber: idx + 1,
//       questionText: q.text,
//       options: q.options,
//       correctAnswer: q.correct,
//       userResponse: answers[idx] !== undefined ? answers[idx] : null,
//       explanation: q.explanation,
//     }));

//     // Calculate score
//     const score = finalResults.filter(
//       (r) => r.userResponse === r.correctAnswer,
//     ).length;

//     // Navigate to the Results page and pass the data
//     navigate("/exam-result", {
//       state: {
//         results: finalResults,
//         stats: {
//           score,
//           total: totalQuestions,
//           attempted: answeredCount,
//           unattempted: unansweredCount,
//         },
//       },
//     });
//   };

//   if (totalQuestions === 0) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0B0D17] text-white">
//         <div className="text-center">
//           <h2 className="text-2xl mb-4">
//             No questions found for this selection.
//           </h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-[#5A52E5] px-6 py-2 rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-[#0B0D17] text-slate-200 font-sans overflow-hidden">
//       {/* --- Sidebar (Collapsible) --- */}
//       <div
//         className={`${isSidebarOpen ? "w-64 border-r" : "w-0 border-r-0"} bg-[#141625] flex flex-col border-slate-800 shrink-0 transition-all duration-300 overflow-hidden`}
//       >
//         <div className="p-4 border-b border-slate-800 flex items-center gap-2 min-w-[256px]">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-slate-400 hover:text-white transition"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <h2 className="font-semibold text-white">
//             Questions ({totalQuestions})
//           </h2>
//         </div>

//         <div className="p-4 grid grid-cols-5 gap-3 overflow-y-auto min-w-[256px] flex-1">
//           {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
//             (num) => {
//               const hasAnswer = answers[num - 1] !== undefined;
//               const isSub = submittedQuestions[num - 1];
//               const isActive = activeQuestion === num;

//               let buttonStyle =
//                 "bg-[#252836] text-slate-300 hover:bg-[#32364a]";
//               if (isActive)
//                 buttonStyle =
//                   "bg-[#5A52E5] text-white ring-2 ring-[#5A52E5] ring-offset-2 ring-offset-[#141625]";
//               else if (isSub)
//                 buttonStyle =
//                   "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50";
//               else if (hasAnswer)
//                 buttonStyle =
//                   "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50";

//               return (
//                 <button
//                   key={num}
//                   onClick={() => setActiveQuestion(num)}
//                   className={`h-10 rounded-lg text-sm font-medium transition ${buttonStyle}`}
//                 >
//                   {num}
//                 </button>
//               );
//             },
//           )}
//         </div>

//         <div className="p-4 border-t border-slate-800 text-sm space-y-1 shrink-0 min-w-[256px]">
//           <div className="flex justify-between">
//             <span className="text-slate-400">Answered</span>
//             <span className="text-emerald-500 font-medium">
//               {answeredCount}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-400">Unanswered</span>
//             <span className="text-red-500 font-medium">{unansweredCount}</span>
//           </div>
//         </div>

//         {/* Final Submit Button */}
//         <button
//           onClick={handleFinalSubmit}
//           className="w-full py-4 bg-[#5A52E5] text-white font-bold hover:bg-[#4a43c7] transition shrink-0 min-w-[256px]"
//         >
//           Submit Full Test
//         </button>
//       </div>

//       {/* --- Main Area --- */}
//       <div className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
//         <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
//             >
//               <Menu size={20} />
//             </button>
//             <h2 className="text-lg font-semibold text-white">
//               Question {activeQuestion} / {totalQuestions}
//             </h2>
//           </div>
//           <span className="text-slate-400 font-medium text-sm">4 Marks</span>
//         </div>

//         <div className="flex-1 p-6 md:p-10 overflow-y-auto pb-40">
//           <div className="max-w-4xl mx-auto">
//             <h3 className="text-xl text-white mb-8 leading-relaxed">
//               {currentQuestionData.text}
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {currentQuestionData.options.map((opt, idx) => {
//                 const isSelected = currentAnswer === idx;
//                 const isCorrect = currentQuestionData.correct === idx;

//                 let labelStyle =
//                   "bg-[#1C1F2E] border-transparent hover:border-slate-700 hover:bg-[#25293C]";
//                 if (isCurrentSubmitted) {
//                   if (isCorrect)
//                     labelStyle =
//                       "bg-emerald-500/10 border-emerald-500 text-emerald-400";
//                   else if (isSelected)
//                     labelStyle = "bg-red-500/10 border-red-500 text-red-400";
//                   else
//                     labelStyle = "bg-[#1C1F2E] border-transparent opacity-50";
//                 } else if (isSelected) {
//                   labelStyle = "bg-[#5A52E5]/20 border-[#5A52E5] text-white";
//                 }

//                 return (
//                   <label
//                     key={idx}
//                     className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition ${labelStyle} ${isCurrentSubmitted ? "cursor-default" : ""}`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <input
//                         type="radio"
//                         disabled={isCurrentSubmitted}
//                         name={`question-${activeQuestion}`}
//                         checked={isSelected}
//                         onChange={() => handleOptionSelect(idx)}
//                         className="w-4 h-4 text-[#5A52E5] bg-slate-800 border-slate-600 focus:ring-[#5A52E5] disabled:opacity-50"
//                       />
//                       <span
//                         className={
//                           isCurrentSubmitted && isCorrect ? "font-semibold" : ""
//                         }
//                       >
//                         {opt}
//                       </span>
//                     </div>
//                     {isCurrentSubmitted && isCorrect && (
//                       <CheckCircle2 size={20} className="text-emerald-500" />
//                     )}
//                     {isCurrentSubmitted && isSelected && !isCorrect && (
//                       <XCircle size={20} className="text-red-500" />
//                     )}
//                   </label>
//                 );
//               })}
//             </div>

//             <div className="mt-8">
//               {!isCurrentSubmitted ? (
//                 <button
//                   onClick={handleQuestionSubmit}
//                   disabled={currentAnswer === undefined}
//                   className="px-6 py-3 bg-[#5A52E5] text-white rounded-xl font-medium hover:bg-[#4a43c7] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Submit Answer
//                 </button>
//               ) : (
//                 <div className="p-6 bg-[#252836] rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
//                   <h4 className="text-emerald-400 font-semibold mb-2">
//                     Explanation
//                   </h4>
//                   <p className="text-slate-300 leading-relaxed">
//                     {currentQuestionData.explanation}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-6 border-t border-slate-800 bg-[#0B0D17] flex items-center justify-between shrink-0">
//           <button
//             disabled={activeQuestion === 1}
//             onClick={() => setActiveQuestion((prev) => Math.max(1, prev - 1))}
//             className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-40"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() =>
//               setActiveQuestion((prev) => Math.min(totalQuestions, prev + 1))
//             }
//             className="px-6 py-2 rounded-lg border border-slate-600 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2"
//           >
//             {activeQuestion === totalQuestions ? "Finish" : "Next →"}
//           </button>
//         </div>

//         {/* Chat Toggle Button */}
//         <button
//           onClick={() => setIsChatOpen(!isChatOpen)}
//           disabled={!isCurrentSubmitted}
//           title={
//             !isCurrentSubmitted
//               ? "Submit answer first to ask doubts"
//               : "Ask AI tutor about this"
//           }
//           className={`absolute bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all z-10 ${
//             isCurrentSubmitted
//               ? "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 cursor-pointer"
//               : "bg-slate-700 opacity-40 cursor-not-allowed"
//           } ${isChatOpen ? "bg-slate-800 ring-4 ring-emerald-500/30" : ""}`}
//         >
//           {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
//         </button>
//       </div>

//       {/* --- FEATURE 1 & 2: Chat Side Panel --- */}
//       <div
//         className={`${isChatOpen ? "w-80 md:w-96 border-l" : "w-0 border-l-0"} bg-[#141625] flex flex-col border-slate-800 shrink-0 transition-all duration-300 overflow-hidden`}
//       >
//         {/* Chat Header */}
//         <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0B0D17] shrink-0 min-w-[320px]">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
//               <MessageCircle size={18} />
//             </div>
//             <h3 className="font-medium text-white">AI Tutor</h3>
//           </div>
//           <button
//             onClick={() => setIsChatOpen(false)}
//             className="text-slate-400 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-4 min-w-[320px]">
//           <div className="bg-[#1C1F2E] p-4 rounded-2xl rounded-tl-sm border border-slate-800">
//             <p className="text-sm text-slate-300 mb-3">
//               You're asking about{" "}
//               <span className="text-emerald-400 font-medium">
//                 Question {activeQuestion}
//               </span>
//               . Here is the context:
//             </p>
//             <div className="bg-[#0B0D17] p-3 rounded-xl border border-slate-800/50">
//               <p className="text-sm font-medium text-white mb-2">
//                 {currentQuestionData.text}
//               </p>
//               <ul className="text-xs text-slate-400 space-y-1">
//                 {currentQuestionData.options.map((opt, i) => (
//                   <li
//                     key={i}
//                     className={
//                       currentQuestionData.correct === i
//                         ? "text-emerald-400"
//                         : ""
//                     }
//                   >
//                     • {opt}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <p className="text-sm text-slate-300 mt-3">
//               What didn't you understand about the explanation?
//             </p>
//           </div>
//         </div>

//         {/* Chat Input */}
//         <div className="p-4 border-t border-slate-800 bg-[#0B0D17] shrink-0 min-w-[320px]">
//           <div className="flex items-center gap-2 bg-[#1C1F2E] rounded-full p-1 pr-2 border border-slate-700">
//             <input
//               type="text"
//               placeholder="Ask a doubt..."
//               className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white px-4 placeholder:text-slate-500"
//             />
//             <button className="w-8 h-8 rounded-full bg-[#5A52E5] flex items-center justify-center text-white hover:bg-[#4a43c7] transition shrink-0">
//               <Send size={14} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ----------------------------------------------------------------------------------------

// import React, { useState, useMemo } from "react";
// import {
//   ArrowLeft,
//   MessageCircle,
//   Menu,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// // Import the data from your new file (adjust the path as needed)
// import { QUESTION_BANK } from "../data/questionbank";

// export default function ExamPlayground() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract data passed from the modal (with safe fallbacks)
//   const { type = "jee", subjects = ["Physics"] } = location.state || {};

//   // Combine all questions for the selected subjects into one array
//   const questions = useMemo(() => {
//     const examTypeKey = type.toUpperCase();
//     const bank = QUESTION_BANK[examTypeKey];
//     if (!bank) return [];
//     return subjects.flatMap((subject: string) => bank[subject] || []);
//   }, [type, subjects]);

//   const totalQuestions = questions.length;

//   // --- State Management ---
//   const [activeQuestion, setActiveQuestion] = useState(1);
//   const [answers, setAnswers] = useState<Record<number, number>>({});

//   // New States for Features
//   const [submittedQuestions, setSubmittedQuestions] = useState<
//     Record<number, boolean>
//   >({});
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   // Calculate Stats
//   const answeredCount = Object.keys(answers).length;
//   const unansweredCount = totalQuestions - answeredCount;

//   // Derived states for the CURRENT question
//   const currentQuestionIndex = activeQuestion - 1;
//   const currentQuestionData = questions[currentQuestionIndex];
//   const currentAnswer = answers[currentQuestionIndex];
//   const isCurrentSubmitted = submittedQuestions[currentQuestionIndex];

//   // Handle option selection
//   const handleOptionSelect = (optionIndex: number) => {
//     // Prevent changing answer if already submitted
//     if (isCurrentSubmitted) return;

//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestionIndex]: optionIndex,
//     }));
//   };

//   // Handle Submission of single question
//   const handleQuestionSubmit = () => {
//     if (currentAnswer !== undefined) {
//       setSubmittedQuestions((prev) => ({
//         ...prev,
//         [currentQuestionIndex]: true,
//       }));
//     }
//   };

//   // Render empty state if no questions
//   if (totalQuestions === 0) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0B0D17] text-white">
//         <div className="text-center">
//           <h2 className="text-2xl mb-4">
//             No questions found for this selection.
//           </h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-[#5A52E5] px-6 py-2 rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-[#0B0D17] text-slate-200 font-sans overflow-hidden">
//       {/* --- Sidebar (Collapsible) --- */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-64" : "w-0 border-r-0"
//         } bg-[#141625] flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 overflow-hidden`}
//       >
//         <div className="p-4 border-b border-slate-800 flex items-center gap-2 min-w-[256px]">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-slate-400 hover:text-white transition"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <h2 className="font-semibold text-white">
//             Questions ({totalQuestions})
//           </h2>
//         </div>

//         {/* Question Grid */}
//         <div className="p-4 grid grid-cols-5 gap-3 overflow-y-auto min-w-[256px]">
//           {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
//             (num) => {
//               const hasAnswer = answers[num - 1] !== undefined;
//               const isSub = submittedQuestions[num - 1];
//               const isActive = activeQuestion === num;

//               let buttonStyle =
//                 "bg-[#252836] text-slate-300 hover:bg-[#32364a]";
//               if (isActive) {
//                 buttonStyle =
//                   "bg-[#5A52E5] text-white ring-2 ring-[#5A52E5] ring-offset-2 ring-offset-[#141625]";
//               } else if (isSub) {
//                 // Show checkmark colors only if it's submitted
//                 buttonStyle =
//                   "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50";
//               } else if (hasAnswer) {
//                 // Answered but not submitted yet
//                 buttonStyle =
//                   "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50";
//               }

//               return (
//                 <button
//                   key={num}
//                   onClick={() => setActiveQuestion(num)}
//                   className={`h-10 rounded-lg text-sm font-medium transition ${buttonStyle}`}
//                 >
//                   {num}
//                 </button>
//               );
//             },
//           )}
//         </div>

//         {/* Status */}
//         <div className="p-4 border-t border-slate-800 text-sm space-y-1 mt-auto shrink-0 min-w-[256px]">
//           <div className="flex justify-between">
//             <span className="text-slate-400">Answered</span>
//             <span className="text-emerald-500 font-medium">
//               {answeredCount}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-400">Unanswered</span>
//             <span className="text-red-500 font-medium">{unansweredCount}</span>
//           </div>
//         </div>

//         <button className="w-full py-4 bg-[#5A52E5] text-white font-bold hover:bg-[#4a43c7] transition shrink-0 min-w-[256px]">
//           Submit Full Test
//         </button>
//       </div>

//       {/* --- Main Area --- */}
//       <div className="flex-1 flex flex-col relative overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
//           <div className="flex items-center gap-4">
//             {/* Sidebar Toggle Arrow */}
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
//             >
//               <Menu size={20} />
//             </button>
//             <h2 className="text-lg font-semibold text-white">
//               Question {activeQuestion} / {totalQuestions}
//             </h2>
//           </div>
//           <span className="text-slate-400 font-medium text-sm">4 Marks</span>
//         </div>

//         {/* Question Section */}
//         <div className="flex-1 p-10 max-w-4xl overflow-y-auto pb-40">
//           <h3 className="text-xl text-white mb-8 leading-relaxed">
//             {currentQuestionData.text}
//           </h3>

//           {/* Options Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {currentQuestionData.options.map((opt, idx) => {
//               const isSelected = currentAnswer === idx;
//               const isCorrect = currentQuestionData.correct === idx;

//               // Dynamic styling based on Submission state
//               let labelStyle =
//                 "bg-[#1C1F2E] border-transparent hover:border-slate-700 hover:bg-[#25293C]";

//               if (isCurrentSubmitted) {
//                 if (isCorrect) {
//                   labelStyle =
//                     "bg-emerald-500/10 border-emerald-500 text-emerald-400";
//                 } else if (isSelected) {
//                   labelStyle = "bg-red-500/10 border-red-500 text-red-400";
//                 } else {
//                   labelStyle = "bg-[#1C1F2E] border-transparent opacity-50";
//                 }
//               } else if (isSelected) {
//                 labelStyle = "bg-[#5A52E5]/20 border-[#5A52E5] text-white";
//               }

//               return (
//                 <label
//                   key={idx}
//                   className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition ${labelStyle} ${isCurrentSubmitted ? "cursor-default" : ""}`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="radio"
//                       disabled={isCurrentSubmitted}
//                       name={`question-${activeQuestion}`}
//                       checked={isSelected}
//                       onChange={() => handleOptionSelect(idx)}
//                       className="w-4 h-4 text-[#5A52E5] bg-slate-800 border-slate-600 focus:ring-[#5A52E5] disabled:opacity-50"
//                     />
//                     <span
//                       className={
//                         isCurrentSubmitted && isCorrect ? "font-semibold" : ""
//                       }
//                     >
//                       {opt}
//                     </span>
//                   </div>

//                   {/* Show Icons if submitted */}
//                   {isCurrentSubmitted && isCorrect && (
//                     <CheckCircle2 size={20} className="text-emerald-500" />
//                   )}
//                   {isCurrentSubmitted && isSelected && !isCorrect && (
//                     <XCircle size={20} className="text-red-500" />
//                   )}
//                 </label>
//               );
//             })}
//           </div>

//           {/* Per-Question Actions (Submit & Explanation) */}
//           <div className="mt-8">
//             {!isCurrentSubmitted ? (
//               <button
//                 onClick={handleQuestionSubmit}
//                 disabled={currentAnswer === undefined}
//                 className="px-6 py-3 bg-[#5A52E5] text-white rounded-xl font-medium hover:bg-[#4a43c7] transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Submit Answer
//               </button>
//             ) : (
//               <div className="p-6 bg-[#252836] rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
//                 <h4 className="text-emerald-400 font-semibold mb-2">
//                   Explanation
//                 </h4>
//                 <p className="text-slate-300 leading-relaxed">
//                   {currentQuestionData.explanation}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="absolute bottom-0 left-0 right-0 px-10 py-6 border-t border-slate-800 bg-[#0B0D17] flex items-center justify-between shrink-0">
//           <button
//             disabled={activeQuestion === 1}
//             onClick={() => setActiveQuestion((prev) => Math.max(1, prev - 1))}
//             className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-40"
//           >
//             Previous
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() =>
//                 setActiveQuestion((prev) => Math.min(totalQuestions, prev + 1))
//               }
//               className="px-6 py-2 rounded-lg border border-slate-600 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2"
//             >
//               {activeQuestion === totalQuestions ? "Finish" : "Next →"}
//             </button>
//           </div>
//         </div>

//         {/* Contextual Chat Bubble */}
//         <button
//           disabled={!isCurrentSubmitted}
//           title={
//             !isCurrentSubmitted
//               ? "Submit answer first to ask doubts"
//               : "Ask AI tutor about this"
//           }
//           className={`absolute bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all z-10 ${
//             isCurrentSubmitted
//               ? "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 cursor-pointer"
//               : "bg-slate-700 opacity-40 cursor-not-allowed"
//           }`}
//         >
//           <MessageCircle size={28} />
//         </button>
//       </div>
//     </div>
//   );
// }

// --------------------------------------------------------------------

// import React, { useState, useMemo } from "react";
// import { ArrowLeft, MessageCircle } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// // 1. Import the data from your new file (adjust the path as needed)
// import { QUESTION_BANK } from "../data/questionbank";

// export default function ExamPlayground() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Extract data passed from the modal (with safe fallbacks)
//   const { type = "jee", subjects = ["Physics"] } = location.state || {};

//   // Combine all questions for the selected subjects into one array
//   const questions = useMemo(() => {
//     const examTypeKey = type.toUpperCase();
//     const bank = QUESTION_BANK[examTypeKey];

//     if (!bank) return [];

//     return subjects.flatMap((subject: string) => bank[subject] || []);
//   }, [type, subjects]);

//   const totalQuestions = questions.length;

//   // State Management
//   const [activeQuestion, setActiveQuestion] = useState(1);
//   const [answers, setAnswers] = useState<Record<number, number>>({});

//   // Calculate Stats
//   const answeredCount = Object.keys(answers).length;
//   const unansweredCount = totalQuestions - answeredCount;

//   // Handle option selection
//   const handleOptionSelect = (optionIndex: number) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [activeQuestion - 1]: optionIndex,
//     }));
//   };

//   // Render empty state if no questions
//   if (totalQuestions === 0) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#0B0D17] text-white">
//         <div className="text-center">
//           <h2 className="text-2xl mb-4">
//             No questions found for this selection.
//           </h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-[#5A52E5] px-6 py-2 rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const currentQuestionData = questions[activeQuestion - 1];

//   return (
//     <div className="h-screen flex bg-[#0B0D17] text-slate-200 font-sans overflow-hidden">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#141625] flex flex-col border-r border-slate-800 shrink-0">
//         <div className="p-4 border-b border-slate-800 flex items-center gap-2">
//           <button
//             onClick={() => navigate(-1)}
//             className="text-slate-400 hover:text-white transition"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <h2 className="font-semibold text-white">
//             Questions ({totalQuestions})
//           </h2>
//         </div>

//         {/* Question Grid */}
//         <div className="p-4 grid grid-cols-5 gap-3 overflow-y-auto">
//           {Array.from({ length: totalQuestions }, (_, i) => i + 1).map(
//             (num) => {
//               const isAnswered = answers[num - 1] !== undefined;
//               const isActive = activeQuestion === num;

//               let buttonStyle =
//                 "bg-[#252836] text-slate-300 hover:bg-[#32364a]";
//               if (isActive) {
//                 buttonStyle =
//                   "bg-[#5A52E5] text-white ring-2 ring-[#5A52E5] ring-offset-2 ring-offset-[#141625]";
//               } else if (isAnswered) {
//                 buttonStyle =
//                   "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50";
//               }

//               return (
//                 <button
//                   key={num}
//                   onClick={() => setActiveQuestion(num)}
//                   className={`h-10 rounded-lg text-sm font-medium transition ${buttonStyle}`}
//                 >
//                   {num}
//                 </button>
//               );
//             },
//           )}
//         </div>

//         {/* Status */}
//         <div className="p-4 border-t border-slate-800 text-sm space-y-1 mt-auto shrink-0">
//           <div className="flex justify-between">
//             <span className="text-slate-400">Answered</span>
//             <span className="text-emerald-500 font-medium">
//               {answeredCount}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-slate-400">Unanswered</span>
//             <span className="text-red-500 font-medium">{unansweredCount}</span>
//           </div>
//         </div>

//         <button className="w-full py-4 bg-[#5A52E5] text-white font-bold hover:bg-[#4a43c7] transition shrink-0">
//           Submit Test
//         </button>
//       </div>

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col relative overflow-hidden">
//         <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0">
//           <h2 className="text-lg font-semibold text-white">
//             Question {activeQuestion} / {totalQuestions}
//           </h2>
//           <span className="text-slate-400 font-medium text-sm">4 Marks</span>
//         </div>

//         {/* Question Section */}
//         <div className="flex-1 p-10 max-w-4xl overflow-y-auto pb-32">
//           <h3 className="text-xl text-white mb-8">
//             {currentQuestionData.text}
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {currentQuestionData.options.map((opt, idx) => {
//               const isSelected = answers[activeQuestion - 1] === idx;

//               return (
//                 <label
//                   key={idx}
//                   className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition ${
//                     isSelected
//                       ? "bg-[#5A52E5]/10 border-[#5A52E5]"
//                       : "bg-[#1C1F2E] border-transparent hover:border-slate-700 hover:bg-[#25293C]"
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${activeQuestion}`}
//                     checked={isSelected}
//                     onChange={() => handleOptionSelect(idx)}
//                     className="w-4 h-4 text-[#5A52E5] bg-slate-800 border-slate-600 focus:ring-[#5A52E5]"
//                   />
//                   <span className="text-slate-200">{opt}</span>
//                 </label>
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Navigation */}
//         <div className="absolute bottom-0 left-0 right-0 px-10 py-6 border-t border-slate-800 bg-[#0B0D17] flex items-center justify-between shrink-0">
//           <button
//             disabled={activeQuestion === 1}
//             onClick={() => setActiveQuestion((prev) => Math.max(1, prev - 1))}
//             className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition disabled:opacity-40"
//           >
//             Previous
//           </button>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() =>
//                 setActiveQuestion((prev) => Math.min(totalQuestions, prev + 1))
//               }
//               className="px-6 py-2 rounded-lg border border-slate-600 text-white font-medium hover:bg-slate-800 transition flex items-center gap-2"
//             >
//               {activeQuestion === totalQuestions ? "Finish" : "Next →"}
//             </button>
//           </div>
//         </div>

//         <button className="absolute bottom-24 right-6 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-emerald-600 transition hover:scale-105 z-10">
//           <MessageCircle size={24} />
//         </button>
//       </div>
//     </div>
//   );
// }
