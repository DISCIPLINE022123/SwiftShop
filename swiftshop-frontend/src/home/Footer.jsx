import { Link } from 'react-router-dom';

const Footer = () => {
  const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Clothing', slug: 'clothing' },
    { name: 'Gourmet Food', slug: 'food' },
    { name: 'Literary', slug: 'books' }
  ];

  return (
    <footer className="bg-[#0D1B2A] text-white pt-20 pb-10 border-t border-[#D4AF37]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
              SwiftShop Premium
            </h3>
            <p className="text-gray-400 text-[12px] leading-loose tracking-wide max-w-xs">
              A curated multi-vendor marketplace dedicated to the art of fine living. 
              Delivering excellence through a global network of artisanal partners.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
              Navigation
            </h3>
            <ul className="space-y-4">
              {['Shop', 'My Account', 'Track Order', 'Shopping Cart'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-[11px] uppercase tracking-[0.1em] text-gray-400 hover:text-[#D4AF37] transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
              Collections
            </h3>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link 
                    to={`/products?category=${cat.slug}`}
                    className="text-[11px] uppercase tracking-[0.1em] text-gray-400 hover:text-[#D4AF37] transition-all duration-300"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">
              Concierge
            </h3>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.1em] text-gray-400">
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-gray-600 font-black tracking-[0.2em]">Email</span>
                <span className="text-white hover:text-[#D4AF37] cursor-pointer transition-colors">support@swiftshop.com</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-gray-600 font-black tracking-[0.2em]">Inquiries</span>
                <span className="text-white">1800-123-4567</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-gray-600 font-black tracking-[0.2em]">Headquarters</span>
                <span className="text-white">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
            © 2025 SwiftShop — All Rights Reserved
          </p>
          
          <div className="flex gap-8">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;