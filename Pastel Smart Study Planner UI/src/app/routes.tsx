import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { OnboardingGoals } from "./components/onboarding/OnboardingGoals";
import { OnboardingProfile } from "./components/onboarding/OnboardingProfile";
import { Home } from "./components/screens/Home";
import { Calendar } from "./components/screens/Calendar";
import { Tasks } from "./components/screens/Tasks";
import { Focus } from "./components/screens/Focus";
import { Profile } from "./components/screens/Profile";
import { Timetable } from "./components/screens/Timetable";
import { Analytics } from "./components/screens/Analytics";
import { Notes } from "./components/screens/Notes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: OnboardingGoals },
      { path: "onboarding/profile", Component: OnboardingProfile },
      { path: "home", Component: Home },
      { path: "calendar", Component: Calendar },
      { path: "tasks", Component: Tasks },
      { path: "focus", Component: Focus },
      { path: "profile", Component: Profile },
      { path: "timetable", Component: Timetable },
      { path: "analytics", Component: Analytics },
      { path: "notes", Component: Notes },
    ],
  },
]);
