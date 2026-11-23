import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api/products'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      setProduct(null)

      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Gagal mengambil data produk')
        }

        const products = await response.json()
        const foundProduct = products.find(
          (item) => String(item.id) === id
        )

        if (!foundProduct) {
          setError('Produk tidak ditemukan.')
        } else {
          setProduct(foundProduct)
        }
      } catch {
        setError('Tidak dapat terhubung ke backend.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return (
    <div>
      <Link
        to="/products"
        className="mb-6 inline-block font-medium text-blue-600 hover:text-blue-800"
      >
        ← Kembali ke Daftar Produk
      </Link>

      <h2 className="mb-6 text-3xl font-bold text-slate-800">
        Detail Produk
      </h2>

      {loading ? (
        <p className="text-slate-500">Memuat data produk...</p>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-6 text-red-700">
          {error}
        </div>
      ) : (
        <div className="max-w-xl rounded-xl bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm text-slate-500">
            ID Produk: {product.id}
          </p>

          <h3 className="mb-4 text-2xl font-bold text-slate-800">
            {product.nama}
          </h3>

          <p className="text-sm text-slate-500">Harga Produk</p>

          <p className="mt-1 text-2xl font-bold text-blue-600">
            Rp{Number(product.harga).toLocaleString('id-ID')}
          </p>
        </div>
      )}
    </div>
  )
}