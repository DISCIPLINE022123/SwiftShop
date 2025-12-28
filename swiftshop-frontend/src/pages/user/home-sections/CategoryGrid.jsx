import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    { 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500&auto=format&fit=crop', 
      // 🟢 'q' ki jagah 'category' parameter use kiya hai
      link: '/search?category=Electronics' 
    },
    { 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Clothing' 
    },
    { 
      name: 'Food', 
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Food' 
    },
    { 
      name: 'Books', 
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Books' 
    },
    { 
      name: 'Home', 
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Home' 
    },
    { 
      name: 'Toys', 
      image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Toys' 
    },
    { 
      name: 'Sports', 
      image: 'https://images.unsplash.com/photo-1461896756970-8d17918456b2?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Sports' 
    },
    { 
      name: 'Beauty', 
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500&auto=format&fit=crop', 
      link: '/search?category=Beauty' 
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-14 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-3">
            Browse by Style
          </span>
          <h2 className="text-3xl font-serif italic text-[#0D1B2A] tracking-tight">
            Shop by Category
          </h2>
          <div className="h-[1px] w-16 bg-[#D4AF37] mt-5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square bg-[#F9F9F9] rounded-full overflow-hidden transition-all duration-700 hover:shadow-xl ring-0 hover:ring-4 ring-[#D4AF37]/10">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              <h3 className="mt-5 text-[10px] font-black text-[#0D1B2A] uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[#A67C52]">
                {category.name}
              </h3>
              <div className="w-0 h-[1.5px] bg-[#D4AF37] mt-2 transition-all duration-500 group-hover:w-8" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;