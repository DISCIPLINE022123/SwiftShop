import { Store, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  if (!vendor) return null;

  return (
    <div className="bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] relative overflow-hidden group transition-all hover:shadow-lg">
      {/* Background Decor */}
      <Store className="absolute -right-6 -bottom-6 text-gray-200/50 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex gap-5 items-center mb-6">
          <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-[#D4AF37] font-black text-2xl shadow-sm">
            {vendor.username?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{vendor.username}</h3>
              <CheckCircle2 size={16} className="text-blue-500" fill="currentColor" />
            </div>
            <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mt-1">
              <MapPin size={10} fill="currentColor" /> Verified Local Boutique
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 italic mb-6 leading-relaxed">
          "Trusted partner since 2024. Specializing in authentic and curated local collections."
        </p>

        <Link 
          to={`/vendor-store/${vendor._id}`} 
          className="flex items-center justify-between w-full bg-white border border-gray-200 px-6 py-4 rounded-2xl group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Visit Full Store</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default VendorCard;