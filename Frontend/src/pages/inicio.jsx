import { useEffect, useState } from "react";
import { getHerramientas } from "../services/apiHerramientas.js";
import ListarCards from "../components/listarCards.jsx";
import Detalle from "../components/detalle.jsx";

export default function Inicio() {
  const [herramientas, setHerramientas] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHerramientas = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getHerramientas();
      setHerramientas(response.data || []);
    } catch (err) {
      setError("No se pudieron cargar las herramientas. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHerramientas();
  }, []);

  const handleToolSelect = (herramienta) => {
    setSelectedTool(herramienta);
  };

  const handleCloseDetail = () => {
    setSelectedTool(null);
  };

  const handleLoanSuccess = async () => {
    await fetchHerramientas();
    setSelectedTool(null);
  };

  return (
    <section>
      <header className="mb-8 pt-13">
        <h1 className="text-4xl font-bold mb-3">Inicio</h1>
        <p className="text-slate-600 max-w-2xl">
          Elige una herramienta disponible, revisa sus detalles y solicita el préstamo.
        </p>
      </header>
      {loading ? (
        <p className="text-slate-500">Cargando herramientas...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : herramientas.length === 0 ? (
        <p className="text-slate-600">No hay herramientas registradas aún.</p>
      ) : (
        <ListarCards herramientas={herramientas} onSelect={handleToolSelect} />
      )}
      {selectedTool && (
        <Detalle herramienta={selectedTool} onClose={handleCloseDetail} onLoanSuccess={handleLoanSuccess} />
      )}
    </section>
  );
}
