import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex gap-3 items-start sticky top-24">
      {/* Vertical Thumbnails - Narrower for better fit */}
      <div className="hidden md:flex flex-col items-center w-14 gap-2">
        <button className="text-gray-400 hover:text-black transition-colors">
          <ChevronUp size={16} />
        </button>
        
        <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar max-h-[450px]">
          {images.map((img, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveImage(index)}
              className={`w-12 h-16 flex-shrink-0 cursor-pointer border transition-all ${
                activeImage === index ? 'border-black' : 'border-transparent opacity-50'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt="thumb" />
            </div>
          ))}
        </div>

        <button className="text-gray-400 hover:text-black transition-colors">
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Main Image - Fixed Compact Size */}
      <div className="flex-1 max-w-[400px]">
        <div className="relative aspect-[3/4] bg-[#F9F9F9] overflow-hidden border border-gray-100 shadow-sm">
          <div className="absolute top-3 left-0 z-10">
            <span className="bg-[#2C4152] text-white text-[9px] px-2 py-1 font-bold tracking-widest uppercase">
              Bestseller
            </span>
          </div>

          <img 
            src={images[activeImage]} 
            className="w-full h-full object-contain bg-[#F9F9F9]" 
            alt="Product Preview" 
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;