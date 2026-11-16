import { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSave, initialData }) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama);
      setHarga(initialData.harga);
    } else {
      setNama('');
      setHarga('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nama.trim() || harga === '') return;
    onSave({ nama: nama.trim(), harga: Number(harga) });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? 'Edit Produk' : 'Tambah Produk'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Produk</label>
            <input
              type="text"
              placeholder="Contoh: Pulpen"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Harga (Rp)</label>
            <input
              type="number"
              placeholder="Contoh: 5000"
              min="0"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
