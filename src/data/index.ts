// // import type { Question, SearchResult, Paper } from "../types";


// interface QuestionBank {
//   [type: string]: {
//     [subject: string]: Question[];
//   };
// }

// export const QUESTION_BANK = {
//   JEE: {
//     Physics: [
//       {
//         text: "A body thrown upward reaches max height:",
//         options: ["u/g", "u²/2g", "u²/g", "2u/g"],
//         correct: 1,
//         explanation:
//           "At max height v = 0. Using v² = u² - 2gh → h = u²/2g",
//       },
//       {
//         text: "Unit of force?",
//         options: ["Joule", "Newton", "Watt", "Pascal"],
//         correct: 1,
//         explanation: "Force = mass × acceleration → unit is Newton",
//       },
//       {
//         text: "Acceleration due to gravity (g) approx:",
//         options: ["10 m/s²", "9.8 m/s²", "8 m/s²", "12 m/s²"],
//         correct: 1,
//         explanation: "Standard value of g = 9.8 m/s² near Earth surface",
//       },
//       {
//         text: "Work done formula?",
//         options: ["F × d", "m × a", "v × t", "F / d"],
//         correct: 0,
//         explanation: "Work = Force × displacement",
//       },
//       {
//         text: "Velocity is:",
//         options: [
//           "Scalar",
//           "Vector",
//           "Constant",
//           "Dimensionless",
//         ],
//         correct: 1,
//         explanation: "Velocity has magnitude and direction → vector",
//       },
//     ],

//     Chemistry: [
//       {
//         text: "Atomic number represents:",
//         options: ["Neutrons", "Protons", "Electrons", "Mass"],
//         correct: 1,
//         explanation: "Atomic number = number of protons",
//       },
//       {
//         text: "pH of neutral solution:",
//         options: ["0", "7", "14", "1"],
//         correct: 1,
//         explanation: "Neutral solution has pH = 7",
//       },
//       {
//         text: "Avogadro number is:",
//         options: ["6.02×10²³", "10²³", "6×10²²", "1×10²³"],
//         correct: 0,
//         explanation: "Avogadro number = 6.02×10²³ particles/mol",
//       },
//       {
//         text: "HCl is:",
//         options: ["Base", "Acid", "Salt", "Neutral"],
//         correct: 1,
//         explanation: "HCl donates H+ → strong acid",
//       },
//       {
//         text: "Periodic table arranged by:",
//         options: ["Mass", "Atomic number", "Density", "Volume"],
//         correct: 1,
//         explanation: "Modern periodic table is based on atomic number",
//       },
//     ],

//     Mathematics: [
//       {
//         text: "Derivative of x²?",
//         options: ["x", "2x", "x²", "2"],
//         correct: 1,
//         explanation: "d/dx(x²) = 2x",
//       },
//       {
//         text: "sin²x + cos²x = ?",
//         options: ["0", "1", "2", "-1"],
//         correct: 1,
//         explanation: "Basic identity: sin²x + cos²x = 1",
//       },
//       {
//         text: "Integral of 1 dx?",
//         options: ["x", "1", "0", "x²"],
//         correct: 0,
//         explanation: "∫1 dx = x",
//       },
//       {
//         text: "Value of π approx:",
//         options: ["3.14", "2.14", "4.13", "3.41"],
//         correct: 0,
//         explanation: "π ≈ 3.14159",
//       },
//       {
//         text: "log(1) = ?",
//         options: ["0", "1", "-1", "10"],
//         correct: 0,
//         explanation: "log(1) = 0 for any base",
//       },
//     ],
//   },

//   NEET: {
//     Physics: [
//       {
//         text: "Speed = ?",
//         options: ["d/t", "t/d", "d*t", "none"],
//         correct: 0,
//         explanation: "Speed = distance / time",
//       },
//       {
//         text: "SI unit of energy:",
//         options: ["Joule", "Newton", "Watt", "Pascal"],
//         correct: 0,
//         explanation: "Energy measured in Joules",
//       },
//       {
//         text: "Force formula:",
//         options: ["m×a", "m/a", "a/m", "v×t"],
//         correct: 0,
//         explanation: "Newton’s second law: F = ma",
//       },
//       {
//         text: "Power formula:",
//         options: ["W/t", "t/W", "F×d", "m×a"],
//         correct: 0,
//         explanation: "Power = Work / Time",
//       },
//       {
//         text: "Momentum = ?",
//         options: ["mv", "m/a", "v/m", "F×t"],
//         correct: 0,
//         explanation: "Momentum = mass × velocity",
//       },
//     ],

