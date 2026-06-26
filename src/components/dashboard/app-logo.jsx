export default function AppLogo({ collapsed = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-green-800 flex items-center justify-center text-white font-bold">
        A
      </div>

      {!collapsed && (
        <div>
          <h2 className="font-bold">Almuhsin App</h2>

          <p className="text-xs text-slate-500 text-white">
            ERP Pondok Pesantren
          </p>
        </div>
      )}
    </div>
  );
}
