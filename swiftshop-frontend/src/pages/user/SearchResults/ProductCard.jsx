import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col cursor-pointer bg-white">
      {/* 1. Image & Badge Area */}
      <div className="relative aspect-[3/4] bg-[#F9F9F9] overflow-hidden mb-5">
        <div className="absolute top-4 left-0 bg-[#222] text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] z-10 shadow-md">
          Bestseller
        </div>

        {/* Product Image Placeholder */}
        <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-1000 ease-out">
          <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center text-4xl font-black text-gray-200 italic">
            {product.name?.charAt(0) || "S"}
          </div>
        </div>

        {/* Quick View Slide Up */}
        <div className="absolute bottom-0 left-0 w-full bg-white/95 py-3.5 border-t translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">Quick View</p>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="text-center px-1">
        <h4 className="text-[#A67C52] text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 hover:underline">
          {product.brand || "Haus & Kinder"}
        </h4>
        <h3 className="text-[13px] text-gray-800 font-medium mb-3 line-clamp-1 group-hover:text-black">
          {product.name || "Premium Door Curtains"}
        </h3>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <span className="text-sm font-black text-black">₹{product.price || "1,299"}</span>
          <span className="text-[11px] text-gray-400 line-through">₹2,499</span>
          <span className="text-[11px] text-[#A67C52] font-bold">(50% OFF)</span>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center justify-center gap-2">
          <div className="bg-[#2e7d32] text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
            4.1 <Star size={8} fill="currentColor" />
          </div>
          <div className="h-3 w-[1px] bg-gray-200" />
          <span className="text-[10px] text-gray-400 font-medium tracking-tight">125 Ratings</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;