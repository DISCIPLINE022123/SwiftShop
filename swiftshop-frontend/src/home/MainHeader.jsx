import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react'; // Icon ke liye lucide-react use karein

const MainHeader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const categories = ['Electronics', 'Fashion', 'Grocery', 'Home', 'Beauty'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || category) {
      let url = `/search?q=${encodeURIComponent(searchTerm.trim())}`;
      if (category) url += `&category=${category}`;
      navigate(url);
    }
  };

  return (
    <header className="bg-[#0D1B2A] sticky top-0 z-50 border-b border-[#D4AF37]/10 backdrop-blur-md bg-opacity-95 shadow-2xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6 md:gap-12">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:rotate-6 transition-transform">
              <span className="text-[#0D1B2A] font-black text-xl italic">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white tracking-tighter block leading-none">Swift</span>
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] leading-none">Shop</span>
            </div>
          </Link>

          {/* 2. SEARCH BAR & STORE BUTTON WRAPPER */}
          <div className="flex-1 max-w-3xl flex items-center gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all focus-within:border-[#D4AF37]/50 focus-within:bg-white/10 group">
                <input
                  type="text"
                  placeholder="Search the collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent px-6 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
                
                <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="hidden md:block bg-transparent px-4 py-3 text-[10px] font-black uppercase tracking-widest text-[#D4AF37] focus:outline-none cursor-pointer hover:text-white transition-colors"
                >
                  <option value="" className="bg-[#0D1B2A]">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()} className="bg-[#0D1B2A]">{cat}</option>
                  ))}
                </select>

                <button type="submit" className="pr-6 pl-2 text-white group-hover:text-[#D4AF37] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* 🔥 NEW: ALL STORES BUTTON (Bagal mein) */}
            <Link 
              to="/all-stores" 
              className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-5 py-3 rounded-full hover:bg-[#D4AF37] hover:text-[#0D1B2A] transition-all duration-300 group/store whitespace-nowrap"
              title="Explore All Stores"
            >
              <Store size={18} className="group-hover/store:scale-110 transition-transform" />
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">
                All Stores
              </span>
            </Link>
          </div>

          {/* 3. ACTIONS */}
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group p-1">
              <svg className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#0D1B2A] text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">0</span>
            </Link>

            <Link to="/wishlist" className="group hidden lg:block">
              <svg className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default MainHeader;