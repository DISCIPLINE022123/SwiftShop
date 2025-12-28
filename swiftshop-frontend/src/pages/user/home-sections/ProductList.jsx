import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../../../services/api';
import Loader from '../../../components/Loader';
import { Star, ArrowRight } from 'lucide-react';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProducts();
      
      // 🟢 Sort by newest date (Assuming createdAt exists)
      const sorted = response.data.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setProducts(sorted);
    } catch (err) {
      console.error('Failed to load latest products', err);
    } finally {
      setLoading(false);
    }
  };

  const displayedProducts = products.slice(0, displayCount);

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader />
    </div>
  );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
               <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
                New Arrivals
               </span>
            </div>
            <h2 className="text-4xl font-serif italic text-[#0D1B2A] tracking-tight">
              Latest Collections
            </h2>
          </div>
          
          <Link 
            to="/products" 
            className="group flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#0D1B2A] hover:text-[#D4AF37] transition-all"
          >
            Explore All <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 italic">Fresh designs arriving soon</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12">
              {displayedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group flex flex-col"
                >
                  {/* IMAGE CONTAINER (3:4 Ratio for Fashion Look) */}
                  <div className="relative aspect-[3/4] bg-[#F9F9F9] rounded-[1.5rem] overflow-hidden mb-5 transition-all duration-700 group-hover:shadow-2xl">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl grayscale opacity-20 italic font-black">S</div>
                    )}
                    
                    {/* New Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                       <span className="text-[8px] font-black text-black uppercase tracking-tighter italic">New</span>
                    </div>

                    {/* Quick Add Overlay */}
                    <div className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <span className="text-[9px] font-black uppercase tracking-widest">View Detail</span>
                    </div>
                  </div>

                  {/* PRODUCT TEXT */}
                  <div className="px-1 text-center">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#A67C52] mb-1">
                      {product.brand || product.category}
                    </h4>
                    <h3 className="text-sm font-medium text-[#0D1B2A] truncate mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-3">
                       <p className="text-sm font-black text-black tracking-tighter">
                         ₹{product.price?.toLocaleString('en-IN')}
                       </p>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                         <Star size={10} className="fill-green-600 text-green-600" />
                         <span>4.2</span>
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* SHOW MORE ACTION */}
            {displayCount < products.length && (
              <div className="mt-24 flex justify-center">
                <button
                  onClick={() => setDisplayCount(prev => prev + 6)}
                  className="relative overflow-hidden group border border-[#0D1B2A] text-[#0D1B2A] px-16 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Load More Arrivals</span>
                  <div className="absolute inset-0 bg-[#0D1B2A] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;