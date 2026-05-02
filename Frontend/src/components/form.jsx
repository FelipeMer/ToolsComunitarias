import { useState } from "react";
import { getVecinos, createVecino } from "../services/apiVecinos.js";
import { createPrestamo } from "../services/apiPrestamos.js";
import { updateHerramienta } from "../services/apiHerramientas.js";

export default function Form({ herramienta, onSuccess }) {
  const [numeroID, setNumeroID] = useState("");
  const [vecino, setVecino] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    edad: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchVecino = async () => {
    setError("");
    setMessage("");
    if (!numeroID) {
      setError("Debes ingresar la identificación del vecino.");
      return;
    }

    setLoading(true);
    try {
      const response = await getVecinos();
      const found = response.data.find((item) => item.numeroID === Number(numeroID));
      if (found) {
        setVecino(found);
        setMessage("Vecino ya registrado. Verifica tu información y solicita el préstamo.");
      } else {
        setVecino(null);
        setMessage("Vecino no registrado. Ingresa tus datos para solicitar el préstamo.");
      }
    } catch (err) {
      setError("No se pudo buscar al vecino. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!numeroID) {
      setError("Ingresa la identificación del vecino.");
      return;
    }
    if (!vecino && (!formData.nombre || !formData.telefono || !formData.direccion || !formData.edad)) {
      setError("Completa los datos del vecino para registrarlo.");
      return;
    }

    setLoading(true);
    try {
      let vecinoActual = vecino;
      if (!vecinoActual) {
        const nuevoVecino = {
          nombre: formData.nombre,
          numeroID: Number(numeroID),
          telefono: Number(formData.telefono),
          direccion: formData.direccion,
          edad: Number(formData.edad),
        };
        const creado = await createVecino(nuevoVecino);
        vecinoActual = creado.data;
      }

      await createPrestamo({
        idHerramienta: herramienta._id,
        idVecino: vecinoActual._id,
        fechaSalida: new Date().toISOString(),
        estadoPrestamo: "Prestado",
      });

      await updateHerramienta(herramienta._id, {
        ...herramienta,
        disponible: false,
        estado: "Prestado",
      });

      setMessage("Préstamo registrado con éxito.");
      setVecino(null);
      setFormData({ nombre: "", telefono: "", direccion: "", edad: "" });
      setNumeroID("");
      if (onSuccess) {
        onSuccess();
      }
      window.alert("Ehrramienta solicitada con éxito!")
    } catch (err) {
      setError("No se pudo registrar el préstamo. Verifica los datos e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Número de Identificación</label>
        <input
          type="number"
          value={numeroID}
          onChange={(e) => setNumeroID(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
          placeholder="Número de identificación"
        />
        <button
          type="button"
          onClick={searchVecino}
          className="mt-3 rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          disabled={loading}
        >
          Buscar vecino
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-slate-700">{message}</p>}

      {vecino ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-slate-700">Nombre: {vecino.nombre}</p>
          <p className="text-slate-700">Teléfono: {vecino.telefono}</p>
          <p className="text-slate-700">Dirección: {vecino.direccion}</p>
          <p className="text-slate-700">Edad: {vecino.edad}</p>
          <p className="text-slate-700">ID: {vecino.numeroID}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre</label>
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Teléfono</label>
            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Teléfono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Dirección</label>
            <input
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Dirección"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Edad</label>
            <input
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
              placeholder="Edad"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 px-4 py-3 text-white hover:bg-slate-700"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Solicitar préstamo"}
      </button>
    </form>
  );
}
