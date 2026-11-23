import { NavLink, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  const navClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
    }`

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside className="w-full bg-white p-5 shadow-sm md:min-h-screen md:w-64">
        <h1 className="mb-8 text-xl font-bold text-blue-700">
          Product Dashboard
        </h1>

        <nav className="space-y-2">
          <NavLink to="/dashboard" className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Daftar Produk
          </NavLink>
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}