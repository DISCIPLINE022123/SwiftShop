import React from 'react';

const ProductInfo = ({ product }) => {
  // Shirt ya Shorts ke liye size dikhane ki list
  const sizeCategories = ['shirt', 'tshirt', 'shorts', 'clothing', 'topwear', 'bottomwear'];
  const showSizes = sizeCategories.includes(product?.category?.toLowerCase());
  
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="space-y-5 md:pl-4">
      {/* Brand & Title */}
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-[#A67C52] uppercase tracking-wider">
          {product?.vendorId?.username}
        </h2>
        <h1 className="text-md text-gray-500 font-medium">
          {product?.name}
        </h1>
      </div>

      {/* Price Section */}
      <div className="pt-2 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-gray-900">₹{product?.price}</span>
          <span className="text-gray-400 line-through text-sm">MRP ₹{product?.price * 2}</span>
          <span className="text-[#A67C52] font-bold text-sm">(50% OFF)</span>
        </div>
        <p className="text-[10px] text-emerald-600 font-bold mt-1">Price inclusive of all taxes</p>
      </div>

      {/* Conditional Size Selector */}
      {showSizes && (
        <div className="space-y-3 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-gray-800 uppercase tracking-tighter">Select Size</span>
            <button className="text-[10px] font-bold text-blue-700 underline underline-offset-2">Size Chart</button>
          </div>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button 
                key={size}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[11px] font-bold hover:border-black hover:bg-black hover:text-white transition-all"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offers & Buttons */}
      <div className="pt-6 space-y-4">
        <div className="bg-[#FFF9F0] border border-dashed border-[#A67C52] p-3 rounded-md">
          <p className="text-[10px] font-bold text-[#A67C52]">Use Code: NEW30</p>
          <p className="text-[9px] text-gray-600">Get Flat 30% off on orders above ₹999</p>
        </div>

        <button className="w-full bg-[#2C4152] text-white py-4 font-bold uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-2 hover:bg-[#1a2a36] transition-all">
          Add to Bag
        </button>
        
        <button className="w-full border border-gray-200 text-gray-800 py-4 font-bold uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-2 hover:border-black transition-all">
          Save to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;