import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Subjects from "./pages/Subjects";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;