const Loader = ({ size = 'medium', fullScreen = false }) => {
  // Size mappings using your premium scale
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-[3px]',
    large: 'w-20 h-20 border-[4px]',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* The Main Golden Spinner */}
        <div
          className={`${sizeClasses[size]} border-[#D4AF37] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(212,175,55,0.2)]`}
        ></div>
        
        {/* Small Navy Dot in the center for a luxury feel */}
        <div className="absolute w-1.5 h-1.5 bg-[#0D1B2A] rounded-full"></div>
      </div>
      
      {fullScreen && (
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D1B2A] animate-pulse">
            SwiftShop
          </span>
          <div className="h-[1px] w-8 bg-[#D4AF37] mt-1 opacity-50"></div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0D1B2A]/5 backdrop-blur-sm flex items-center justify-center z-[100]">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-[#D4AF37]/10">
          {loader}
        </div>
      </div>
    );
  }

  return loader;
};

export default Loader;