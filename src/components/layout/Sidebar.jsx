import {
    Calendar,
    ChartColumn,
    BookOpen,
    House,
    Settings
} from "lucide-react";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 p-5 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-white mb-8">
                Attendance
            </h1>

            <SidebarButton to="/" icon={House} label="Dashboard" />

            <SidebarButton
                to="/calendar"
                icon={Calendar}
                label="Calendar"
            />

            <SidebarButton
                to="/subjects"
                icon={BookOpen}
                label="Subjects"
            />

            <SidebarButton
                to="/statistics"
                icon={ChartColumn}
                label="Statistics"
            />

            <SidebarButton
                to="/settings"
                icon={Settings}
                label="Settings"
            />
        </aside>
    );
}