export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-2 text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      <p className="mb-8 text-slate-500">
        Selamat datang di aplikasi manajemen produk.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Aplikasi</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-600">
            Product Management
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Fitur</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            CRUD Produk
          </h3>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Teknologi</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            React + Tailwind
          </h3>
        </div>
      </div>
    </div>
  )
}