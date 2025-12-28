import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#0D1B2A] overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-[150px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[120px] -ml-24 -mb-24 opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* TEXT CONTENT */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#D4AF37]" />
              <p className="text-[#D4AF37] font-black text-[10px] tracking-[0.5em] uppercase">
                The Winter Collection 2025
              </p>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Elegance in <br /> 
              <span className="italic font-light text-gray-300">Every Detail.</span>
            </h1>
            
            <p className="text-gray-400 mb-10 text-sm md:text-base leading-relaxed max-w-lg uppercase tracking-widest font-medium opacity-80">
              Curating the world’s finest products from artisanal vendors. 
              Uncompromising quality, delivered to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <Link 
                to="/products" 
                className="bg-[#D4AF37] hover:brightness-110 text-[#0D1B2A] px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-[#D4AF37]/20 active:scale-95"
              >
                Explore Collection
              </Link>
              
              <Link 
                to="/categories" 
                className="text-white text-[11px] font-black uppercase tracking-[0.2em] border-b border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] py-2 transition-all"
              >
                View Lookbook
              </Link>
            </div>
          </div>

          {/* VISUAL ELEMENT */}
          <div className="hidden lg:block relative">
            {/* Elegant Border Frame */}
            <div className="relative w-[400px] h-[500px] border border-[#D4AF37]/30 rounded-[3rem] rotate-3 transition-transform duration-1000 hover:rotate-0">
               <div className="absolute inset-4 bg-white/5 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center p-12 -rotate-3 transition-transform duration-1000 hover:rotate-0 overflow-hidden">
                  <span className="text-[120px] opacity-20 absolute -top-10 -right-10 text-[#D4AF37] font-serif italic">“</span>
                  <div className="text-center relative z-10">
                    <p className="text-[#D4AF37] text-[40px] font-light leading-none mb-2 italic tracking-tighter">40%</p>
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Exclusive Privilege</p>
                  </div>
                  <div className="mt-12 h-px w-12 bg-[#D4AF37]/40" />
                  <p className="mt-8 text-gray-400 text-[9px] uppercase tracking-[0.2em] text-center leading-loose">
                    Limited time access to <br/> our inaugural seasonal <br/> private sale event.
                  </p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;