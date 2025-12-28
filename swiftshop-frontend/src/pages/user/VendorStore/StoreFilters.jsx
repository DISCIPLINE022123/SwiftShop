import { Search, LayoutGrid, List } from 'lucide-react';

const StoreFilters = ({ searchQuery, setSearchQuery, total, categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="space-y-6 mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            Store Inventory <span className="text-[#D4AF37] ml-2">({total})</span>
          </h2>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search in this shop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-[#D4AF37]/5 transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-gray-100 py-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCategory === 'All' ? 'bg-[#0D1B2A] text-[#D4AF37] shadow-lg' : 'bg-gray-50 text-gray-500'
            }`}
          >
            All Items
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-[#0D1B2A] text-[#D4AF37] shadow-lg' : 'bg-gray-50 text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreFilters;