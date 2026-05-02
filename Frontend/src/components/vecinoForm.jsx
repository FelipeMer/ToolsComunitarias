import { useEffect, useState } from "react";

const initialValues = {
  nombre: "",
  numeroID: "",
  telefono: "",
  direccion: "",
  edad: "",
};

export default function VecinoForm({ vecino, onSave, onCancel }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (vecino) {
      setForm({
        nombre: vecino.nombre || "",
        numeroID: vecino.numeroID ? String(vecino.numeroID) : "",
        telefono: vecino.telefono ? String(vecino.telefono) : "",
        direccion: vecino.direccion || "",
        edad: vecino.edad ? String(vecino.edad) : "",
        _id: vecino._id,
      });
    } else {
      setForm(initialValues);
    }
    setError("");
  }, [vecino]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.nombre.trim() || !form.numeroID.trim() || !form.telefono.trim()) {
      setError("Nombre, identificación y teléfono son obligatorios.");
      return;
    }

    onSave({
      ...form,
      nombre: form.nombre.trim(),
      numeroID: Number(form.numeroID),
      telefono: Number(form.telefono),
      direccion: form.direccion.trim(),
      edad: Number(form.edad) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700">
          Nombre
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Nombre completo"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Identificación
          <input
            name="numeroID"
            value={form.numeroID}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Número de identificación"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700">
          Teléfono
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Teléfono"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Edad
          <input
            name="edad"
            value={form.edad}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Edad"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate-700">
        Dirección
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
          placeholder="Dirección del vecino"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-white hover:bg-slate-800">
          Guardar vecino
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50">
          Cancelar
        </button>
      </div>
    </form>
  );
}
