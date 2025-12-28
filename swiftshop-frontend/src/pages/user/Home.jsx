import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Store, ArrowRight } from 'lucide-react';

// Import Components...
import TopBar from '../../home/TopBar';
import MainHeader from '../../home/MainHeader';
import Footer from '../../home/Footer';
import CategoryStrip from '../../home/CategoryStrip';
import HeroSection from './home-sections/HeroSection';
import CategoryGrid from './home-sections/CategoryGrid';
import ProductList from './home-sections/ProductList';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
      else if (user.role === 'vendor') navigate('/vendor/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <MainHeader />
      <CategoryStrip />
      
      <main>
        <HeroSection />
        
        {/* 🔥 MAIN BUTTON SECTION: EXPLORE ALL LISTED STORES */}
        <section className="py-12 border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                Shop Directly From Local Stores
              </h2>
              <p className="text-gray-500 text-sm">
                Hamare platform par listed verified stores ko browse karein aur unke exclusive collection se shopping karein.
              </p>
              
              <div className="pt-2">
                <Link 
                  to="/all-stores" 
                  className="inline-flex items-center gap-3 bg-[#2C4152] text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#A67C52] transition-all shadow-xl group"
                >
                  <Store size={18} />
                  Explore All Listed Stores
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CategoryGrid />
        <ProductList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;