import React from 'react';

const FilterSection = ({ title, options }) => (
  <div className="border-b border-gray-100 py-5">
    <h3 className="text-[11px] font-black uppercase tracking-wider text-gray-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input type="checkbox" className="peer w-4 h-4 appearance-none border border-gray-300 rounded-sm checked:bg-[#D4AF37] checked:border-[#D4AF37] transition-all" />
            <svg className="absolute w-3 h-3 text-white hidden peer-checked:block left-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
          </div>
          <span className="text-[13px] text-gray-500 group-hover:text-black transition-colors">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const Filters = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
      <h2 className="text-lg font-black border-b pb-4 mb-2 italic">REFINE BY</h2>
      <FilterSection title="Category" options={['Shorts', '3/4ths', 'Cargo Shorts', 'Denim Shorts']} />
      <FilterSection title="Price" options={['Below ₹500', '₹500 - ₹1000', '₹1000 - ₹2000']} />
      <FilterSection title="Brand" options={['Teamspirit', 'Buda Jeans Co', 'Netplay', 'John Player']} />
      <FilterSection title="Discount" options={['30% or more', '50% or more', '70% or more']} />
    </div>
  );
};

export default Filters;