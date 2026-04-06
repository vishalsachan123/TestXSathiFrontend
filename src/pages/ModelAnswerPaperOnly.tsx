import jsPDF from "jspdf";

type Question = {
  answer: string;
  explanation: string[];
};

export default function ModelAnswerPage() {
  const questions: Question[] = [
    {
      answer: "(D) r²ω² / 2g",
      explanation: ["mgh = 1/2 Iω²", "= 1/2 × mr² ω²", "h = r²ω² / 2g"],
    },
    {
      answer: "(A) N^(1/3)",
      explanation: [
        "When a droplet of radius R is broken into N small droplets total volume remains constant.",
        "4/3 πR³ = N × 4/3 πr³",
        "r = R / N^(1/3)",
        "Work done = change in surface energy",
        "W = 4πR²T (N^(1/3) − 1)",
      ],
    },
    {
      answer: "(D) 54.88 N",
      explanation: [
        "Water compartment pressure P = hρg",
        "= 4 × 1.0×10³ × 9.8",
        "= 39.2 × 10³ Pa",
        "Acid compartment pressure P' = 66.64 × 10³ Pa",
        "Force = pressure × area",
        "F = 54.88 N",
      ],
    },
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Model Answer Paper", 10, y);
    y += 10;

    questions.forEach((q, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${q.answer}`, 10, y);
      y += 6;

      doc.text("Explanation:", 10, y);
      y += 6;

      q.explanation.forEach((line) => {
        doc.text(line, 15, y);
        y += 6;
      });

      y += 4;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("model-answer-paper.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Paper Checker
        </h1>

        <p className="text-gray-500 mt-2">
          Select a paper to view model answers with step-by-step explanations.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mb-10">
        <button className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
          Upload Answer Paper
        </button>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Upload Question Paper
        </button>
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={index} className="border-b pb-6">
              <p className="font-semibold text-gray-800">
                {index + 1}. {q.answer}
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <p className="font-semibold">Explanation:</p>

                {q.explanation.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={downloadPDF}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Download Question Paper
          </button>
        </div>
      </div>
    </div>
  );
}
