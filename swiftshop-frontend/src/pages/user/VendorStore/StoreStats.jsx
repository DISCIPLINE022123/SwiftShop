import { TrendingUp, Package, ShoppingCart, IndianRupee, Star, Users } from 'lucide-react';

const StoreStats = ({ stats, publicView = false }) => {
  // Logic to switch between Vendor Dashboard stats and Public Store stats
  const statItems = publicView 
    ? [
        {
          label: 'Products',
          value: stats?.totalProducts || '0',
          icon: <Package size={20} />,
          color: 'bg-indigo-50 text-indigo-600',
        },
        {
          label: 'Happy Customers',
          value: '500+',
          icon: <Users size={20} />,
          color: 'bg-emerald-50 text-emerald-600',
        },
        {
          label: 'Store Rating',
          value: '4.9/5',
          icon: <Star size={20} />,
          color: 'bg-amber-50 text-[#D4AF37]',
        },
      ]
    : [
        {
          label: 'Total Revenue',
          value: `₹${stats?.totalRevenue?.toLocaleString() || '0'}`,
          icon: <IndianRupee size={20} />,
          color: 'bg-emerald-50 text-emerald-600',
          trend: '+12%',
        },
        {
          label: 'Total Orders',
          value: stats?.totalOrders || '0',
          icon: <ShoppingCart size={20} />,
          color: 'bg-indigo-50 text-indigo-600',
          trend: '+5%',
        },
        {
          label: 'Inventory',
          value: stats?.totalProducts || '0',
          icon: <Package size={20} />,
          color: 'bg-amber-50 text-[#D4AF37]',
          trend: 'Updated',
        },
        {
          label: 'Growth',
          value: 'Top 10%',
          icon: <TrendingUp size={20} />,
          color: 'bg-rose-50 text-rose-600',
          trend: 'Active',
        },
      ];

  return (
    <div className={`grid gap-6 ${publicView ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} mb-10`}>
      {statItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:rotate-12 ${item.color}`}>
              {item.icon}
            </div>
            {item.trend && (
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                {item.trend}
              </span>
            )}
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
              {item.label}
            </p>
            <h3 className="text-2xl font-black text-[#0D1B2A] tracking-tight">
              {item.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreStats;