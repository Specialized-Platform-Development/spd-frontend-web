import { useState, useEffect } from 'react';
import productService from '../services/productService';
import { formatPrice } from '../data/products';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await productService.getAllProducts();
            // Handle nested response format
            if (fetchedProducts.data && fetchedProducts.data.products && Array.isArray(fetchedProducts.data.products)) {
                setProducts(fetchedProducts.data.products);
            } else if (fetchedProducts.data && Array.isArray(fetchedProducts.data)) {
                setProducts(fetchedProducts.data);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error("Failed to load products", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await productService.createProduct(formData);
            setSuccess('Produk berhasil ditambahkan!');
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                imageUrl: ''
            });
            fetchProducts(); // Refresh list
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Gagal menambahkan produk');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            try {
                await productService.deleteProduct(id);
                fetchProducts(); // Refresh list
            } catch (err) {
                console.error(err);
                alert('Gagal menghapus produk');
            }
        }
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 className="section-title">Admin Dashboard</h1>

            <div className="product-detail-container" style={{ gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="checkout-form">
                    <h2 style={{ marginBottom: '1.5rem' }}>Tambah Produk Baru</h2>
                    {error && <div className="form-alert error">{error}</div>}
                    {success && <div className="form-alert" style={{ backgroundColor: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Nama Produk</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deskripsi</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-control"
                                rows="3"
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Harga (Rp)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Stok</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">URL Gambar</label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            Tambah Produk
                        </button>
                    </form>
                </div>
            </div>

            <div className="cart-items">
                <h2 style={{ marginBottom: '1.5rem' }}>Daftar Produk</h2>
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Nama</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Harga</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Stok</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1rem' }}>{product.name}</td>
                                    <td style={{ padding: '1rem' }}>{formatPrice(product.price)}</td>
                                    <td style={{ padding: '1rem' }}>{product.stock}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn-remove"
                                            style={{ padding: '0.4rem 0.8rem' }}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
