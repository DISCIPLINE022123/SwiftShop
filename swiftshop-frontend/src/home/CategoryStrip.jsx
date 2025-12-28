import { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryStrip = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const navItems = [
    {
      name: 'Fashion',
      img: 'https://rukminim2.flixcart.com/flap/80/80/image/82b3ca5fb2301045.png',
      subCategories: [
        { name: 'WESTERN WEAR', items: ['Dresses', 'Jeans & Jeggings', 'Tops', 'Trousers & Pants', 'T-shirts', 'Shirts', 'Leggings', 'Co-Ord Sets'] },
        { name: 'ETHNIC WEAR', items: ['Kurta Suit Sets', 'Kurta-Bottom Sets', 'Kurtas', 'Kurtis & Tunics', 'Lehenga Choli', 'Salwars', 'Sarees'] },
        { name: 'INNERWEAR / LINGERIE', items: ['Bras', 'Night & Lounge Wear', 'Nighties', 'Panties', 'Pyjamas', 'Shapewear', 'Thermal Wear'] },
        { name: 'FOOTWEAR', items: ['Boots', 'Casual Shoes', 'Flip Flops', 'Sandals', 'Sneakers', 'Sports Shoes', 'Formal Shoes'] },
        { name: 'ACCESSORIES', items: ['Backpacks', 'Belts', 'Caps & Hats', 'Clutches', 'Handbags', 'Shawls', 'Socks', 'Sunglasses', 'Wallets', 'Watches'] },
        { name: 'JEWELLERY', items: ['Gold & Silver Coins', 'Fashion Jewellery', 'Bracelets', 'Chains', 'Earrings', 'Rings'] }
      ]
    },
    {
      name: 'Home & Living',
      img: 'https://rukminim2.flixcart.com/flap/80/80/image/ab7e2c021d97a8e2.png',
      subCategories: [
        { name: 'BED LINEN', items: ['Bedsheets', 'Bedding Sets', 'Blankets & Quilts', 'Comforters', 'Bed Covers', 'Mattress Protectors'] },
        { name: 'CURTAIN & ACCESSORIES (HOT)', items: ['Window Curtains', 'Door Curtains', 'Rugs & Carpets'] },
        { name: 'KITCHEN (NEW)', items: ['Cookware & Cutlery', 'Bakeware', 'Kitchen Tools', 'Organisers', 'Dining & Serveware'] },
        { name: 'HOME DECOR (HOT)', items: ['Wall Decor', 'Shelves', 'Clocks', 'Photo Frames', 'Mirrors', 'Lamps', 'Home Fragrance', 'Plants'] },
        { name: 'BATH', items: ['Bath Towels', 'Hand Towels', 'Bath Mats', 'Laundry Baskets', 'Bathroom Organisers'] }
      ]
    },
    {
      name: 'Beauty',
      img: 'https://rukminim2.flixcart.com/flap/80/80/image/dff3f7adcf3a90c6.png',
      subCategories: [
        { name: 'SKIN CARE', items: ['Cleanser', 'Moisturisers', 'Serum', 'Sunscreen', 'Masks', 'Eye Cream', 'Lip Balm', 'Face Wash'] },
        { name: 'MAKEUP', items: ['Lipstick', 'Lip Gloss', 'Nail Care', 'Mascara', 'Eyeliner', 'Foundation', 'Concealer', 'Eyeshadow', 'Primer', 'Compact'] },
        { name: 'HAIR CARE', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Styling'] },
        { name: 'FRAGRANCES', items: ['Perfumes', 'Deodorants', 'Spray Mist'] },
        { name: 'MEN GROOMING', items: ['Shaving Essentials', 'Beard Essentials', 'Hair Wax'] },
        { name: 'FEATURED BRANDS', items: ['Beauty of Joseon', 'Bioderma', 'Cetaphil', 'COSRX', 'Huda Beauty', 'Lakme', 'L’Oreal', 'MAC', 'Maybelline'] }
      ]
    },
    {
      name: 'Electronics',
      img: 'https://rukminim2.flixcart.com/flap/80/80/image/69cffacc2c180911.png',
      subCategories: [
        { name: 'AUDIO & SOUND', items: ['TWS Earbuds', 'Bluetooth Headphones', 'Wired Earphones', 'Bluetooth Speakers', 'Soundbars', 'Home Audio'] },
        { name: 'LAPTOPS & PC', items: ['Gaming Laptops', 'Thin & Light Laptops', 'Business Laptops', 'Monitors', 'Keyboards', 'Mouse'] },
        { name: 'MOBILE ACCESSORIES', items: ['Power Banks', 'Fast Chargers', 'Cables', 'Cases & Covers', 'Screen Guards', 'Memory Cards'] },
        { name: 'SMART TECH (NEW)', items: ['Smart Watches', 'Fitness Bands', 'Smart Bulbs', 'Smart Plugs', 'Security Cameras'] },
        { name: 'STORAGE', items: ['External Hard Drives', 'SSD', 'Pen Drives', 'SD Cards'] },
        { name: 'APPLIANCES (HOT)', items: ['Trimmers', 'Hair Dryers', 'Electric Kettles', 'Air Purifiers'] }
      ]
    },
    {
      name: 'Grocery',
      img: 'https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png',
      subCategories: [
        { name: 'STAPLES', items: ['Atta & Flours', 'Rice Products', 'Dals & Pulses', 'Cooking Oils', 'Ghee', 'Sugar', 'Salt & Spices'] },
        { name: 'SNACKS', items: ['Biscuits', 'Chips', 'Tea & Coffee', 'Fruit Juices', 'Soft Drinks'] },
        { name: 'PACKAGED FOOD', items: ['Noodles', 'Ketchup', 'Chocolates', 'Pickles', 'Cereals'] },
        { name: 'HOUSEHOLD', items: ['Detergents', 'Cleaners', 'Pooja Needs', 'Repellents'] }
      ]
    }
  ];

  return (
    <div className="relative bg-[#0D1B2A] border-b border-[#D4AF37]/20 z-[40]">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-10 lg:gap-16 py-3">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onMouseEnter={() => setHoveredCategory(item.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative group cursor-pointer pb-2 pt-1"
            >
              <div className="flex flex-col items-center gap-1.5 transition-all duration-300 group-hover:-translate-y-1">
                <div className="w-10 h-10 transition-all duration-500 group-hover:scale-110">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain brightness-95 contrast-125" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </span>
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${hoveredCategory === item.name ? 'rotate-180 text-[#D4AF37]' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {hoveredCategory === item.name && (
                <div className="absolute top-full left-0 pt-2 w-64 z-[50] animate-in fade-in slide-in-from-top-1">
                  <div className="bg-[#0D1B2A] border border-[#D4AF37]/30 shadow-2xl py-1">
                    {item.subCategories.map((sub) => (
                      <div key={sub.name} className="group/sub relative">
                        <div className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors">
                          <span className={`text-[9px] font-black uppercase tracking-widest ${sub.name.includes('(HOT)') ? 'text-orange-500' : sub.name.includes('(NEW)') ? 'text-green-500' : 'text-gray-300'}`}>
                            {sub.name}
                          </span>
                          <svg className="w-3 h-3 text-gray-700 group-hover/sub:text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>

                        {/* LEVEL 2 Flyout */}
                        <div className="absolute left-full top-[-1px] hidden group-hover/sub:block w-[580px] pl-[2px] animate-in fade-in slide-in-from-left-1">
                          <div className="bg-[#0D1B2A] border border-[#D4AF37]/30 shadow-2xl p-7">
                            <h4 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-5 border-b border-white/5 pb-2 italic">
                              {sub.name.split(' (')[0]}
                            </h4>
                            <ul className="grid grid-cols-3 gap-x-6 gap-y-4">
                              {sub.items.map((product) => (
                                <li key={product} className="group/item">
                                  {/* 🔥 FIX: /products ko /search mein badla gaya hai */}
                                  <Link 
                                    to={`/search?q=${encodeURIComponent(product)}`}
                                    className="text-gray-400 text-[10px] font-bold hover:text-white transition-all flex items-center gap-2 uppercase tracking-tight"
                                  >
                                    <span className="w-1 h-1 bg-white/10 group-hover/item:bg-[#D4AF37] group-hover/item:scale-150 transition-all rounded-full" />
                                    {product}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryStrip;