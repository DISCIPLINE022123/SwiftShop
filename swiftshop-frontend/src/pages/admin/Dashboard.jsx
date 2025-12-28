import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { adminAPI } from '../../services/api';
// Import your Analytics component
import AdminAnalytics from './AdminAnalytics'; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Stats Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">Platform Control Center</h1>
          <p className="text-gray-500">Welcome back, Admin. Here is what's happening today.</p>
        </header>

        {/* Dynamic Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          {['overview', 'analytics', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-all ${
                activeTab === tab 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader size="large" /></div>
        ) : (
          <div className="space-y-8">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard label="Revenue" value={`$${stats?.revenue || 0}`} change="+12%" icon="💰" color="text-green-600" bg="bg-green-100" />
                  <StatCard label="Vendors" value={stats?.totalVendors} change="+3" icon="👥" color="text-blue-600" bg="bg-blue-100" />
                  <StatCard label="Products" value={stats?.totalProducts} change="+18" icon="📦" color="text-purple-600" bg="bg-purple-100" />
                  <StatCard label="Orders" value={stats?.totalOrders} change="+5%" icon="🛍️" color="text-amber-600" bg="bg-amber-100" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 card p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Quick Glimpse</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 text-sm">Switch to the Analytics tab for detailed charts.</p>
                      <button 
                        onClick={() => setActiveTab('analytics')}
                        className="mt-2 text-primary-600 font-semibold hover:underline"
                      >
                        View Full Report →
                      </button>
                    </div>
                  </div>

                  <div className="card p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <ActionButton label="Generate Report" icon="📑" />
                      <ActionButton label="System Settings" icon="⚙️" />
                      <ActionButton label="Audit Logs" icon="🔍" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ANALYTICS TAB - This connects your Recharts file */}
            {activeTab === 'analytics' && (
              <div className="animate-fade-in">
                 {/* Note: AdminAnalytics needs to be a 'Fragment' or 'div' 
                    that contains the Recharts logic you built earlier.
                 */}
                <AdminAnalytics isEmbedded={true} />
              </div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <div className="card bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                <h3 className="font-bold mb-4">Recent System Events</h3>
                <div className="divide-y">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg">👤</div>
                      <div>
                        <p className="text-sm font-medium">New Vendor registration pending review</p>
                        <p className="text-xs text-gray-400">Just now</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Internal Helper Components
const StatCard = ({ label, value, change, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${bg} ${color} text-xl`}>{icon}</div>
      <span className="text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded">{change}</span>
    </div>
    <p className="text-gray-500 text-sm font-medium">{label}</p>
    <h4 className="text-2xl font-bold text-gray-800 mt-1">{value || 0}</h4>
  </div>
);

const ActionButton = ({ label, icon }) => (
  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 group">
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

export default AdminDashboard;