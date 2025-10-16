import { BrowserRouter, Routes, Route } from "react-router";
import StudentsPage from "./pages/studentspage"
import AddStudentsPage from "./pages/AddStudentsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/addStudent" element={<AddStudentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}