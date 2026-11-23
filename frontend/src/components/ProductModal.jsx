
import { useState } from 'react'

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [nama, setNama] = useState(initialData?.nama ?? '')
  const [harga, setHarga] = useState(initialData?.harga ?? '')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nama.trim() || harga === '') return

    onSave({
      nama: nama.trim(),
      harga: Number(harga),
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-2xl font-bold text-slate-800">
          {initialData ? 'Edit Produk' : 'Tambah Produk'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Contoh: Pulpen"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Harga (Rp)
            </label>
            <input
              type="number"
              placeholder="Contoh: 5000"
              min="0"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              Batal
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
