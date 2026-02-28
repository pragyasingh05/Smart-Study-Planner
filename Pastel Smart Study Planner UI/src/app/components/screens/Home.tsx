import { useState } from "react";
import { BottomNav } from "../BottomNav";
import {
  Plus,
  Bell,
  Calendar,
  Clock,
  Flame,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Progress } from "../../components/ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AddTaskDialog } from "../dialogs/AddTaskDialog";

const motivationalQuotes = [
  "You've got this! 💫",
  "Small progress is still progress! ✨",
  "Believe in yourself! 🌟",
  "One step at a time! 🌈",
  "You're doing amazing! 💖",
];

const todaySchedule = [
  {
    time: "09:00 AM",
    subject: "Mathematics",
    type: "Class",
    color: "purple",
    completed: true,
  },
  {
    time: "11:00 AM",
    subject: "Physics Lab",
    type: "Lab",
    color: "blue",
    completed: true,
  },
  {
    time: "02:00 PM",
    subject: "Study Session",
    type: "Focus",
    color: "pink",
    completed: false,
  },
  {
    time: "04:00 PM",
    subject: "Chemistry",
    type: "Class",
    color: "green",
    completed: false,
  },
];

const upcomingDeadlines = [
  {
    task: "Physics Assignment",
    due: "Tomorrow",
    priority: "high",
    subject: "Physics",
  },
  {
    task: "Math Quiz",
    due: "3 days",
    priority: "medium",
    subject: "Mathematics",
  },
  {
    task: "Chemistry Report",
    due: "5 days",
    priority: "low",
    subject: "Chemistry",
  },
];

export function Home() {
  const navigate = useNavigate();
  const [quote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const completedTasks = todaySchedule.filter((item) => item.completed).length;
  const totalTasks = todaySchedule.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const addTask = (newTask: {
    title: string;
    subject: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    type: "assignment" | "quiz" | "exam" | "project";
  }) => {
    // Task added successfully
    console.log("New task added:", newTask);
  };

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1
              className="text-3xl text-white mb-1"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Hi, Sarah! ✨
            </h1>
            <p
              className="text-purple-100 text-sm"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Saturday, February 28
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Bell className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Motivational Quote Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1770732418392-9577e8bf9b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwa2F3YWlpJTIwc3R1ZHklMjBtYXNjb3QlMjBjaGFyYWN0ZXIlMjBwYXN0ZWx8ZW58MXx8fHwxNzcyMjQ5NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Study mascot"
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="text-white text-lg flex-1"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 600 }}
          >
            {quote}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-6 mt-6">
        {/* Today's Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-xl text-gray-800"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Today's Progress
            </h2>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span
                className="text-sm font-bold text-orange-500"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                7 day streak!
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span
                className="text-sm text-gray-600"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {completedTasks} of {totalTasks} tasks completed
              </span>
              <span
                className="text-sm font-bold text-purple-600"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-purple-100" />
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-xl text-gray-800"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Today's Schedule
            </h2>
            <button
              onClick={() => navigate("/calendar")}
              className="text-sm text-purple-500 font-semibold"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  item.completed ? "bg-gray-50" : "bg-gradient-to-r from-purple-50 to-pink-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
                    item.color === "purple"
                      ? "from-purple-200 to-purple-300"
                      : item.color === "blue"
                      ? "from-blue-200 to-blue-300"
                      : item.color === "pink"
                      ? "from-pink-200 to-pink-300"
                      : "from-green-200 to-green-300"
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-700" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold ${
                      item.completed ? "text-gray-400 line-through" : "text-gray-800"
                    }`}
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.subject}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span
                      className="text-xs text-gray-500"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {item.time} • {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2
              className="text-xl text-gray-800"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Upcoming Deadlines
            </h2>
            <button
              onClick={() => navigate("/tasks")}
              className="text-sm text-purple-500 font-semibold"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              See All
            </button>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.priority === "high"
                      ? "bg-red-400"
                      : item.priority === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />
                <div className="flex-1">
                  <h3
                    className="font-semibold text-gray-800"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.task}
                  </h3>
                  <p
                    className="text-xs text-gray-500 mt-1"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.subject}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm font-semibold text-gray-700"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {item.due}
                  </p>
                  {item.priority === "high" && (
                    <AlertCircle className="w-4 h-4 text-red-500 ml-auto mt-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/timetable")}
            className="bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <Calendar className="w-8 h-8 text-purple-700 mb-3" />
            <p
              className="font-semibold text-gray-800 text-left"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Timetable
            </p>
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <TrendingUp className="w-8 h-8 text-pink-700 mb-3" />
            <p
              className="font-semibold text-gray-800 text-left"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Analytics
            </p>
          </button>
          <button
            onClick={() => navigate("/notes")}
            className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <BookOpen className="w-8 h-8 text-blue-700 mb-3" />
            <p
              className="font-semibold text-gray-800 text-left"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Quick Notes
            </p>
          </button>
          <button
            onClick={() => navigate("/focus")}
            className="bg-gradient-to-br from-green-200 to-green-300 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <Clock className="w-8 h-8 text-green-700 mb-3" />
            <p
              className="font-semibold text-gray-800 text-left"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Focus Mode
            </p>
          </button>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-10"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="w-8 h-8 text-white" />
      </button>

      <BottomNav />

      {/* Add Task Dialog */}
      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
}