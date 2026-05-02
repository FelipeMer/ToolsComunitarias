export default function CardsHerramientas({ herramienta, actions = [], onSelect }) {
  const { nombre, tipo, estado, disponible, fotoURL } = herramienta;
  return (
    <article className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white flex flex-col">
      <img
        src={fotoURL}
        alt={nombre}
        className="h-48 w-full object-cover"
      />
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-xl font-semibold">{nombre}</h3>
          <p className="text-slate-500">{tipo}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
          <span>Estado: {estado}</span>
          <span>Disponible: {disponible ? "Sí" : "No"}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {onSelect && (
            <button
              onClick={() => onSelect(herramienta)}
              className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
            >
              Solicitar
            </button>
          )}
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.onClick(herramienta)}
              className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
