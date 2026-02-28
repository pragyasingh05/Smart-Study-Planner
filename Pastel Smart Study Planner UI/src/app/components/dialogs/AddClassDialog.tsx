import { useState } from "react";
import { X } from "lucide-react";

interface AddClassDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (classItem: {
    subject: string;
    time: string;
    duration: string;
    color: string;
    day: number;
    slot: number;
  }) => void;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];
const classColors = [
  { name: "Purple", value: "from-purple-200 to-purple-300" },
  { name: "Blue", value: "from-blue-200 to-blue-300" },
  { name: "Green", value: "from-green-200 to-green-300" },
  { name: "Pink", value: "from-pink-200 to-pink-300" },
  { name: "Yellow", value: "from-yellow-200 to-yellow-300" },
  { name: "Orange", value: "from-orange-200 to-orange-300" },
];

export function AddClassDialog({ isOpen, onClose, onAdd }: AddClassDialogProps) {
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(0);
  const [duration, setDuration] = useState("1hr");
  const [color, setColor] = useState(classColors[0].value);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject) {
      onAdd({
        subject,
        time: timeSlots[slot],
        duration,
        color,
        day,
        slot,
      });
      setSubject("");
      setDay(0);
      setSlot(0);
      setDuration("1hr");
      setColor(classColors[0].value);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl text-gray-800"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Add New Class
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Subject/Class Name
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics"
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
              required
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {weekDays.map((d, idx) => (
                <option key={idx} value={idx}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Time Slot
            </label>
            <select
              value={slot}
              onChange={(e) => setSlot(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-300 focus:outline-none transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {timeSlots.map((t, idx) => (
                <option key={idx} value={idx}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Duration
            </label>
            <div className="flex gap-2">
              {["30min", "1hr", "1.5hr", "2hr"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
                    duration === d
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                      : "bg-purple-50 text-gray-600"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Color Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {classColors.map((cc) => (
                <button
                  key={cc.value}
                  type="button"
                  onClick={() => setColor(cc.value)}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${cc.value} transition-all ${
                    color === cc.value ? "ring-4 ring-purple-400 scale-105" : ""
                  }`}
                >
                  <span
                    className="text-xs font-semibold text-gray-700"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {cc.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
}
