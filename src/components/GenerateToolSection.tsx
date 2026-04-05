import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GeneratePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Define the mapping of Exam Types to their available subjects
const SUBJECT_MAP = {
  jee: ["Physics", "Chemistry", "Mathematics"],
  neet: ["Physics", "Chemistry", "Biology"],
  cbse: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
};

// Create a type for the keys so TypeScript knows exactly what strings are allowed
type ExamType = keyof typeof SUBJECT_MAP;

export default function GeneratePaperModal({
  isOpen,
  onClose,
}: GeneratePaperModalProps) {
  const navigate = useNavigate();

  // 2. Set up state for tracking user selections and errors
  const [examType, setExamType] = useState<ExamType>("jee");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle changing the exam type dropdown
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExamType(e.target.value as ExamType);
    setSelectedSubjects([]); // Reset selected subjects when type changes
    setErrorMessage(""); // Clear any existing errors
  };

  // Handle checking/unchecking a subject box
  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((s) => s !== subject); // Remove if already checked
      } else {
        return [...prev, subject]; // Add if not checked
      }
    });
    setErrorMessage(""); // Clear error once the user clicks a subject
  };

  // Handle Form Submission
  const handleGenerate = () => {
    // Validation: Ensure at least one subject is checked
    if (selectedSubjects.length === 0) {
      setErrorMessage(
        "Please select at least one subject to generate a paper.",
      );
      return; // Stop execution here
    }

    onClose(); // Close the modal

    // 3. Navigate to the next page and pass the data along in the route state
    navigate("/exam-playground", {
      state: {
        type: examType,
        subjects: selectedSubjects,
      },
    });
  };

  if (!isOpen) return null;

  // Get the available subjects for the currently selected type
  const availableSubjects = SUBJECT_MAP[examType];

  return (
    <div
      className="fixed inset-0 bg-black/40 z-60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Generate Paper
        </h2>

        <div className="space-y-5">
          {/* Type Dropdown */}
          <div>
            <label className="block text-slate-700 text-sm mb-1.5 font-medium">
              Type
            </label>
            <select
              value={examType}
              onChange={handleTypeChange}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5A52E5]/50 focus:border-[#5A52E5] bg-white"
            >
              <option value="jee">JEE</option>
              <option value="neet">NEET</option>
              <option value="cbse">CBSE Boards</option>
            </select>
          </div>

          {/* Dynamic Subjects Checkboxes */}
          <div>
            <label className="block text-slate-700 text-sm mb-2 font-medium">
              Subjects
            </label>
            <div className="grid grid-cols-2 gap-3 text-left">
              {availableSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center gap-2 border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:border-[#5A52E5]/50 transition has-checked:border-[#5A52E5] has-checked:bg-indigo-50/50"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="w-4 h-4 text-[#5A52E5] border-gray-300 rounded focus:ring-[#5A52E5]"
                  />
                  <span className="text-slate-700 text-sm">{subject}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleGenerate}
            className="w-full bg-[#5A52E5] text-white py-3 rounded-lg font-medium hover:bg-[#4a43c7] transition mt-4"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface GeneratePaperModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function GeneratePaperModal({
//   isOpen,
//   onClose,
// }: GeneratePaperModalProps) {
//   const navigate = useNavigate();

//   // Handle Form Submission
//   const handleGenerate = () => {
//     onClose(); // Close the modal first
//     navigate("/exam-playground"); // Navigate to the new page
//   };
//   // If the modal is not open, don't render anything
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 z-60 flex items-center justify-center p-4"
//       onClick={onClose} // Closes modal when clicking the dark overlay
//     >
//       <div
//         className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200"
//         onClick={(e) => e.stopPropagation()} // Prevents clicks inside the white box from closing the modal
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-xl font-bold text-slate-900 mb-6">
//           Generate Paper
//         </h2>

//         {/* Form Elements */}
//         <div className="space-y-5">
//           {/* Type Dropdown */}
//           <div>
//             <label className="block text-slate-700 text-sm mb-1.5 font-medium">
//               Type
//             </label>
//             <select className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#5A52E5]/50 focus:border-[#5A52E5] bg-white">
//               <option value="jee">JEE</option>
//               <option value="neet">NEET</option>
//               <option value="cbse">CBSE Boards</option>
//             </select>
//           </div>

//           {/* Subjects Checkboxes */}
//           <div>
//             <label className="block text-slate-700 text-sm mb-2 font-medium">
//               Subjects
//             </label>
//             <div className="grid grid-cols-2 gap-3 text-left">
//               <label className="flex items-center gap-2 border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:border-[#5A52E5]/50 transition has-:checked:border-[#5A52E5] has-checked:bg-indigo-50/50">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-[#5A52E5] border-gray-300 rounded focus:ring-[#5A52E5]"
//                 />
//                 <span className="text-slate-700 text-sm">Physics</span>
//               </label>

//               <label className="flex items-center gap-2 border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:border-[#5A52E5]/50 transition has-checked:border-[#5A52E5] has-checked:bg-indigo-50/50">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-[#5A52E5] border-gray-300 rounded focus:ring-[#5A52E5]"
//                 />
//                 <span className="text-slate-700 text-sm">Chemistry</span>
//               </label>

//               <label className="flex items-center gap-2 border border-slate-200 p-2.5 rounded-lg cursor-pointer hover:border-[#5A52E5]/50 transition has-checked:border-[#5A52E5] has-checked:bg-indigo-50/50">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 text-[#5A52E5] border-gray-300 rounded focus:ring-[#5A52E5]"
//                 />
//                 <span className="text-slate-700 text-sm">Mathematics</span>
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleGenerate}
//             className="w-full bg-[#5A52E5] text-white py-3 rounded-lg font-medium hover:bg-[#4a43c7] transition mt-4"
//           >
//             Generate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
