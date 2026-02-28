import { useState } from "react";
import { X } from "lucide-react";

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    title: string;
    subject: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    type: "assignment" | "quiz" | "exam" | "project";
  }) => void;
}

export function AddTaskDialog({ isOpen, onClose, onAdd }: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [type, setType] = useState<"assignment" | "quiz" | "exam" | "project">("assignment");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && subject && dueDate) {
      onAdd({ title, subject, dueDate, priority, type });
      setTitle("");
      setSubject("");
      setDueDate("");
      setPriority("medium");
      setType("assignment");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl text-gray-800"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Add New Task
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
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Physics Assignment Ch. 5"
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
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Physics"
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
              Due Date
            </label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="e.g., Tomorrow, 3 days, March 5"
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
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["assignment", "quiz", "exam", "project"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-3 rounded-2xl font-semibold capitalize transition-all ${
                    type === t
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                      : "bg-purple-50 text-gray-600"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Priority
            </label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-3 rounded-2xl font-semibold capitalize transition-all ${
                    priority === p
                      ? p === "high"
                        ? "bg-red-400 text-white"
                        : p === "medium"
                        ? "bg-yellow-400 text-white"
                        : "bg-green-400 text-white"
                      : "bg-purple-50 text-gray-600"
                  }`}
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
