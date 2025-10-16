import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function StudentsPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

 
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

 
  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col items-center p-8">
      <div className="w-full max-w-6xl text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-md">
          Student List
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage and track all enrolled students easily.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-6xl overflow-hidden border border-blue-100 transition hover:shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-b border-gray-200 gap-3">
          <h2 className="text-2xl font-semibold text-blue-700">Students List</h2>
          <button
            onClick={() => navigate("/addStudent")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-2 rounded-xl hover:from-blue-700 hover:to-blue-600 transition font-semibold shadow-md"
          >
            + Add New Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Year Level</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length > 0 ? (
                students.map((s, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-blue-50/60"
                    } hover:bg-blue-100/70 transition`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3">{s.firstName}</td>
                    <td className="px-6 py-3">{s.lastName}</td>
                    <td className="px-6 py-3">{s.yearLevel}</td>
                    <td className="px-6 py-3">{s.course}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => alert(`Editing ${s.firstName}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg mx-1 transition shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg mx-1 transition shadow-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No students found. Click “Add New Student” to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
