export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full px-3 py-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            Cerrar
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
