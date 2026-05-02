import { useEffect, useState } from "react";

const initialValues = {
  nombre: "",
  tipo: "",
  estado: "Bueno",
  disponible: true,
  fotoURL: "",
};

export default function ToolForm({ herramienta, onSave, onCancel }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (herramienta) {
      setForm({
        nombre: herramienta.nombre || "",
        tipo: herramienta.tipo || "",
        estado: herramienta.estado || "Bueno",
        disponible: herramienta.disponible ?? true,
        fotoURL: herramienta.fotoURL || "",
        _id: herramienta._id,
      });
    } else {
      setForm(initialValues);
    }
    setError("");
  }, [herramienta]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.nombre.trim() || !form.tipo.trim()) {
      setError("Nombre y tipo son obligatorios.");
      return;
    }

    onSave({
      ...form,
      nombre: form.nombre.trim(),
      tipo: form.tipo.trim(),
      estado: form.estado.trim() || "Bueno",
      fotoURL: form.fotoURL.trim(),
      disponible: Boolean(form.disponible),
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
            placeholder="Nombre de la herramienta"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700">
          Tipo
          <input
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Tipo de herramienta"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700">
          Estado
          <input
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
            placeholder="Estado de la herramienta"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="disponible"
            checked={form.disponible}
            onChange={handleChange}
            className="h-5 w-5 rounded border-slate-300 text-slate-900"
          />
          Disponible
        </label>
      </div>

      <label className="block space-y-2 text-sm text-slate-700">
        URL de imagen
        <input
          name="fotoURL"
          value={form.fotoURL}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3"
          placeholder="https://..."
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="rounded-full bg-slate-900 px-5 py-3 text-white hover:bg-slate-800">
          Guardar herramienta
        </button>
        <button type="button" onClick={onCancel} className="rounded-full border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50">
          Cancelar
        </button>
      </div>
    </form>
  );
}
