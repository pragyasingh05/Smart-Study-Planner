import { Home, Calendar, CheckSquare, Focus, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: Focus, label: "Focus", path: "/focus" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-purple-100 px-4 pb-6 pt-3 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "scale-110" : ""
              }`}
            >
              <div
                className={`p-2 rounded-2xl transition-all ${
                  isActive
                    ? "bg-gradient-to-br from-purple-200 to-pink-200"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-purple-600" : "text-gray-400"
                  }`}
                />
              </div>
              <span
                className={`text-xs ${
                  isActive ? "text-purple-600 font-semibold" : "text-gray-400"
                }`}
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
