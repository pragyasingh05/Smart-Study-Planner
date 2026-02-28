import { useState } from "react";
import { BottomNav } from "../BottomNav";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const events = [
  { date: 28, type: "class", subject: "Math", time: "09:00 AM" },
  { date: 28, type: "exam", subject: "Physics Quiz", time: "02:00 PM" },
  { date: 1, type: "deadline", subject: "Assignment Due", time: "11:59 PM" },
  { date: 3, type: "class", subject: "Chemistry", time: "10:00 AM" },
];

export function Calendar() {
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [currentMonth, setCurrentMonth] = useState(1); // February (0-indexed)
  const [selectedDate, setSelectedDate] = useState(28);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = 2026;
  const daysInMonth = getDaysInMonth(currentMonth, year);
  const firstDay = getFirstDayOfMonth(currentMonth, year);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getEventsForDate = (date: number) => {
    return events.filter((e) => e.date === date);
  };

  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <h1
          className="text-3xl text-white mb-6"
          style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
        >
          Calendar
        </h1>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white/20 backdrop-blur-md rounded-full p-1">
          <button
            onClick={() => setViewMode("month")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              viewMode === "month"
                ? "bg-white text-purple-600"
                : "text-white"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Monthly
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              viewMode === "week"
                ? "bg-white text-purple-600"
                : "text-white"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="px-6 space-y-6 mt-6">
        {/* Month Navigation */}
        <div className="bg-white rounded-3xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentMonth((prev) => (prev - 1 + 12) % 12)}
              className="p-2 rounded-full hover:bg-purple-100 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {months[currentMonth]} {year}
            </h2>
            <button
              onClick={() => setCurrentMonth((prev) => (prev + 1) % 12)}
              className="p-2 rounded-full hover:bg-purple-100 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const isSelected = day === selectedDate;
              const hasEvents = dayEvents.length > 0;

              return (
                <button
                  key={index}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all ${
                    !day
                      ? "invisible"
                      : isSelected
                      ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg scale-110"
                      : hasEvents
                      ? "bg-gradient-to-br from-purple-100 to-pink-100 text-gray-800 hover:scale-105"
                      : "hover:bg-purple-50 text-gray-600"
                  }`}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {day}
                  </span>
                  {hasEvents && !isSelected && (
                    <div className="flex gap-1 mt-1">
                      {dayEvents.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-purple-500"
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events for Selected Date */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2
            className="text-xl text-gray-800 mb-4"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Events on {months[currentMonth]} {selectedDate}
          </h2>

          {todayEvents.length > 0 ? (
            <div className="space-y-3">
              {todayEvents.map((event, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl flex items-center gap-4 ${
                    event.type === "class"
                      ? "bg-gradient-to-r from-purple-100 to-purple-200"
                      : event.type === "exam"
                      ? "bg-gradient-to-r from-red-100 to-red-200"
                      : "bg-gradient-to-r from-yellow-100 to-yellow-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      event.type === "class"
                        ? "bg-purple-300"
                        : event.type === "exam"
                        ? "bg-red-300"
                        : "bg-yellow-300"
                    }`}
                  >
                    <Clock className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-semibold text-gray-800"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {event.subject}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mt-1"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {event.time}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.type === "class"
                        ? "bg-purple-300 text-purple-800"
                        : event.type === "exam"
                        ? "bg-red-300 text-red-800"
                        : "bg-yellow-300 text-yellow-800"
                    }`}
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p
              className="text-center text-gray-400 py-8"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              No events scheduled for this day
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
