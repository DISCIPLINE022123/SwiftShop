const Features = () => {
  const features = [
    {
      code: '01',
      title: 'Global Logistics',
      description: 'Expedited shipping via our exclusive premium network.'
    },
    {
      code: '02',
      title: 'Secure Encryption',
      description: 'Tier-1 protected transactions for total peace of mind.'
    },
    {
      code: '03',
      title: 'Concierge Returns',
      description: 'Complimentary 7-day collection and return service.'
    },
    {
      code: '04',
      title: 'Refined Value',
      description: 'The highest quality craftsmanship at curated price points.'
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group relative">
              {/* Decorative Number/Background */}
              <div className="absolute -top-4 -left-2 text-4xl font-black text-gray-50 group-hover:text-[#D4AF37]/10 transition-colors duration-500 select-none">
                {feature.code}
              </div>

              <div className="relative pl-6 border-l border-gray-100 group-hover:border-[#D4AF37] transition-colors duration-500">
                {/* Visual Accent */}
                <div className="w-6 h-[1px] bg-[#D4AF37] mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
                
                <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0D1B2A] mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-[12px] leading-relaxed text-gray-400 font-medium max-w-[200px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;