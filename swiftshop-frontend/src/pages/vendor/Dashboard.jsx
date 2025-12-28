import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { vendorAPI } from '../../services/api';

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    lowStockItems: [],
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        vendorAPI.getProducts(),
        vendorAPI.getOrders(),
      ]);

      const products = productsRes.data;
      const orders = ordersRes.data;

      // 1. Calculate Summary Stats
      const pendingOrders = orders.filter((o) => o.status === 'pending').length;
      const revenue = orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      // 2. Identify Low Stock Items (Stock < 5)
      const lowStock = products.filter(p => p.stock < 5);

      // 3. Mock Chart Data (In a real app, you would aggregate orders by date)
      const mockChartData = [
        { day: 'Mon', sales: 2400 },
        { day: 'Tue', sales: 1398 },
        { day: 'Wed', sales: 9800 },
        { day: 'Thu', sales: 3908 },
        { day: 'Fri', sales: 4800 },
        { day: 'Sat', sales: 3800 },
        { day: 'Sun', sales: 4300 },
      ];

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
        revenue,
        lowStockItems: lowStock,
        chartData: mockChartData
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar role="vendor" />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="vendor" />

      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-500">Overview of your store performance</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Products" value={stats.totalProducts} icon="📦" color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard label="Total Orders" value={stats.totalOrders} icon="🛍️" color="text-blue-600" bg="bg-blue-50" />
          <StatCard label="Pending Orders" value={stats.pendingOrders} icon="⏳" color="text-amber-600" bg="bg-amber-50" />
          <StatCard label="Net Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon="💰" color="text-green-600" bg="bg-green-50" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Sales Analytics (Weekly)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#4F46E5" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inventory Health */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6 text-gray-800">Inventory Health</h3>
            <div className="space-y-4">
              {stats.lowStockItems.length > 0 ? (
                stats.lowStockItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-3 bg-red-50 rounded-xl border border-red-100">
                    <div className="text-2xl">⚠️</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-800 truncate">{item.name}</p>
                      <p className="text-xs text-red-600">Stock: {item.stock} units remaining</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-gray-500 text-sm">All products are well stocked!</p>
                </div>
              )}
            </div>
            
            <button className="w-full mt-6 py-3 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
              Generate Inventory Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ label, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center text-3xl shadow-inner`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default VendorDashboard;