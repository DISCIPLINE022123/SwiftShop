import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative py-24 bg-[#0D1B2A] overflow-hidden">
      {/* Subtle Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[100%] border border-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 text-center z-10">
        {/* Aesthetic Label */}
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-6 block">
          Exclusive Access
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
          Experience the <span className="italic font-light">New Standard</span>
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm leading-relaxed uppercase tracking-widest font-medium opacity-80">
          Join a community dedicated to premium quality and timeless design.
        </p>

        <div className="flex justify-center items-center gap-6 flex-wrap">
          {!isAuthenticated ? (
            <>
              <Link 
                to="/register" 
                className="bg-[#D4AF37] hover:brightness-110 text-[#0D1B2A] px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 active:scale-95"
              >
                Create Account
              </Link>
              
              <Link 
                to="/products" 
                className="bg-transparent border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95"
              >
                Browse Collection
              </Link>
            </>
          ) : (
            <Link 
              to="/products" 
              className="bg-[#D4AF37] hover:brightness-110 text-[#0D1B2A] px-12 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 active:scale-95"
            >
              Continue Shopping
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;