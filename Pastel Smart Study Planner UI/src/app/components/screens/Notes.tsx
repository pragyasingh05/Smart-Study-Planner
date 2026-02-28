import { useState } from "react";
import { ArrowLeft, Plus, Search, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router";
import { AddNoteDialog } from "../dialogs/AddNoteDialog";

interface Note {
  id: number;
  title: string;
  content: string;
  subject: string;
  color: string;
  date: string;
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Physics Formulas",
    content: "Newton's laws, F=ma, momentum = mv...",
    subject: "Physics",
    color: "from-blue-100 to-blue-200",
    date: "Feb 26",
  },
  {
    id: 2,
    title: "Math Chapter 5 Notes",
    content: "Integration techniques, substitution method...",
    subject: "Mathematics",
    color: "from-purple-100 to-purple-200",
    date: "Feb 25",
  },
  {
    id: 3,
    title: "Chemistry Lab Report",
    content: "Titration experiment results and observations...",
    subject: "Chemistry",
    color: "from-green-100 to-green-200",
    date: "Feb 24",
  },
  {
    id: 4,
    title: "English Essay Ideas",
    content: "Theme analysis for Shakespeare's Hamlet...",
    subject: "English",
    color: "from-pink-100 to-pink-200",
    date: "Feb 23",
  },
];

export function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addNote = (newNote: {
    title: string;
    content: string;
    subject: string;
    color: string;
  }) => {
    const note: Note = {
      id: Math.max(...notes.map((n) => n.id), 0) + 1,
      ...newNote,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
    setNotes([note, ...notes]);
  };

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
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
            Quick Notes
          </h1>
          <button
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-green-200 border-2 border-white/30 focus:border-white focus:outline-none"
            style={{ fontFamily: "Nunito, sans-serif" }}
          />
        </div>
      </div>

      <div className="px-6 space-y-4 mt-6">
        {/* Notes Grid */}
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`bg-gradient-to-br ${note.color} rounded-3xl p-6 shadow-lg`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3
                  className="text-lg font-bold text-gray-800 mb-1"
                  style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
                >
                  {note.title}
                </h3>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/50 text-gray-700"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {note.subject}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-white/50 hover:bg-white/70 transition-all">
                  <Edit className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 rounded-full bg-white/50 hover:bg-red-100 transition-all"
                >
                  <Trash2 className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
            <p
              className="text-gray-700 mb-3 line-clamp-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {note.content}
            </p>
            <p
              className="text-xs text-gray-600"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {note.date}
            </p>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
            <p
              className="text-gray-400"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              No notes found
            </p>
          </div>
        )}

        {/* Tips Card */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 shadow-lg mt-6">
          <h3
            className="text-lg text-gray-800 mb-3"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            Note-Taking Tips ✨
          </h3>
          <ul
            className="space-y-2 text-sm text-gray-700"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            <li>• Use headers and bullet points</li>
            <li>• Color code by subject for easy reference</li>
            <li>• Review notes within 24 hours</li>
            <li>• Add examples and diagrams when possible</li>
          </ul>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-10"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="w-8 h-8 text-white" />
      </button>

      {/* Add Note Dialog */}
      <AddNoteDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addNote}
      />
    </div>
  );
}