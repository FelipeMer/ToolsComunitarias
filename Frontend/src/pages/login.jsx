import { Navigate, useNavigate } from "react-router-dom";
import FormLogin from "../components/formLogin.jsx";

export default function Login({ authenticated, onLogin }) {
  const navigate = useNavigate();

  if (authenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLoginSuccess = () => {
    onLogin();
    navigate("/admin");
  };

  return (
    <section className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
      <h1 className="text-3xl font-semibold mb-4">Ingreso de administrador</h1>
      <p className="text-slate-600 mb-6">
        Ingresa la contraseña para acceder al panel de administración.
      </p>
      <FormLogin onLogin={handleLoginSuccess} />
    </section>
  );
}
