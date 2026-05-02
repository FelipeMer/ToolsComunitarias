import { useState } from "react";

const ADMIN_PASSWORD = "admin123";

export default function FormLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (password === ADMIN_PASSWORD) {
      onLogin();
      return;
    }
    setError("Contraseña incorrecta. Intenta de nuevo.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder="Ingresa la contraseña del admin"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="w-full rounded-full bg-slate-900 px-4 py-3 text-white hover:bg-slate-700">
        Ingresar
      </button>
    </form>
  );
}
