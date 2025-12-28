import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="bg-[#D4AF37] text-[#0D1B2A] py-2 border-b border-[#0D1B2A]/10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Announcement Area */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0D1B2A] rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Complimentary Express Shipping on orders over ₹5,000
            </span>
          </div>

          {/* Utility Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-opacity hover:opacity-70"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Boutiques</span>
            </a>

            <div className="h-3 w-[1px] bg-[#0D1B2A]/20" />

            <Link 
              to="/orders" 
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-opacity hover:opacity-70"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Concierge Tracking</span>
            </Link>

            <div className="h-3 w-[1px] bg-[#0D1B2A]/20" />

            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <span className="text-[#0D1B2A]/60">IN / EN</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;