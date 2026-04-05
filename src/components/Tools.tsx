import { CheckSquare, ClipboardCheck, FileText } from "lucide-react";
import { useState } from "react";
import GeneratePaperModal from "./GenerateToolSection";
import { Link } from "react-router-dom";

export default function ToolSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Choose Your Tool
        </h2>
        <p className="text-slate-500 mb-12">
          Everything you need to create, evaluate, and analyse exams
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* CQuestion Paper */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-t-[#5A52E5] hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-[#5A52E5]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Question Paper
            </h3>
            <p className="text-slate-500 mb-8 min-h-80px">
              Generate AI-powered question papers by subject, topic & type — MCQ
              or subjective.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5A52E5] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#4a43c7] transition flex items-center gap-2"
            >
              Generate Paper &rarr;
            </button>
          </div>

          {/* Model Answer Paper */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-t-orange-400 hover:shadow-md transition">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6">
              <ClipboardCheck className="text-orange-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Model Answer Paper
            </h3>
            <p className="text-slate-500 mb-8 min-h-80px">
              Access detailed model answer sheets with explanations for past
              question papers.
            </p>
            <Link
              to="/model-answers"
              className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2 w-max"
            >
              View Answers &rarr;
            </Link>
          </div>

          {/* Paper Checker */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-t-emerald-400 hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
              <CheckSquare className="text-emerald-500" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Paper Checker
            </h3>
            <p className="text-slate-500 mb-8 min-h-80px">
              Upload answer sheets and let AI evaluate them instantly with
              detailed feedback.
            </p>
            <Link
              to="/paper-checker"
              className="bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition flex items-center justify-center gap-2 w-max"
            >
              Check Paper &rarr;
            </Link>
          </div>
        </div>
      </div>

      <GeneratePaperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
