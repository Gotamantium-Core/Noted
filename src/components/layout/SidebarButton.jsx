import { NavLink } from "react-router-dom";

export default function SidebarButton({ to, icon: Icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`
            }
        >
            <Icon size={20} />
            <span>{label}</span>
        </NavLink>
    );
}