import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Store, ArrowUpRight } from 'lucide-react';

const StoreCard = ({ vendor }) => {
  return (
    <Link to={`/vendor-store/${vendor._id}`} className="group block">
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Banner Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img 
            src={vendor.banner || "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070"} 
            alt={vendor.username}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={20} className="text-[#A67C52]" />
          </div>
        </div>

        {/* Store Details */}
        <div className="p-6 relative">
          {/* Circular Store Icon */}
          <div className="absolute -top-8 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-50">
            <Store size={28} className="text-[#A67C52]" />
          </div>

          <div className="mt-8 space-y-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#A67C52] transition-colors uppercase tracking-tight">
              {vendor.username}
            </h3>
            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <MapPin size={12} className="text-[#A67C52]" />
              {vendor.address || "Jabalpur, MP"}
            </div>
            <p className="text-xs text-gray-500 line-clamp-2 pt-2 italic">
              "Exclusive collection of premium wear and handpicked accessories."
            </p>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">VERIFIED STORE</span>
            <span className="text-[10px] font-bold text-gray-400">120+ Products</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;