
import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'

const API_URL = 'http://localhost:3000/api/products'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Gagal mengambil data produk')
      }

      const data = await response.json()
      setProducts(data)
      setError('')
    } catch {
      setError('Tidak dapat terhubung ke backend. Pastikan server berjalan.')
    }
  }

  useEffect(() => {
    let ignore = false

    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Gagal mengambil data produk')
        }

        const data = await response.json()

        if (!ignore) {
          setProducts(data)
          setError('')
        }
      } catch {
        if (!ignore) {
          setError('Tidak dapat terhubung ke backend. Pastikan server berjalan.')
        }
      }
    }

    loadProducts()

    return () => {
      ignore = true
    }
  }, [])

  const filteredProducts = products.filter((product) =>
    product.nama.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleSaveProduct = async (formData) => {
    try {
      const url = editingProduct
        ? `${API_URL}/${editingProduct.id}`
        : API_URL

      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Gagal menyimpan produk')
      }

      setIsModalOpen(false)
      setEditingProduct(null)
      await fetchProducts()
    } catch {
      setError('Gagal menyimpan produk. Periksa koneksi backend.')
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Gagal menghapus produk')
      }

      await fetchProducts()
    } catch {
      setError('Gagal menghapus produk.')
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Manajemen Produk
          </h2>
          <p className="mt-2 text-slate-500">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Tambah Produk
        </button>
      </div>

      {error && (
        <p className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 sm:max-w-md"
        />

        <span className="text-sm text-slate-500">
          {products.length} produk
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm">
          Produk tidak ditemukan.
        </div>
      )}

      <p className="mt-6 text-sm text-slate-500">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      <ProductModal
        key={`${isModalOpen}-${editingProduct?.id ?? 'new'}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  )
}
