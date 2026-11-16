import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, nama: 'Pulpen', harga: 5000 },
  { id: 2, nama: 'Buku Tulis', harga: 12000 },
  { id: 3, nama: 'Spidol', harga: 8000 },
  { id: 4, nama: 'Penggaris', harga: 6000 },
  { id: 5, nama: 'Penghapus', harga: 3000 },
];

// GET semua produk (mendukung filter pencarian ?search=)
app.get('/api/products', (req, res) => {
  const { search } = req.query;
  if (search) {
    const filtered = products.filter((p) =>
      p.nama.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(products);
});

// POST tambah produk baru
app.post('/api/products', (req, res) => {
  const { nama, harga } = req.body;
  if (!nama || harga === undefined) {
    return res.status(400).json({ message: 'Nama dan harga wajib diisi' });
  }
  const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: nextId, nama, harga: Number(harga) };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT edit produk berdasarkan ID
app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nama, harga } = req.body;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  products[index] = { id, nama, harga: Number(harga) };
  res.json(products[index]);
});

// DELETE hapus produk berdasarkan ID
app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some((p) => p.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  products = products.filter((p) => p.id !== id);
  res.json({ message: 'Produk berhasil dihapus' });
});

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
