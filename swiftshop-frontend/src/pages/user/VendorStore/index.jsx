import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import Loader from '../../../components/Loader';

import StoreHeader from './StoreHeader';
import StoreFilters from './StoreFilters';
import ProductGrid from './ProductGrid';

const VendorStoreIndex = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        // 1. Fetch products
        const response = await userAPI.getProducts({ vendorId });
        setProducts(response.data);
        
        // 2. Extract vendor data from the first product
        if (response.data.length > 0) {
          const freshVendorData = response.data[0].vendorId;
          
          // 3. FORCE REFRESH: Add a timestamp to image URLs to bypass local browser cache
          if (freshVendorData.profileImage) {
            freshVendorData.profileImage = `${freshVendorData.profileImage}?t=${new Date().getTime()}`;
          }
          if (freshVendorData.backgroundImage) {
            freshVendorData.backgroundImage = `${freshVendorData.backgroundImage}?t=${new Date().getTime()}`;
          }
          
          setVendor(freshVendorData);
        }
      } catch (err) {
        console.error("Store Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreData();
  }, [vendorId]);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader size="large" /></div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* DYNAMIC HERO BANNER */}
      <div className="relative h-80 bg-[#0D1B2A] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-60 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url(${vendor?.backgroundImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'})` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FDFDFD]" />
      </div>

      <main className="container mx-auto px-6 pb-20">
        <StoreHeader vendor={vendor} />
        
        <div className="mt-16">
          <StoreFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            total={filteredProducts.length}
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <ProductGrid products={filteredProducts} />
        </div>
      </main>
    </div>
  );
};

export default VendorStoreIndex;