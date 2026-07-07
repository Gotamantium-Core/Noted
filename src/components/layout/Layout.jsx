import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Navbar />

                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}