//     Chemistry: [
//       {
//         text: "H2O is:",
//         options: ["Acid", "Base", "Neutral", "Salt"],
//         correct: 2,
//         explanation: "Pure water is neutral",
//       },
//       {
//         text: "NaCl is:",
//         options: ["Acid", "Base", "Salt", "Neutral"],
//         correct: 2,
//         explanation: "NaCl is a salt",
//       },
//       {
//         text: "pH < 7 means:",
//         options: ["Acidic", "Basic", "Neutral", "Salt"],
//         correct: 0,
//         explanation: "pH less than 7 → acidic",
//       },
//       {
//         text: "Oxygen valency:",
//         options: ["1", "2", "3", "4"],
//         correct: 1,
//         explanation: "Oxygen has valency 2",
//       },
//       {
//         text: "Carbon atomic number:",
//         options: ["6", "12", "8", "14"],
//         correct: 0,
//         explanation: "Carbon atomic number is 6",
//       },
//     ],

//     Biology: [
//       {
//         text: "Cell is unit of:",
//         options: ["Life", "Energy", "Mass", "Force"],
//         correct: 0,
//         explanation: "Cell is basic unit of life",
//       },
//       {
//         text: "DNA stands for:",
//         options: [
//           "Deoxyribo Nucleic Acid",
//           "Dynamic Acid",
//           "Double Acid",
//           "None",
//         ],
//         correct: 0,
//         explanation: "DNA = Deoxyribonucleic Acid",
//       },
//       {
//         text: "Heart pumps:",
//         options: ["Blood", "Water", "Oxygen", "Air"],
//         correct: 0,
//         explanation: "Heart circulates blood",
//       },
//       {
//         text: "Plant food process:",
//         options: ["Photosynthesis", "Respiration", "Digestion", "Growth"],
//         correct: 0,
//         explanation: "Plants make food by photosynthesis",
//       },
//       {
//         text: "Human brain part:",
//         options: ["Cerebrum", "Leaf", "Root", "Stem"],
//         correct: 0,
//         explanation: "Cerebrum is part of brain",
//       },
//     ],
//   },
// };


// // export const QUESTIONS: Question[] = [
// //   { text: "A body thrown vertically upward with velocity u reaches maximum height:", options: ["u/g", "u²/2g", "u²/g", "2u/g"], correct: 1 },
// //   { text: "Work done in moving charge Q through potential difference V is:", options: ["Q/V", "V/Q", "QV", "Q²V"], correct: 2 },
// //   { text: "Which of the following is NOT a scalar quantity?", options: ["Mass", "Temperature", "Velocity", "Energy"], correct: 2 },
// //   { text: "The SI unit of electric charge is:", options: ["Ampere", "Coulomb", "Volt", "Watt"], correct: 1 },
// //   { text: "Newton's second law: force equals:", options: ["Mass×Distance", "Mass×Velocity", "Mass×Acceleration", "Mass×Speed"], correct: 2 },
// // ];

// export const SEARCH_DATA: SearchResult[] = [
//   { id: 1, name: "Physics – Mechanics & Motion",  meta: "Class 11 · 45 Questions", icon: "⚛️" },
//   { id: 2, name: "Chemistry – Organic Reactions", meta: "Class 12 · 38 Questions", icon: "🧪" },
//   { id: 3, name: "Mathematics – Calculus",        meta: "Class 12 · 52 Questions", icon: "📐" },
//   { id: 4, name: "Biology – Cell Structure",      meta: "Class 11 · 30 Questions", icon: "🔬" },
//   { id: 5, name: "Physics – Electrostatics",      meta: "Class 12 · 40 Questions", icon: "⚡" },
// ];

// export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];
// export const TOPICS   = ["Mechanics", "Thermodynamics", "Electrostatics", "Optics", "Modern Physics"];
// export const CHIPS    = ["Physics", "Chemistry", "Maths", "Biology", "All Subjects"];

// export const PAPERS: Paper[] = [
//   { id: 1, title: "Physics Class 12 — Board 2024",  icon: "⚛️", tags: ["Board", "12th"] },
//   { id: 2, title: "JEE Mains Jan 2025 — Paper 1",  icon: "📐", tags: ["JEE", "Mains"]  },
//   { id: 3, title: "NEET 2024 — Biology Section",    icon: "🔬", tags: ["NEET", "Bio"]   },
//   { id: 4, title: "Chemistry Class 11 — Midterm",  icon: "🧪", tags: ["School", "11th"] },
// ];

// export const STATS = [
//   { ico: "🔴", val: "Daily Live",   sub: "Interactive classes" },
//   { ico: "📝", val: "10 Million +", sub: "Tests, sample papers & notes" },
//   { ico: "🧠", val: "24 × 7",       sub: "Doubt solving sessions" },
//   { ico: "🏆", val: "100 +",        sub: "Offline centres" },
// ];
