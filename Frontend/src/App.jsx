import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Inicio from "./pages/inicio.jsx";
import Login from "./pages/login.jsx";
import AdminPanel from "./pages/adminPanel.jsx";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("adminAuthenticated") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("adminAuthenticated", "true");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <Navbar authenticated={authenticated} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route
              path="/login"
              element={<Login authenticated={authenticated} onLogin={handleLogin} />}
            />
            <Route
              path="/admin"
              element={
                authenticated ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
