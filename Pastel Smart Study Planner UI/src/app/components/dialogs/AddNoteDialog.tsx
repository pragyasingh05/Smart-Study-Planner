import { useState } from "react";
import { X } from "lucide-react";

interface AddNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (note: {
    title: string;
    content: string;
    subject: string;
    color: string;
  }) => void;
}

const subjectColors = [
  { name: "Purple", value: "from-purple-100 to-purple-200" },
  { name: "Blue", value: "from-blue-100 to-blue-200" },
  { name: "Green", value: "from-green-100 to-green-200" },
  { name: "Pink", value: "from-pink-100 to-pink-200" },
  { name: "Yellow", value: "from-yellow-100 to-yellow-200" },
  { name: "Orange", value: "from-orange-100 to-orange-200" },
];

export function AddNoteDialog({ isOpen, onClose, onAdd }: AddNoteDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [color, setColor] = useState(subjectColors[0].value);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content && subject) {
      onAdd({ title, content, subject, color });
      setTitle("");
      setContent("");
      setSubject("");
      setColor(subjectColors[0].value);
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
            Add New Note
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
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Physics Formulas"
              className="w-full px-4 py-3 rounded-2xl bg-green-50 border-2 border-green-100 focus:border-green-300 focus:outline-none transition-all"
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
              className="w-full px-4 py-3 rounded-2xl bg-green-50 border-2 border-green-100 focus:border-green-300 focus:outline-none transition-all"
              style={{ fontFamily: "Nunito, sans-serif" }}
              required
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your notes here..."
              rows={6}
              className="w-full px-4 py-3 rounded-2xl bg-green-50 border-2 border-green-100 focus:border-green-300 focus:outline-none transition-all resize-none"
              style={{ fontFamily: "Nunito, sans-serif" }}
              required
            />
          </div>

          <div>
            <label
              className="text-sm font-semibold text-gray-700 pl-2 block mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Color Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {subjectColors.map((sc) => (
                <button
                  key={sc.value}
                  type="button"
                  onClick={() => setColor(sc.value)}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${sc.value} transition-all ${
                    color === sc.value ? "ring-4 ring-green-400 scale-105" : ""
                  }`}
                >
                  <span
                    className="text-xs font-semibold text-gray-700"
                    style={{ fontFamily: "Nunito, sans-serif" }}
                  >
                    {sc.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 transition-all shadow-lg"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
