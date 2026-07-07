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
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />

                <Route
                    path="/calendar"
                    element={
                        <Layout>
                            <Calendar />
                        </Layout>
                    }
                />

                <Route
                    path="/subjects"
                    element={
                        <Layout>
                            <Subjects />
                        </Layout>
                    }
                />

                <Route
                    path="/statistics"
                    element={
                        <Layout>
                            <Statistics />
                        </Layout>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <Layout>
                            <Settings />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;