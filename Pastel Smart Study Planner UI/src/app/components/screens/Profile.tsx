import { BottomNav } from "../BottomNav";
import {
  User,
  GraduationCap,
  BookOpen,
  Award,
  Bell,
  Palette,
  LogOut,
  ChevronRight,
  Settings,
  Target,
  Flame,
} from "lucide-react";

const subjects = [
  { name: "Mathematics", color: "from-purple-200 to-purple-300" },
  { name: "Physics", color: "from-blue-200 to-blue-300" },
  { name: "Chemistry", color: "from-green-200 to-green-300" },
  { name: "English", color: "from-pink-200 to-pink-300" },
];

const achievements = [
  { icon: Flame, title: "7 Day Streak", unlocked: true },
  { icon: Target, title: "First Task", unlocked: true },
  { icon: Award, title: "Focus Master", unlocked: true },
  { icon: BookOpen, title: "Study 10 Hours", unlocked: false },
];

export function Profile() {
  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-400 to-orange-400 rounded-b-[3rem] p-6 pb-12 shadow-xl">
        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-purple-600" />
          </div>
          <div className="flex-1">
            <h1
              className="text-2xl text-white mb-1"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
            >
              Sarah Johnson
            </h1>
            <p
              className="text-pink-100 text-sm"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Semester 4 • Computer Science
            </p>
          </div>
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center">
            <p
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              87%
            </p>
            <p
              className="text-xs text-pink-100"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Avg. Progress
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center">
            <p
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              42
            </p>
            <p
              className="text-xs text-pink-100"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Tasks Done
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center">
            <p
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              7
            </p>
            <p
              className="text-xs text-pink-100"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Day Streak
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 mt-6">
        {/* My Subjects */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            My Subjects
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center gap-3`}
              >
                <BookOpen className="w-5 h-5 text-gray-700" />
                <span
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {subject.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Achievements
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-200 to-orange-200"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      achievement.unlocked ? "text-orange-600" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-[10px] text-center px-1 ${
                      achievement.unlocked ? "text-gray-700" : "text-gray-400"
                    }`}
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {achievement.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-3xl p-4 shadow-lg space-y-2">
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-700" />
            </div>
            <span
              className="flex-1 text-left font-semibold text-gray-700"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Notifications
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
              <Palette className="w-5 h-5 text-pink-700" />
            </div>
            <span
              className="flex-1 text-left font-semibold text-gray-700"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Appearance
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-700" />
            </div>
            <span
              className="flex-1 text-left font-semibold text-gray-700"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Academic Info
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-all">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-700" />
            </div>
            <span
              className="flex-1 text-left font-semibold text-gray-700"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Study Goals
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-gradient-to-r from-red-100 to-red-200 rounded-3xl p-4 shadow-lg flex items-center justify-center gap-3 hover:from-red-200 hover:to-red-300 transition-all">
          <LogOut className="w-5 h-5 text-red-600" />
          <span
            className="font-semibold text-red-600"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Log Out
          </span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
