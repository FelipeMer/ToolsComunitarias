import { Link } from "react-router-dom";

export default function Navbar({ authenticated, onLogout }) {
  return (
    <header className="fixed top-0 z-50 left-0 w-full bg-slate-900 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="text-xl font-bold tracking-tight">
          ToolsComunitarias
        </Link>
        <nav className="flex flex-wrap items-center gap-3">
          <Link to="/" className="hover:text-slate-200">
            Inicio
          </Link>
          <Link to="/admin" className="hover:text-slate-200">
            Admin
          </Link>
          {!authenticated ? (
            <Link to="/login" className="hover:text-slate-200">
              Login
            </Link>
          ) : (
            <button onClick={onLogout} className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">
              Cerrar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
