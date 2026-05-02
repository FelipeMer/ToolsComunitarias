export default function CardsPedidos({ prestamos, onUpdateState }) {
  const estados = ["Prestado", "Devuelto", "Atrasado"];

  if (prestamos.length === 0) {
    return <p className="text-slate-600">No hay pedidos registrados.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {prestamos.map((pedido) => (
        <article key={pedido._id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Pedido #{pedido._id.slice(-6)}</h3>
          <p className="text-slate-600">Herramienta: {pedido.idHerramienta}</p>
          <p className="text-slate-600">Vecino: {pedido.idVecino}</p>
          <p className="text-slate-600">Fecha salida: {new Date(pedido.fechaSalida).toLocaleDateString()}</p>
          <p className="text-slate-600">Estado: {pedido.estadoPrestamo}</p>
          <label className="mt-4 block text-sm font-medium text-slate-700">Cambiar estado</label>
          <select
            value={pedido.estadoPrestamo}
            onChange={(event) => onUpdateState(pedido, event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3"
          >
            {estados.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </article>
      ))}
    </div>
  );
}
