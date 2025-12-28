import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ role = 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/vendors', label: 'Vendors', icon: '👥' },
    { path: '/admin/vendor/create', label: 'Add Vendor', icon: '➕' },
  ];

  const vendorLinks = [
    { path: '/vendor/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/vendor/products', label: 'Products', icon: '📦' },
    { path: '/vendor/product/add', label: 'Add Product', icon: '➕' },
    { path: '/vendor/orders', label: 'Orders', icon: '🛍️' },
    { path: '/vendor/settings', label: 'Store Settings', icon: '⚙️' },
  ];

  const links = role === 'admin' ? adminLinks : vendorLinks;

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#0D1B2A] rounded-lg flex items-center justify-center">
            <span className="text-[#D4AF37] font-bold text-xl">S</span>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 block">SwiftShop</span>
            <span className="text-xs text-gray-500 capitalize">{role} Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gray-100 text-[#0D1B2A] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
            {/* ✅ DYNAMIC LOGO DISPLAY */}
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#0D1B2A] font-semibold text-sm">
                {(user?.username || user?.name || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            {/* ✅ DYNAMIC USERNAME DISPLAY */}
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.username || user?.name || 'Store User'}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600 transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;