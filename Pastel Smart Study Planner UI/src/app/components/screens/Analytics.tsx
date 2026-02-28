import { ArrowLeft, TrendingUp, Clock, CheckCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 4.5 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 2.5 },
];

const subjectData = [
  { name: "Math", value: 35, color: "#c084fc" },
  { name: "Physics", value: 25, color: "#93c5fd" },
  { name: "Chemistry", value: 20, color: "#86efac" },
  { name: "English", value: 20, color: "#fdba74" },
];

const progressData = [
  { week: "W1", progress: 65 },
  { week: "W2", progress: 72 },
  { week: "W3", progress: 78 },
  { week: "W4", progress: 87 },
];

export function Analytics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1
            className="text-3xl text-white flex-1"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Study Analytics
          </h1>
        </div>
        <p
          className="text-purple-100 text-sm ml-14"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Track your progress and insights
        </p>
      </div>

      <div className="px-6 space-y-6 mt-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-purple-700" />
            </div>
            <p
              className="text-3xl font-bold text-purple-600 mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              25.6
            </p>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Hours This Week
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-700" />
            </div>
            <p
              className="text-3xl font-bold text-green-600 mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              42
            </p>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Tasks Completed
            </p>
          </div>
        </div>

        {/* Weekly Study Hours */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h2
              className="text-xl text-gray-800"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Weekly Study Hours
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5ff" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="hours" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2
              className="text-xl text-gray-800"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Subject Distribution
            </h2>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {subjectData.map((subject) => (
              <div key={subject.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
                <span
                  className="text-sm text-gray-700"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {subject.name} ({subject.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Trend */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Progress Trend
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e5ff" />
              <XAxis
                dataKey="week"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#c084fc"
                strokeWidth={3}
                dot={{ fill: "#c084fc", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Subject Performance
          </h2>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", score: 92, color: "purple" },
              { subject: "Physics", score: 87, color: "blue" },
              { subject: "Chemistry", score: 85, color: "green" },
              { subject: "English", score: 90, color: "pink" },
            ].map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between items-center mb-2">
                  <span
                    className="text-sm font-semibold text-gray-700"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.subject}
                  </span>
                  <span
                    className="text-sm font-bold text-purple-600"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.score}%
                  </span>
                </div>
                <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.color === "purple"
                        ? "bg-gradient-to-r from-purple-400 to-purple-500"
                        : item.color === "blue"
                        ? "bg-gradient-to-r from-blue-400 to-blue-500"
                        : item.color === "green"
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gradient-to-r from-pink-400 to-pink-500"
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
