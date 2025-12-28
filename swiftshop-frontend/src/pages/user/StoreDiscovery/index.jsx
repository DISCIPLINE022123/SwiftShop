import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../../services/api';
import StoreCard from './StoreCard';
import Loader from '../../../components/Loader';
import { MapPin, Search, ArrowLeft, X } from 'lucide-react';

const StoreDiscovery = () => {
  const navigate = useNavigate();
  
  // States
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("Jabalpur"); // Default City
  const [category, setCategory] = useState("All");

  const cities = ["Jabalpur", "Indore", "Bhopal", "Gwalior", "Ujjain"];
  const categories = ["All", "Clothing", "Electronics", "Footwear", "Accessories"];

  // Fetch Logic
  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      const params = { 
        city, 
        search: searchTerm, 
        category: category !== "All" ? category : "" 
      };
      const res = await userAPI.getVendors(params);
      setStores(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [city, category, searchTerm]);

  // Trigger fetch when any filter changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchStores();
    }, 300); // 300ms delay to prevent rapid API calls while typing
    return () => clearTimeout(delayDebounce);
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-[#F3F6F8]">
      
      {/* 🟢 FIXED TOP BAR (Home Page Style) */}
      <header className="sticky top-0 z-[100] bg-[#2C4152] text-white shadow-xl">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          
          {/* Back & Title */}
          <div className="flex items-center gap-4 min-w-fit">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full transition-all">
              <ArrowLeft size={24} />
            </button>
            <h1 className="hidden md:block font-black uppercase tracking-tighter text-xl">Stores</h1>
          </div>

          {/* Combined Search & City Bar */}
          <div className="flex-1 max-w-3xl flex bg-white rounded-xl overflow-hidden shadow-inner">
            <div className="flex-1 flex items-center px-4 gap-2">
              <Search className="text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search brands or shops..."
                className="w-full py-3 text-black outline-none font-medium text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && <X size={16} className="text-gray-400 cursor-pointer" onClick={() => setSearchTerm("")} />}
            </div>
            
            {/* City Selector with Background highlight */}
            <div className="flex items-center px-4 gap-2 border-l border-gray-100 bg-gray-50 min-w-[140px] md:min-w-[180px]">
              <MapPin className="text-[#A67C52]" size={16} />
              <select 
                className="w-full py-3 text-[#2C4152] font-bold text-xs uppercase outline-none bg-transparent cursor-pointer"
                value={city}
                onChange={(e) => setCity(e.target.value)} // 🔥 This triggers the useEffect
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Right Spacer (For Balance) */}
          <div className="hidden md:block w-10"></div>
        </div>

        {/* Category Strip (Second Row of TopBar) */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 flex gap-4 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  category === cat 
                  ? 'bg-[#A67C52] text-white shadow-md' 
                  : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 🟢 RESULTS GRID */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            Showing stores in <span className="text-[#A67C52]">{city}</span>
          </p>
          <p className="text-gray-400 text-xs">{stores.length} Results Found</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20"><Loader /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.length > 0 ? (
              stores.map(store => <StoreCard key={store._id} vendor={store} />)
            ) : (
              <div className="col-span-full text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-black uppercase tracking-[0.3em]">No Stores Found</p>
                <button onClick={() => {setSearchTerm(""); setCategory("All");}} className="mt-4 text-[#A67C52] font-bold text-xs underline">Clear All Filters</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StoreDiscovery;