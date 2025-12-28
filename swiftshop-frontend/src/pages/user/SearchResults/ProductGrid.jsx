import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-40">
        <p className="text-gray-300 font-black uppercase tracking-[0.5em]">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((item) => (
        <Link to={`/product/${item._id}`} key={item._id} className="group">
          
          {/* Clean Image Area */}
          <div className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden rounded-sm mb-4">
            <img 
              src={item.image || 'https://via.placeholder.com/300x400'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt={item.name}
            />
            
            {/* Small Rating Badge */}
            <div className="absolute bottom-2 left-2 bg-white/90 px-1.5 py-0.5 rounded-sm text-[9px] font-bold flex items-center gap-1 shadow-sm">
              4.2 <Star size={8} className="fill-current text-green-700" />
            </div>
          </div>

          {/* Clean Info Area */}
          <div className="text-center space-y-1 px-2">
            <h4 className="text-[#A67C52] text-[10px] font-black uppercase tracking-widest leading-tight">
              {item.brand || "Exclusive"}
            </h4>
            <h3 className="text-sm text-gray-700 font-medium truncate">
              {item.name}
            </h3>
            
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-sm font-black text-gray-900">₹{item.price}</span>
              <span className="text-[10px] text-gray-400 line-through">₹{item.price * 2}</span>
              <span className="text-[10px] text-[#A67C52] font-bold">50% OFF</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;