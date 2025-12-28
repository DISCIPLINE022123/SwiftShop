import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  const [activeMenu, setActiveMenu] = useState(null);

  // Function to handle the search execution
 const handleSearch = (e) => {
  e.preventDefault();
  if (searchTerm.trim()) {
    navigate(`/search?q=${searchTerm}`);
  } else {
    // Agar kuch type nahi kiya toh main products page par bhej dein
    navigate('/products'); 
  }
};

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const categories = [
    {
      name: "Fashion",
      columns: [
        { title: "Men's Top Wear", items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Blazers", "Raincoats"] },
        { title: "Women Ethnic", items: ["Sarees", "Kurtas", "Ethnic Sets", "Lehenga Choli"] },
        { title: "Footwear", items: ["Men's Shoes", "Women's Heels", "Kids Shoes", "Slippers"] },
        { title: "Accessories", items: ["Watches", "Bags", "Belts", "Sunglasses"] }
      ]
    },
    {
      name: "Electronics",
      columns: [
        { title: "Audio", items: ["Bluetooth Headphones", "Earbuds", "Speakers", "Soundbars"] },
        { title: "Computer", items: ["Laptops", "Monitors", "Keyboards", "Storage Devices"] },
        { title: "Mobiles", items: ["Smartphones", "Tablets", "Cases", "Power Banks"] }
      ]
    },
    {
      name: "Home & Kitchen",
      columns: [
        { title: "Kitchen & Dining", items: ["Cookware", "Tableware", "Kitchen Tools", "Storage"] },
        { title: "Decor", items: ["Wall Decor", "Clocks", "Lighting", "Photo Frames"] },
        { title: "Furniture", items: ["Bedrooms", "Living Room", "Office", "Kids Furniture"] }
      ]
    }
  ];

  return (
    <nav className="bg-[#0D1B2A] sticky top-0 z-[100] border-b border-[#D4AF37]/20 shadow-2xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-[#0D1B2A] font-black text-xl italic">S</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tighter hidden md:block">
              SwiftShop<span className="text-[#D4AF37]">.</span>
            </span>
          </Link>

          {/* 2. Global Search Bar - UPDATED WITH FORM LOGIC */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-2.5 focus-within:border-[#D4AF37]/50 focus-within:bg-white/10 transition-all">
              <button type="submit">
                <svg className="w-4 h-4 text-gray-400 hover:text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="w-full bg-transparent px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </form>

          {/* 3. Orders, Cart & Auth */}
          <div className="flex items-center gap-8">
            <Link to="/orders" className="flex flex-col items-center group">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest group-hover:text-[#D4AF37]">My</span>
              <span className="text-[12px] text-white font-black uppercase tracking-wider group-hover:text-[#D4AF37]">Orders</span>
            </Link>

            <Link to="/cart" className="relative group p-1">
              <svg className="w-7 h-7 text-white group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0D1B2A] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-lg">0</span>
            </Link>

            <div className="h-10 w-[1px] bg-white/10 hidden lg:block" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="hidden xl:block">
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-none">Hello,</p>
                  <p className="text-[12px] text-[#D4AF37] font-black uppercase tracking-wider">{user?.username || user?.name?.split(' ')[0]}</p>
                </div>
                <button onClick={handleLogout} className="text-[10px] font-black text-white hover:text-red-400 uppercase tracking-widest transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="bg-[#D4AF37] text-[#0D1B2A] px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* --- BOTTOM ROW: Professional Category List --- */}
        <div className="flex justify-center items-center gap-12 pb-3 relative">
          {categories.map((cat) => (
            <div 
              key={cat.name}
              className="group py-2"
              onMouseEnter={() => setActiveMenu(cat.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] group-hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                {cat.name}
                <svg className={`w-3 h-3 transition-transform ${activeMenu === cat.name ? 'rotate-180 text-[#D4AF37]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* MEGA MENU: Multi-column Dropdown */}
              {activeMenu === cat.name && (
                <div className="absolute left-0 right-0 top-full pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-[#0D1B2A] border border-[#D4AF37]/20 shadow-2xl rounded-b-xl p-10 grid grid-cols-4 gap-12">
                    {cat.columns.map((column) => (
                      <div key={column.title} className="space-y-4">
                        <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/5 pb-2">
                          {column.title}
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {column.items.map((item) => (
                            <li key={item}>
                              <Link 
                                to={`/search?q=${item}`}
                                className="text-gray-400 text-[11px] font-bold uppercase tracking-wider hover:text-white hover:translate-x-1 transition-all inline-block"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <Link to="/products" className="text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.25em] hover:brightness-125 transition-all underline underline-offset-8">
            The Archive
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;