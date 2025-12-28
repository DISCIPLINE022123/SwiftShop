import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { vendorAPI } from '../../services/api';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await vendorAPI.getProducts();
      setProducts(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="vendor" />
      <div className="flex-1 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Inventory</h1>
            <p className="text-gray-500">{products.length} Products listed</p>
          </div>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="px-4 py-2 border rounded-xl focus:ring-2 ring-primary-500 outline-none w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/vendor/product/add" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              + New Product
            </Link>
          </div>
        </div>

        {loading ? <Loader /> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-48 bg-gray-100">
                  <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 10 ? 'In Stock' : `Only ${product.stock} Left`}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                  <p className="text-xl font-black text-gray-900 mb-4">₹{product.price}</p>
                  <div className="flex gap-2">
                    <Link to={`/vendor/product/edit/${product._id}`} className="flex-1 text-center py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-100">Edit</Link>
                    <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;