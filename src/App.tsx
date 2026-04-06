import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";

import { HomePage } from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Navbar from "./components/Navbar";

// import ModelAnswerPapers from "./pages/ModelAnswerPapers";
import PaperChecker from "./pages/PaperChecker";
import ExamPlayground from "./pages/ExamPlayground";
import ExamResult from "./pages/ExamResult";
import ProtectedRoute from "./components/ProtectedRoute";
import QuestionPaperPage from "./pages/ModelAnswerPaperSample";

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Pages WITH Navbar */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      {/* Pages WITHOUT Navbar */}
      {/* <Route path="/model-answers" element={<ModelAnswerPapers />} />
      <Route path="/paper-checker" element={<PaperChecker />} />
      <Route path="/exam-playground" element={<ExamPlayground />} />
      <Route path="/exam-result" element={<ExamResult/>}/> */}

      <Route element={<ProtectedRoute />}>
        <Route path="/model-answers" element={<QuestionPaperPage />} />
        {/* <Route path="/model-answers" element={<ModelAnswerPapers />} /> */}
        <Route path="/paper-checker" element={<PaperChecker />} />
        <Route path="/exam-playground" element={<ExamPlayground />} />
        <Route path="/exam-result" element={<ExamResult />} />
      </Route>
    </Routes>
  );
}
