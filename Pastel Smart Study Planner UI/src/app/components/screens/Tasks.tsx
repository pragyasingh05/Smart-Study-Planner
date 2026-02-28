import { useState } from "react";
import { BottomNav } from "../BottomNav";
import {
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { AddTaskDialog } from "../dialogs/AddTaskDialog";

type Priority = "low" | "medium" | "high";

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  type: "assignment" | "quiz" | "exam" | "project";
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Physics Assignment Ch. 5",
    subject: "Physics",
    dueDate: "Tomorrow",
    priority: "high",
    completed: false,
    type: "assignment",
  },
  {
    id: 2,
    title: "Math Quiz - Calculus",
    subject: "Mathematics",
    dueDate: "3 days",
    priority: "medium",
    completed: false,
    type: "quiz",
  },
  {
    id: 3,
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "5 days",
    priority: "low",
    completed: false,
    type: "assignment",
  },
  {
    id: 4,
    title: "English Essay Draft",
    subject: "English",
    dueDate: "1 week",
    priority: "medium",
    completed: true,
    type: "assignment",
  },
  {
    id: 5,
    title: "Biology Mid-term Exam",
    subject: "Biology",
    dueDate: "2 weeks",
    priority: "high",
    completed: false,
    type: "exam",
  },
];

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (newTask: {
    title: string;
    subject: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    type: "assignment" | "quiz" | "exam" | "project";
  }) => {
    const task: Task = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      ...newTask,
      completed: false,
    };
    setTasks([task, ...tasks]);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "from-purple-100 to-purple-200";
      case "quiz":
        return "from-blue-100 to-blue-200";
      case "exam":
        return "from-red-100 to-red-200";
      case "project":
        return "from-green-100 to-green-200";
      default:
        return "from-gray-100 to-gray-200";
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <h1
          className="text-3xl text-white mb-6"
          style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
        >
          Tasks & Assignments
        </h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-purple-200 border-2 border-white/30 focus:border-white focus:outline-none"
            style={{ fontFamily: "Nunito, sans-serif" }}
          />
        </div>
      </div>

      <div className="px-6 space-y-6 mt-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-3xl p-2 shadow-lg flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-2xl text-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`flex-1 py-2 rounded-2xl text-sm font-semibold transition-all ${
              filter === "active"
                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Active ({tasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 py-2 rounded-2xl text-sm font-semibold transition-all ${
              filter === "completed"
                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                : "text-gray-600"
            }`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Done ({tasks.filter((t) => t.completed).length})
          </button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-3xl p-5 shadow-lg transition-all ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-1"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </button>

                {/* Task Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className={`font-semibold ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {task.title}
                    </h3>
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${getPriorityColor(
                        task.priority
                      )}`}
                    />
                  </div>

                  {/* Subject Tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(
                        task.type
                      )}`}
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {task.subject}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 capitalize"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {task.type}
                    </span>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-2">
                    {task.priority === "high" && !task.completed ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${
                        task.priority === "high" && !task.completed
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }`}
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
            <p
              className="text-gray-400"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              No tasks found
            </p>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-10"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="w-8 h-8 text-white" />
      </button>

      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addTask}
      />

      <BottomNav />
    </div>
  );
}