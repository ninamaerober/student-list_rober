import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast"; 

export default function AddStudentsPage() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    yearLevel: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      const updatedStudents = [...storedStudents, student];
      localStorage.setItem("students", JSON.stringify(updatedStudents));

      
      toast.success(`${student.firstName} ${student.lastName} has been added!`, {
        icon: "✅",
        duration: 2500,
        style: {
          borderRadius: "10px",
          background: "#4ADE80",
          color: "#fff",
        },
      });

      setLoading(false);
      setTimeout(() => navigate("/"), 1500); // Redirect after short delay
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Toast Container */}

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl transition hover:shadow-blue-200">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            Add New Student
          </h1>
          <p className="text-gray-500">
            Fill out the form below to add a student record.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={student.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Enter first name"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={student.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              placeholder="Enter last name"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Year Level</label>
            <select
              name="yearLevel"
              value={student.yearLevel}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
              disabled={loading}
            >
              <option value="">Select Year Level</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-1">Course</label>
            <select
              name="course"
              value={student.course}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
              disabled={loading}
            >
              <option value="">Select Course</option>
              <option value="BSIT">BSIT - Bachelor of Science in Information Technology</option>
              <option value="BSCS">BSCS - Bachelor of Science in Computer Science</option>
              <option value="BSEMC">BSEMC - Bachelor of Science in Entertainment and Multimedia Computing</option>
              <option value="BSIS">BSIS - Bachelor of Science in Information Systems</option>
              <option value="BSCpE">BSCpE - Bachelor of Science in Computer Engineering</option>
              <option value="BSBA">BSBA - Bachelor of Science in Business Administration</option>
              <option value="BEED">BEED - Bachelor of Elementary Education</option>
              <option value="BSED">BSED - Bachelor of Secondary Education</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-xl font-semibold transition transform active:scale-95 shadow-md 
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"}`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                "Save Student"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
