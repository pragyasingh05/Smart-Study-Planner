import { useState } from "react";
import { useNavigate } from "react-router";
import { Target, Trophy, BookOpen, Sparkles, ChevronRight } from "lucide-react";

const goals = [
  {
    id: "improve-grades",
    icon: Trophy,
    title: "Improve Grades",
    color: "from-purple-200 to-purple-300",
  },
  {
    id: "stay-organized",
    icon: Target,
    title: "Stay Organized",
    color: "from-pink-200 to-pink-300",
  },
  {
    id: "reduce-stress",
    icon: Sparkles,
    title: "Reduce Stress",
    color: "from-blue-200 to-blue-300",
  },
  {
    id: "study-efficiently",
    icon: BookOpen,
    title: "Study Efficiently",
    color: "from-green-200 to-green-300",
  },
];

export function OnboardingGoals() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length > 0) {
      navigate("/onboarding/profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-200 to-pink-200">
            <Sparkles className="w-12 h-12 text-purple-600" />
          </div>
          <h1
            className="text-4xl text-purple-800"
            style={{ fontFamily: "Caveat, cursive", fontWeight: 700 }}
          >
            What are your goals?
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Select all that apply. We'll personalize your experience!
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoals.includes(goal.id);

            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`p-6 rounded-3xl transition-all transform ${
                  isSelected
                    ? "scale-105 shadow-xl ring-4 ring-purple-300"
                    : "shadow-lg hover:scale-105"
                } bg-white`}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${goal.color} mb-3`}
                >
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>
                <p
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {goal.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedGoals.length === 0}
          className={`w-full py-4 rounded-full font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            selectedGoals.length > 0
              ? "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
