import { MapPin, Phone, Star, Share2, BadgeCheck } from 'lucide-react';

const StoreHeader = ({ vendor }) => {
  // We use a fallback if the database hasn't loaded yet
  const storeName = vendor?.username || 'Loading Store...';
  const storeDescription = vendor?.description || 'Welcome to our premium collection';

  return (
    <div className="relative -mt-24 flex flex-col items-center">
      {/* Profile Image / Logo Container */}
      <div className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-white shadow-2xl overflow-hidden flex items-center justify-center relative group">
        {vendor?.profileImage ? (
          <img 
            src={vendor.profileImage} 
            alt={storeName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0D1B2A] text-[#D4AF37] text-5xl font-black">
            {storeName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* Store Info Details */}
      <div className="mt-8 text-center max-w-2xl px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-4xl font-black text-[#0D1B2A] uppercase tracking-tighter">
            {storeName}
          </h1>
          {/* Verified Badge if it's a premium vendor */}
          <BadgeCheck className="text-blue-500" size={24} />
        </div>

        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
          {storeDescription}
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          {vendor?.phone && (
            <div className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
              <Phone size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#0D1B2A]">{vendor.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
            <MapPin size={14} className="text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#0D1B2A]">Jabalpur, MP</span>
          </div>

          <div className="flex items-center gap-2 px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
            <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
            <span className="text-xs font-black text-[#0D1B2A]">4.9 Store Rating</span>
          </div>
        </div>

        {/* Share Button */}
        <button className="mt-8 flex items-center gap-2 text-gray-400 hover:text-[#0D1B2A] transition-colors text-xs font-black uppercase tracking-widest">
          <Share2 size={16} /> Share Store Profile
        </button>
      </div>
    </div>
  );
};

export default StoreHeader;