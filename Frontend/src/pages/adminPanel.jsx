import { useEffect, useState } from "react";
import ListarCards from "../components/listarCards.jsx";
import CardsVecinos from "../components/cardsVecinos.jsx";
import CardsPedidos from "../components/cardsPedidos.jsx";
import Modal from "../components/modal.jsx";
import ToolForm from "../components/toolForm.jsx";
import VecinoForm from "../components/vecinoForm.jsx";
import {
  getHerramientas,
  createHerramienta,
  updateHerramienta,
  deleteHerramienta,
} from "../services/apiHerramientas.js";
import {
  getVecinos,
  createVecino,
  updateVecino,
  deleteVecino,
} from "../services/apiVecinos.js";
import { getPrestamos, updatePrestamo } from "../services/apiPrestamos.js";

export default function AdminPanel() {
  const [herramientas, setHerramientas] = useState([]);
  const [vecinos, setVecinos] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toolFormState, setToolFormState] = useState({ open: false, herramienta: null });
  const [vecinoFormState, setVecinoFormState] = useState({ open: false, vecino: null });

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [toolsRes, vecinosRes, prestamosRes] = await Promise.all([
        getHerramientas(),
        getVecinos(),
        getPrestamos(),
      ]);
      setHerramientas(toolsRes.data || []);
      setVecinos(vecinosRes.data || []);
      setPrestamos(prestamosRes.data || []);
    } catch (err) {
      setError("Error cargando datos del panel. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openToolForm = (herramienta = null) => {
    setToolFormState({ open: true, herramienta });
  };

  const closeToolForm = () => {
    setToolFormState({ open: false, herramienta: null });
  };

  const openVecinoForm = (vecino = null) => {
    setVecinoFormState({ open: true, vecino });
  };

  const closeVecinoForm = () => {
    setVecinoFormState({ open: false, vecino: null });
  };

  const handleToolSave = async (data) => {
    setLoading(true);
    setError("");
    try {
      if (data._id) {
        await updateHerramienta(data._id, data);
      } else {
        await createHerramienta(data);
      }
      closeToolForm();
      fetchData();
    } catch (err) {
      setError("No se pudo guardar la herramienta.");
      setLoading(false);
    }
  };

  const handleVecinoSave = async (data) => {
    setLoading(true);
    setError("");
    try {
      if (data._id) {
        await updateVecino(data._id, data);
      } else {
        await createVecino(data);
      }
      closeVecinoForm();
      fetchData();
    } catch (err) {
      setError("No se pudo guardar el vecino.");
      setLoading(false);
    }
  };

  const handleToolDelete = async (herramienta) => {
    const confirmed = window.confirm(`¿Eliminar herramienta ${herramienta.nombre}?`);
    if (!confirmed) return;
    try {
      await deleteHerramienta(herramienta._id);
      fetchData();
    } catch (err) {
      window.alert("No se pudo eliminar la herramienta.");
    }
  };

  const handleVecinoDelete = async (vecino) => {
    const confirmed = window.confirm(`¿Eliminar vecino ${vecino.nombre}?`);
    if (!confirmed) return;
    try {
      await deleteVecino(vecino._id);
      fetchData();
    } catch (err) {
      window.alert("No se pudo eliminar el vecino.");
    }
  };

  const handlePedidoStateChange = async (prestamo, estado) => {
    try {
      await updatePrestamo(prestamo._id, {
        ...prestamo,
        estadoPrestamo: estado,
      });

      if (estado === "Devuelto") {
        const herramienta = herramientas.find(
          (item) => item._id === prestamo.idHerramienta || item._id === prestamo.idHerramienta?._id
        );

        if (herramienta) {
          await updateHerramienta(herramienta._id, {
            ...herramienta,
            disponible: true,
          });
        }
      }

      fetchData();
    } catch (err) {
      window.alert("No se pudo actualizar el pedido.");
    }
  };

  const toolActions = [
    { label: "Editar", onClick: openToolForm },
    { label: "Eliminar", onClick: handleToolDelete },
  ];

  return (
    <section>
      <header className="mb-8 pt-13">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Panel de administración</h1>
            <p className="text-slate-600 max-w-2xl mt-2">
              Administra herramientas, vecinos y el estado de los pedidos desde una sola vista.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => openToolForm()} className="px-4 py-2 rounded-xl bg-slate-900 text-white">
              Crear herramienta
            </button>
            <button onClick={() => openVecinoForm()} className="px-4 py-2 rounded-xl bg-slate-700 text-white">
              Crear vecino
            </button>
          </div>
        </div>
      </header>

      {loading ? (
        <p className="text-slate-500">Cargando datos administrativos...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="space-y-10">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Herramientas</h2>
              <span className="text-slate-500">{herramientas.length} registrados</span>
            </div>
            <ListarCards herramientas={herramientas} actions={toolActions} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Vecinos</h2>
              <span className="text-slate-500">{vecinos.length} registrados</span>
            </div>
            <CardsVecinos vecinos={vecinos} onEdit={openVecinoForm} onDelete={handleVecinoDelete} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Pedidos</h2>
              <span className="text-slate-500">{prestamos.length} registros</span>
            </div>
            <CardsPedidos prestamos={prestamos} onUpdateState={handlePedidoStateChange} />
          </section>
        </div>
      )}

      {toolFormState.open && (
        <Modal
          title={toolFormState.herramienta ? "Editar herramienta" : "Crear herramienta"}
          onClose={closeToolForm}
        >
          <ToolForm
            herramienta={toolFormState.herramienta}
            onSave={handleToolSave}
            onCancel={closeToolForm}
          />
        </Modal>
      )}

      {vecinoFormState.open && (
        <Modal
          title={vecinoFormState.vecino ? "Editar vecino" : "Crear vecino"}
          onClose={closeVecinoForm}
        >
          <VecinoForm
            vecino={vecinoFormState.vecino}
            onSave={handleVecinoSave}
            onCancel={closeVecinoForm}
          />
        </Modal>
      )}
    </section>
  );
}
