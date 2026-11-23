import { Link } from 'react-router-dom'

export default function ProductCard({ product, onEdit, onDelete }) {
  const formatRupiah = (angka) => {
    return 'Rp' + Number(angka).toLocaleString('id-ID')
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
        ID: {product.id}
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-800">
        {product.nama}
      </h3>

      <p className="mt-2 text-lg font-semibold text-blue-600">
        {formatRupiah(product.harga)}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          to={`/products/${product.id}`}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          Detail
        </Link>

        <button
          onClick={() => onEdit(product)}
          className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-200"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}