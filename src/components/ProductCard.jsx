export default function ProductCard({ product, onEdit, onDelete }) {
  const formatRupiah = (angka) => {
    return 'Rp' + Number(angka).toLocaleString('id-ID');
  };

  return (
    <div className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h3 className="product-name">{product.nama}</h3>
      <p className="product-price">{formatRupiah(product.harga)}</p>
      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(product.id)}>
          Hapus
        </button>
      </div>
    </div>
  );
}
