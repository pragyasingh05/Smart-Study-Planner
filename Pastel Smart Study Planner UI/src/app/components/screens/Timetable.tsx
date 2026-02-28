import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AddClassDialog } from "../dialogs/AddClassDialog";

interface ClassItem {
  id: string;
  subject: string;
  time: string;
  duration: string;
  color: string;
  day: number;
  slot: number;
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
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

const initialClasses: ClassItem[] = [
  {
    id: "1",
    subject: "Mathematics",
    time: "09:00 AM",
    duration: "1hr",
    color: "from-purple-200 to-purple-300",
    day: 0,
    slot: 0,
  },
  {
    id: "2",
    subject: "Physics",
    time: "11:00 AM",
    duration: "1hr",
    color: "from-blue-200 to-blue-300",
    day: 0,
    slot: 2,
  },
  {
    id: "3",
    subject: "Chemistry",
    time: "02:00 PM",
    duration: "1hr",
    color: "from-green-200 to-green-300",
    day: 1,
    slot: 5,
  },
  {
    id: "4",
    subject: "English",
    time: "10:00 AM",
    duration: "1hr",
    color: "from-pink-200 to-pink-300",
    day: 2,
    slot: 1,
  },
];

interface DraggableClassProps {
  classItem: ClassItem;
  onMove: (id: string, day: number, slot: number) => void;
}

function DraggableClass({ classItem, onMove }: DraggableClassProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "class",
    item: { id: classItem.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 rounded-2xl bg-gradient-to-br ${classItem.color} cursor-move shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4
        className="font-semibold text-gray-800 text-sm mb-1"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        {classItem.subject}
      </h4>
      <p
        className="text-xs text-gray-600"
        style={{ fontFamily: "Nunito, sans-serif" }}
      >
        {classItem.duration}
      </p>
    </div>
  );
}

interface TimeSlotDropZoneProps {
  day: number;
  slot: number;
  classItem: ClassItem | undefined;
  onDrop: (id: string, day: number, slot: number) => void;
}

function TimeSlotDropZone({
  day,
  slot,
  classItem,
  onDrop,
}: TimeSlotDropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "class",
    drop: (item: { id: string }) => onDrop(item.id, day, slot),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`min-h-[60px] p-2 rounded-xl transition-all ${
        isOver ? "bg-purple-100 ring-2 ring-purple-300" : "bg-white/50"
      }`}
    >
      {classItem && <DraggableClass classItem={classItem} onMove={onDrop} />}
    </div>
  );
}

function TimetableContent() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassItem[]>(initialClasses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDrop = (id: string, day: number, slot: number) => {
    setClasses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, day, slot } : item
      )
    );
  };

  const addClass = (newClass: {
    subject: string;
    time: string;
    duration: string;
    color: string;
    day: number;
    slot: number;
  }) => {
    const classItem: ClassItem = {
      id: (Math.max(...classes.map((c) => Number(c.id)), 0) + 1).toString(),
      ...newClass,
    };
    setClasses([...classes, classItem]);
  };

  const getClassForSlot = (day: number, slot: number) => {
    return classes.find((c) => c.day === day && c.slot === slot);
  };

  return (
    <div className="min-h-screen pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-b-[3rem] p-6 pb-8 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
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
            My Timetable
          </h1>
          <button
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        <p
          className="text-purple-100 text-sm"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Drag and drop to rearrange your classes
        </p>
      </div>

      <div className="px-4 mt-6">
        {/* Timetable Grid */}
        <div className="bg-white rounded-3xl p-4 shadow-lg overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-center"></div>
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center font-bold text-gray-700 py-2"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time, slotIndex) => (
              <div key={time} className="grid grid-cols-6 gap-2 mb-2">
                <div
                  className="text-xs text-gray-600 py-2 pr-2 text-right"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {time}
                </div>
                {weekDays.map((_, dayIndex) => (
                  <TimeSlotDropZone
                    key={`${dayIndex}-${slotIndex}`}
                    day={dayIndex}
                    slot={slotIndex}
                    classItem={getClassForSlot(dayIndex, slotIndex)}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 shadow-lg">
          <h3
            className="text-lg text-gray-800 mb-2"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            How to use ✨
          </h3>
          <ul
            className="space-y-1 text-sm text-gray-700"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            <li>• Drag classes to different time slots</li>
            <li>• Tap + to add new classes</li>
            <li>• Long press to edit or delete</li>
          </ul>
        </div>
      </div>

      {/* Add Class Dialog */}
      <AddClassDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addClass}
      />
    </div>
  );
}

export function Timetable() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TimetableContent />
    </DndProvider>
  );
}