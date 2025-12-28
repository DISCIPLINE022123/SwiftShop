import { Link } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';

const RelatedProducts = ({ products, vendorName, vendorId }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-100 pt-16">
      <div className="flex flex-col items-center mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-2">Curated Collection</span>
        <h3 className="text-2xl font-bold text-gray-900 text-center">More from {vendorName}</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.slice(0, 4).map((item) => (
          <Link key={item._id} to={`/product/${item._id}`} className="group block">
            <div className="aspect-[3/4] bg-[#F9F9F9] mb-4 overflow-hidden rounded-2xl group-hover:shadow-xl transition-all duration-500">
              <img 
                src={item.image || item.images[0]} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest px-2 truncate">{item.name}</h4>
            <p className="text-base font-black mt-1 text-gray-900 px-2">₹{item.price}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link 
          to={`/vendor-store/${vendorId}`} 
          className="px-10 py-4 bg-[#0D1B2A] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 rounded-full hover:brightness-150 transition-all shadow-xl"
        >
          <LayoutGrid size={14} /> Visit Full Store
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;