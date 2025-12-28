import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { userAPI } from "../../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (category) params.category = category;
      const response = await userAPI.getProducts(params);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section - More Compact */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-[#0D1B2A] tracking-tight">
            Our Collection
          </h1>

          {/* Search + Filter Bar - Smaller padding */}
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-gray-50 rounded-lg focus:outline-none text-xs w-full sm:w-48 transition-all"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 px-3 py-2 rounded-lg outline-none text-[11px] font-bold text-[#0D1B2A] cursor-pointer border-none"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Apparel</option>
              <option value="food">Gourmet</option>
              <option value="books">Library</option>
              <option value="home">Home Decor</option>
            </select>
          </div>
        </div>

        {/* Product Grid - Tighter gaps */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader size="medium" /></div>
        ) : error ? (
          <div className="text-red-500 text-xs text-center font-bold">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                {/* Image Container - Reduced from h-64 to h-40 */}
                <div className="relative w-full h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-3xl">📦</span>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full">
                      Low Stock
                    </span>
                  )}
                </div>

                {/* Content - Smaller text */}
                <div className="space-y-1 px-1">
                  <p className="text-[#D4AF37] text-[9px] font-black uppercase tracking-widest">{product.category}</p>
                  <h3 className="text-[#0D1B2A] font-bold text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-base font-black text-[#0D1B2A]">₹{product.price.toLocaleString()}</span>
                    <div className="w-7 h-7 bg-gray-50 text-[#0D1B2A] rounded-lg flex items-center justify-center group-hover:bg-[#0D1B2A] group-hover:text-[#D4AF37] transition-all text-xs">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;