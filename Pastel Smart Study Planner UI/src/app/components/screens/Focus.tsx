import { useState, useEffect } from "react";
import { BottomNav } from "../BottomNav";
import { Play, Pause, RotateCcw, Coffee, Brain, Sparkles } from "lucide-react";

type FocusMode = "pomodoro" | "short-break" | "long-break";

const modes = {
  pomodoro: { duration: 25 * 60, label: "Focus Time", color: "purple" },
  "short-break": { duration: 5 * 60, label: "Short Break", color: "blue" },
  "long-break": { duration: 15 * 60, label: "Long Break", color: "green" },
};

export function Focus() {
  const [mode, setMode] = useState<FocusMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(modes.pomodoro.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "pomodoro") {
        setCompletedSessions((prev) => prev + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const handleModeChange = (newMode: FocusMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimeLeft(modes[mode].duration);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100;

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <h1
          className="text-3xl text-white mb-2"
          style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
        >
          Focus Mode
        </h1>
        <p
          className="text-purple-100 text-sm"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Stay focused with the Pomodoro technique
        </p>
      </div>

      <div className="px-6 space-y-6 mt-6">
        {/* Mode Selector */}
        <div className="bg-white rounded-3xl p-3 shadow-lg flex gap-2">
          <button
            onClick={() => handleModeChange("pomodoro")}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
              mode === "pomodoro"
                ? "bg-gradient-to-r from-purple-400 to-purple-500 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Focus
          </button>
          <button
            onClick={() => handleModeChange("short-break")}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
              mode === "short-break"
                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Short Break
          </button>
          <button
            onClick={() => handleModeChange("long-break")}
            className={`flex-1 py-3 rounded-2xl text-sm font-semibold transition-all ${
              mode === "long-break"
                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="bg-white rounded-[3rem] p-12 shadow-xl">
          {/* Mode Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`p-6 rounded-full bg-gradient-to-br ${
                mode === "pomodoro"
                  ? "from-purple-200 to-purple-300"
                  : mode === "short-break"
                  ? "from-blue-200 to-blue-300"
                  : "from-green-200 to-green-300"
              }`}
            >
              {mode === "pomodoro" ? (
                <Brain className="w-12 h-12 text-gray-700" />
              ) : mode === "short-break" ? (
                <Coffee className="w-12 h-12 text-gray-700" />
              ) : (
                <Sparkles className="w-12 h-12 text-gray-700" />
              )}
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <h2
              className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {formatTime(timeLeft)}
            </h2>
            <p
              className="text-gray-600 text-lg"
              style={{ fontFamily: "Caveat, cursive", fontWeight: 600 }}
            >
              {modes[mode].label}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  mode === "pomodoro"
                    ? "bg-gradient-to-r from-purple-400 to-purple-500"
                    : mode === "short-break"
                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gradient-to-r from-green-400 to-green-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-12 py-4 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-all ${
                mode === "pomodoro"
                  ? "bg-gradient-to-r from-purple-400 to-purple-500"
                  : mode === "short-break"
                  ? "bg-gradient-to-r from-blue-400 to-blue-500"
                  : "bg-gradient-to-r from-green-400 to-green-500"
              }`}
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 inline mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 inline mr-2" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-4 rounded-full font-semibold bg-gray-200 text-gray-700 shadow-lg hover:bg-gray-300 transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Session Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-700" />
            </div>
            <p
              className="text-3xl font-bold text-purple-600 mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {completedSessions}
            </p>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Sessions Today
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-700" />
            </div>
            <p
              className="text-3xl font-bold text-pink-600 mb-1"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {completedSessions * 25}
            </p>
            <p
              className="text-sm text-gray-600"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Minutes Focused
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 shadow-lg">
          <h3
            className="text-lg text-gray-800 mb-3"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Focus Tips ✨
          </h3>
          <ul
            className="space-y-2 text-sm text-gray-700"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            <li>• Put your phone on silent mode</li>
            <li>• Take short breaks between sessions</li>
            <li>• Stay hydrated and stretch regularly</li>
            <li>• One task at a time for best results</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
