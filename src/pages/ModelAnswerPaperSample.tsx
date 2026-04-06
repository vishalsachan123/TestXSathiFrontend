import jsPDF from "jspdf";

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export default function QuestionPaperPage() {
  const questions: Question[] = [
    {
      question:
        "The ratio of LCM and HCF of the least composite and the least prime numbers is",
      options: ["1:2", "2:1", "1:1", "1:3"],
      answer: "(b) 2:1",
      explanation:
        "Least prime number = 2, Least composite number = 4. LCM(2,4)=4 and HCF(2,4)=2. Ratio = 4:2 = 2:1.",
    },
    {
      question:
        "The value of k for which the lines 5x+7y=3 and 15x+21y=k coincide is",
      options: ["9", "5", "7", "18"],
      answer: "(a) 9",
      explanation:
        "For two lines to coincide, coefficients must be proportional. Multiply the first equation by 3: 15x+21y=9. Therefore k = 9.",
    },
    {
      question:
        "A girl walks 200m East and then 150m North. Distance from start?",
      options: ["350m", "250m", "300m", "225m"],
      answer: "(b) 250m",
      explanation:
        "Using Pythagoras theorem: √(200² + 150²) = √(40000 + 22500) = √62500 = 250m.",
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

      doc.text(`${index + 1}. ${q.question}`, 10, y);
      y += 6;

      doc.text(`(a) ${q.options[0]}`, 15, y);
      y += 6;

      doc.text(`(b) ${q.options[1]}`, 15, y);
      y += 6;

      doc.text(`(c) ${q.options[2]}`, 15, y);
      y += 6;

      doc.text(`(d) ${q.options[3]}`, 15, y);
      y += 6;

      doc.text(`Correct Answer: ${q.answer}`, 15, y);
      y += 6;

      doc.text(`Explanation: ${q.explanation}`, 15, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("question-paper.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Model Answer Papers
        </h1>

        <p className="text-gray-500 mt-2">
          Select a paper to view model answers with step-by-step explanations.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mb-10">
        <button className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
          Question Paper History
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
              {/* Question */}
              <p className="font-semibold text-gray-800">
                {index + 1}. {q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-gray-700">
                <div>(a) {q.options[0]}</div>
                <div>(b) {q.options[1]}</div>
                <div>(c) {q.options[2]}</div>
                <div>(d) {q.options[3]}</div>
              </div>

              {/* Correct Answer */}
              <div className="mt-4 text-green-700 font-medium">
                Correct Answer: {q.answer}
              </div>

              {/* Explanation */}
              <div className="mt-2 bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                <span className="font-semibold">Explanation:</span>{" "}
                {q.explanation}
              </div>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="flex justify-end mt-8">
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
            onClick={downloadPDF}
          >
            Download Model Paper
          </button>
        </div>
      </div>
    </div>
  );
}
