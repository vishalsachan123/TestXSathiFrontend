import { UploadCloud } from "lucide-react";

export default function PaperChecker() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] flex flex-col items-center py-12 px-4">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">
        AI Paper Checker
      </h1>

      {/* Upload Container */}
      <div className="w-full max-w-4xl">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-80 bg-white border-2 border-slate-200 border-dashed rounded-3xl cursor-pointer hover:bg-slate-50 hover:border-[#5A52E5] transition-colors group shadow-sm"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            {/* Icon (Using standard Lucide icon with some styling to mimic the 3D one) */}
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <UploadCloud size={32} className="text-[#5A52E5]" />
            </div>

            {/* Text */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Upload Answer Sheet
            </h3>
            <p className="text-sm text-slate-400">
              Drag & drop PDF / image, or click to browse
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,image/*"
          />
        </label>
      </div>
    </div>
  );
}
