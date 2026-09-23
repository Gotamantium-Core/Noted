import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    BookOpen,
    CalendarDays,
    Calendar,
    PanelLeftClose,
    Sun,
    Moon,
} from "lucide-react";
import {
    applyTheme,
    getInitialTheme,
    saveTheme,
} from "../utils/theme";

const links = [
    {
        to: "/",
        icon: LayoutDashboard,
        label: "Dashboard",
    },
    {
        to: "/subjects",
        icon: BookOpen,
        label: "Subjects",
    },
    {
        to: "/timetable",
        icon: CalendarDays,
        label: "Timetable",
    },
    {
        to: "/calendar",
        icon: Calendar,
        label: "Calendar",
    },
];

function getStoredCollapsed() {
    try {
        return JSON.parse(localStorage.getItem("sidebar")) ?? false;
    } catch {
        return false;
    }
}

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(getStoredCollapsed());
    const [isDark, setIsDark] = useState(
        getInitialTheme() === "dark"
    );

    function toggleCollapsed() {
        const next = !collapsed;
        setCollapsed(next);
        try {
            localStorage.setItem("sidebar", JSON.stringify(next));
        } catch {
            // Collapse still applies for this session.
        }
    }

    function toggleTheme() {
        const next = isDark ? "light" : "dark";
        setIsDark(next === "dark");
        applyTheme(next);
        saveTheme(next);
    }

    return (
        <aside
            className={`
                flex
                h-screen
                flex-col
                bg-gray-200
                text-black
                transition-all
                duration-300
                dark:bg-gray-900
                dark:text-gray-100
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <h1 className="text-xl font-bold">
                        Noted.
                    </h1>
                )}

                <button
                    onClick={toggleCollapsed}
                    className="rounded p-2 transition-colors hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-800"
                    aria-label="Toggle sidebar"
                >
                    <PanelLeftClose size={20} />
                </button>
            </div>

            <nav className="mt-5 flex flex-col gap-2">
                {links.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `
                            mx-2
                            flex
                            items-center
                            gap-4
                            rounded-lg
                            px-4
                            py-3
                            transition-colors
                            ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-800"
                            }
                            `
                        }
                    >
                        <span className="flex items-center">
                            <link.icon size={20} strokeWidth={2} />
                        </span>

                        {!collapsed && (
                            <span>
                                {link.label}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto p-4">
                <button
                    onClick={toggleTheme}
                    className="flex w-full items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-800"
                    aria-label="Toggle dark mode"
                >
                    <span className="flex items-center">
                        {isDark ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </span>

                    {!collapsed && (
                        <span>
                            {isDark ? "Light Mode" : "Dark Mode"}
                        </span>
                    )}
                </button>
            </div>
        </aside>
    );
}