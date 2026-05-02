import Form from "./form.jsx";

export default function Detalle({ herramienta, onClose, onLoanSuccess }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-3xl font-bold">Detalle de la herramienta</h2>
            <p className="text-slate-600 mt-1">Revisa la información y completa el formulario para solicitarla.</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
            Cerrar
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] p-6">
          <div className="space-y-4">
            <img
              src={herramienta.fotoURL}
              alt={herramienta.nombre}
              className="h-80 w-full rounded-3xl object-cover"
            />
            <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
              <h3 className="text-2xl font-semibold mb-3">{herramienta.nombre}</h3>
              <p className="text-slate-700">Tipo: {herramienta.tipo}</p>
              <p className="text-slate-700">Estado: {herramienta.estado}</p>
              <p className="text-slate-700">Disponible: {herramienta.disponible ? "Sí" : "No"}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Form herramienta={herramienta} onSuccess={onLoanSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}
