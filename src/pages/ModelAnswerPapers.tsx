import { Atom, Ruler, Microscope, FlaskConical } from "lucide-react";

export default function ModelAnswerPapers() {
  // Array of data for easy mapping and scaling
  const papers = [
    {
      id: 1,
      title: "Physics Class 12 — Board 2024",
      tags: "Board • 12th",
      icon: Atom,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 2,
      title: "JEE Mains Jan 2025 — Paper 1",
      tags: "JEE • Mains",
      icon: Ruler,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      id: 3,
      title: "NEET 2024 — Biology Section",
      tags: "NEET • Bio",
      icon: Microscope,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: 4,
      title: "Chemistry Class 11 — Midterm",
      tags: "School • 11th",
      icon: FlaskConical,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Model Answer Papers
          </h1>
          <p className="text-slate-500">
            Select a paper to view model answers with step-by-step explanations.
          </p>
        </div>

        {/* List of Papers */}
        <div className="space-y-4">
          {papers.map((paper) => (
            <div 
              key={paper.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition gap-4"
            >
              
              {/* Left Side: Icon & Text */}
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${paper.iconBg}`}>
                  <paper.icon className={paper.iconColor} size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-0.5">
                    {paper.tags}
                  </p>
                </div>
              </div>

              {/* Right Side: Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 shrink-0 sm:w-auto w-full">
                View &rarr;
              </button>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}