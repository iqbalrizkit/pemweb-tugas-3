import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h2 className="text-8xl font-bold text-blue-600">404</h2>

      <h3 className="mt-4 text-2xl font-bold text-slate-800">
        Halaman Tidak Ditemukan
      </h3>

      <p className="mt-2 text-slate-500">
        Maaf, halaman yang Anda cari tidak tersedia.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  )
}