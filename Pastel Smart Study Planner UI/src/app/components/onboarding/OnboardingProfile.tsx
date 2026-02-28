import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, BookOpen, Plus, X, ChevronRight } from "lucide-react";

const semesters = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
];

const subjectColors = [
  "from-purple-200 to-purple-300",
  "from-pink-200 to-pink-300",
  "from-blue-200 to-blue-300",
  "from-green-200 to-green-300",
  "from-yellow-200 to-yellow-300",
  "from-red-200 to-red-300",
];

export function OnboardingProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");

  const addSubject = () => {
    if (newSubject.trim() && subjects.length < 6) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    if (name && semester && subjects.length > 0) {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-y-auto pb-24">
      <div className="w-full max-w-md space-y-6 mt-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-200 to-purple-200">
            <GraduationCap className="w-12 h-12 text-purple-600" />
          </div>
          <h1
            className="text-4xl text-purple-800"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Set up your profile
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Let's get to know you better!
          </p>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-gray-700 pl-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-6 py-4 rounded-3xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all"
            style={{ fontFamily: "Nunito, sans-serif" }}
          />
        </div>

        {/* Semester Selection */}
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-gray-700 pl-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Current Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-6 py-4 rounded-3xl bg-white shadow-md border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all appearance-none"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            <option value="">Select semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Subjects */}
        <div className="space-y-3">
          <label
            className="text-sm font-semibold text-gray-700 pl-2"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Your Subjects
          </label>
          
          {/* Add Subject Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSubject()}
              placeholder="Add a subject"
              className="flex-1 px-6 py-3 rounded-full bg-white shadow-md border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
            />
            <button
              onClick={addSubject}
              className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Subject Tags */}
          <div className="flex flex-wrap gap-2 min-h-[60px]">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${
                  subjectColors[index % subjectColors.length]
                } shadow-md`}
              >
                <BookOpen className="w-4 h-4 text-gray-700" />
                <span
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {subject}
                </span>
                <button
                  onClick={() => removeSubject(index)}
                  className="hover:bg-white/50 rounded-full p-1 transition-all"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={handleComplete}
          disabled={!name || !semester || subjects.length === 0}
          className={`w-full py-4 rounded-full font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-8 ${
            name && semester && subjects.length > 0
              ? "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Get Started
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
