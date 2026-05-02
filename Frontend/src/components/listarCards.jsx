import CardsHerramientas from "./cardsHerramientas.jsx";

export default function ListarCards({ herramientas, actions, onSelect }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {herramientas.map((herramienta) => (
        <CardsHerramientas
          key={herramienta._id}
          herramienta={herramienta}
          actions={actions}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
