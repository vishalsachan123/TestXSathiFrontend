// data/questionBank.ts

export interface Question {
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuestionBank {
  [type: string]: {
    [subject: string]: Question[];
  };
}

export const QUESTION_BANK: QuestionBank = {
  JEE: {
    Physics: [
      {
        text: "A body thrown upward reaches max height:",
        options: ["u/g", "u²/2g", "u²/g", "2u/g"],
        correct: 1,
        explanation: "At max height v = 0. Using v² = u² - 2gh → h = u²/2g",
      },
      {
        text: "Unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 1,
        explanation: "Force = mass × acceleration → unit is Newton",
      },
      {
        text: "Acceleration due to gravity (g) approx:",
        options: ["10 m/s²", "9.8 m/s²", "8 m/s²", "12 m/s²"],
        correct: 1,
        explanation: "Standard value of g = 9.8 m/s² near Earth surface",
      },
      {
        text: "Work done formula?",
        options: ["F × d", "m × a", "v × t", "F / d"],
        correct: 0,
        explanation: "Work = Force × displacement",
      },
      {
        text: "Velocity is:",
        options: ["Scalar", "Vector", "Constant", "Dimensionless"],
        correct: 1,
        explanation: "Velocity has magnitude and direction → vector",
      },
    ],
    Chemistry: [
      {
        text: "Atomic number represents:",
        options: ["Neutrons", "Protons", "Electrons", "Mass"],
        correct: 1,
        explanation: "Atomic number = number of protons",
      },
      {
        text: "pH of neutral solution:",
        options: ["0", "7", "14", "1"],
        correct: 1,
        explanation: "Neutral solution has pH = 7",
      },
      {
        text: "Avogadro number is:",
        options: ["6.02×10²³", "10²³", "6×10²²", "1×10²³"],
        correct: 0,
        explanation: "Avogadro number = 6.02×10²³ particles/mol",
      },
      {
        text: "HCl is:",
        options: ["Base", "Acid", "Salt", "Neutral"],
        correct: 1,
        explanation: "HCl donates H+ → strong acid",
      },
      {
        text: "Periodic table arranged by:",
        options: ["Mass", "Atomic number", "Density", "Volume"],
        correct: 1,
        explanation: "Modern periodic table is based on atomic number",
      },
    ],
    Mathematics: [
      {
        text: "Derivative of x²?",
        options: ["x", "2x", "x²", "2"],
        correct: 1,
        explanation: "d/dx(x²) = 2x",
      },
      {
        text: "sin²x + cos²x = ?",
        options: ["0", "1", "2", "-1"],
        correct: 1,
        explanation: "Basic identity: sin²x + cos²x = 1",
      },
      {
        text: "Integral of 1 dx?",
        options: ["x", "1", "0", "x²"],
        correct: 0,
        explanation: "∫1 dx = x",
      },
      {
        text: "Value of π approx:",
        options: ["3.14", "2.14", "4.13", "3.41"],
        correct: 0,
        explanation: "π ≈ 3.14159",
      },
      {
        text: "log(1) = ?",
        options: ["0", "1", "-1", "10"],
        correct: 0,
        explanation: "log(1) = 0 for any base",
      },
    ],
  },
  NEET: {
    Physics: [
      {
        text: "Speed = ?",
        options: ["d/t", "t/d", "d*t", "none"],
        correct: 0,
        explanation: "Speed = distance / time",
      },
      {
        text: "SI unit of energy:",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 0,
        explanation: "Energy measured in Joules",
      },
      {
        text: "Force formula:",
        options: ["m×a", "m/a", "a/m", "v×t"],
        correct: 0,
        explanation: "Newton’s second law: F = ma",
      },
      {
        text: "Power formula:",
        options: ["W/t", "t/W", "F×d", "m×a"],
        correct: 0,
        explanation: "Power = Work / Time",
      },
      {
        text: "Momentum = ?",
        options: ["mv", "m/a", "v/m", "F×t"],
        correct: 0,
        explanation: "Momentum = mass × velocity",
      },
    ],
    Chemistry: [
      {
        text: "H2O is:",
        options: ["Acid", "Base", "Neutral", "Salt"],
        correct: 2,
        explanation: "Pure water is neutral",
      },
      {
        text: "NaCl is:",
        options: ["Acid", "Base", "Salt", "Neutral"],
        correct: 2,
        explanation: "NaCl is a salt",
      },
      {
        text: "pH < 7 means:",
        options: ["Acidic", "Basic", "Neutral", "Salt"],
        correct: 0,
        explanation: "pH less than 7 → acidic",
      },
      {
        text: "Oxygen valency:",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "Oxygen has valency 2",
      },
      {
        text: "Carbon atomic number:",
        options: ["6", "12", "8", "14"],
        correct: 0,
        explanation: "Carbon atomic number is 6",
      },
    ],
    Biology: [
      {
        text: "Cell is unit of:",
        options: ["Life", "Energy", "Mass", "Force"],
        correct: 0,
        explanation: "Cell is basic unit of life",
      },
      {
        text: "DNA stands for:",
        options: [
          "Deoxyribo Nucleic Acid",
          "Dynamic Acid",
          "Double Acid",
          "None",
        ],
        correct: 0,
        explanation: "DNA = Deoxyribonucleic Acid",
      },
      {
        text: "Heart pumps:",
        options: ["Blood", "Water", "Oxygen", "Air"],
        correct: 0,
        explanation: "Heart circulates blood",
      },
      {
        text: "Plant food process:",
        options: ["Photosynthesis", "Respiration", "Digestion", "Growth"],
        correct: 0,
        explanation: "Plants make food by photosynthesis",
      },
      {
        text: "Human brain part:",
        options: ["Cerebrum", "Leaf", "Root", "Stem"],
        correct: 0,
        explanation: "Cerebrum is part of brain",
      },
    ],
  },
};
