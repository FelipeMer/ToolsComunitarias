export default function CardsVecinos({ vecinos, onEdit, onDelete }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {vecinos.map((vecino) => (
        <article key={vecino._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold">{vecino.nombre}</h3>
          <p className="text-slate-600">ID: {vecino.numeroID}</p>
          <p className="text-slate-600">Teléfono: {vecino.telefono}</p>
          <p className="text-slate-600">Dirección: {vecino.direccion}</p>
          <p className="text-slate-600">Edad: {vecino.edad}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => onEdit(vecino)}
              className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(vecino)}
              className="rounded-full bg-rose-600 px-4 py-2 text-white hover:bg-rose-500"
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
