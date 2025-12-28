import React from 'react';
import { Link } from 'react-router-dom'; // 1. Link import karein

const ProductGrid = ({ products = [] }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <p className="text-gray-400 font-black uppercase tracking-widest italic">No items found</p>
        <p className="text-sm text-gray-400 mt-2">Try searching for "Singh" or another keyword</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item) => (
        /* 2. Poore card ko Link se wrap karein */
        <Link 
          to={`/product/${item._id}`} 
          key={item._id} 
          className="bg-white group cursor-pointer rounded-lg overflow-hidden transition-all hover:shadow-xl border border-gray-100 p-4 hover:-translate-y-1 block"
        >
          {/* Image Placeholder */}
          <div className="aspect-square bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
              />
            ) : (
              <span className="text-gray-300">No Image</span>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-sm text-gray-800 font-bold truncate mb-1 uppercase group-hover:text-[#D4AF37] transition-colors">
              {item.name}
            </h3>
            <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest font-bold">
              {item.category}
            </p>
            <div className="flex items-center justify-center gap-2">
               <span className="font-black text-gray-900 text-lg">₹{item.price}</span>
               {/* Optional: Agar discount dikhana ho */}
               {item.oldPrice && (
                 <span className="text-xs text-gray-400 line-through">₹{item.oldPrice}</span>
               )}
            </div>
            
            {/* View Details Button (Visual only, Link handles the click) */}
            <div className="mt-4 py-2 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest rounded group-hover:bg-[#D4AF37] group-hover:text-[#0D1B2A] transition-all">
              View Details
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;