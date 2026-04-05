import { Search, Sparkles, Brain, Trophy, Video, FileEdit } from "lucide-react";
import ToolSection from "../components/Tools";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FF] font-sans text-slate-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-16 pb-20 px-4 text-center">
        {/* Badge */}
        <div className="flex items-center gap-2 bg-[#5A52E5] text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-8 shadow-sm">
          <Sparkles size={16} className="text-yellow-300" />
          AI-POWERED EXAM PLATFORM
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
          Your Smart <span className="text-[#5A52E5]">Exam Partner</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-2xl mb-10">
          Generate question papers, evaluate answers & analyse student
          performance — all in one place.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-[#5A52E5]" size={24} />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 rounded-full border-none shadow-md text-lg focus:ring-2 focus:ring-[#5A52E5] outline-none"
            placeholder="Search subjects, topics, question papers..."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col items-center py-10 px-4">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <Video size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Daily Live</h3>
            <p className="text-sm text-slate-400 mt-1">Interactive classes</p>
          </div>

          <div className="flex flex-col items-center py-10 px-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mb-3 shadow-sm transform rotate-3">
              <FileEdit size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">10 Million +</h3>
            <p className="text-sm text-slate-400 mt-1">
              Tests, sample papers & notes
            </p>
          </div>

          <div className="flex flex-col items-center py-10 px-4">
            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <Brain size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">24 × 7</h3>
            <p className="text-sm text-slate-400 mt-1">
              Doubt solving sessions
            </p>
          </div>

          <div className="flex flex-col items-center py-10 px-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-3 shadow-sm">
              <Trophy size={24} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">100 +</h3>
            <p className="text-sm text-slate-400 mt-1">Offline centres</p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4 bg-[#F8F9FF]">
        <ToolSection />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm bg-[#F8F9FF]">
        © 2026 ParikshaSathi — Smart Exam Platform
      </footer>
    </div>
  );
};
