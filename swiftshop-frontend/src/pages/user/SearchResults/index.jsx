import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import ProductGrid from './ProductGrid';
import Loader from '../../../components/Loader';
import Filters from './Filters';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
// SearchResults.jsx mein useEffect ke andar ye logic hona chahiye:

useEffect(() => {
  const fetchSearchData = async () => {
    try {
      setLoading(true);
      
      // URL se query 'q' aur 'category' dono uthayein
      const query = searchParams.get('q') || "";
      const category = searchParams.get('category') || "";

      // Backend ko dono bhejein
      const res = await axios.get(`http://localhost:5000/api/products/search?q=${query}&category=${category}`);
      
      setProducts(res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  fetchSearchData();
}, [searchParams]); // Jab bhi URL change ho (q ya category), data fetch ho

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-[280px] border-r border-gray-100 p-6 hidden md:block sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
           <Filters />
        </aside>

        {/* MAIN PRODUCT AREA */}
        <main className="flex-1 p-6 lg:p-10">
          
          {/* Simple Header */}
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter uppercase text-gray-900">
                {query ? `"${query}"` : "Search Results"}
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">
                Showing {products.length} products
              </p>
            </div>
            
            {/* Minimal Sort */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase">Sort:</span>
              <select className="text-xs font-bold bg-transparent outline-none cursor-pointer border-b border-gray-200 pb-1">
                <option>Relevance</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-40"><Loader /></div>
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;