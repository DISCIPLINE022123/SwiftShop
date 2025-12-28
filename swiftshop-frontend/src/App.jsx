import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// User Pages
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Products from './pages/user/Products';
import ProductDetail from './pages/user/ProductDetail/index.jsx';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Orders from './pages/user/Orders';
import VendorStore from './pages/user/VendorStore/index.jsx'; // Ensure filename is Vendorstore.jsx
import SearchResultsPage from './pages/user/SearchResults/index.jsx';
// App.js
import StoreDiscovery from './pages/user/StoreDiscovery/index.jsx';


// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Vendors from './pages/admin/Vendors';
import CreateVendor from './pages/admin/CreateVendor';
import EditVendor from './pages/admin/EditVendor';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Vendor Pages
import VendorDashboard from './pages/vendor/Dashboard';
import VendorProducts from './pages/vendor/Product';
import AddProduct from './pages/vendor/AddProduct';
import EditProduct from './pages/vendor/EditProduct';
import VendorOrders from './pages/vendor/Orders';
import StoreSettings from './pages/vendor/StoreSettings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* FIXED: Added Vendor Store Route here */}
          <Route path="/vendor-store/:vendorId" element={<VendorStore />} />
           <Route path="/search" element={<SearchResultsPage />} /> 

          {/* User Protected Routes */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['user']}><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={['user']}><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={['user']}><Orders /></ProtectedRoute>} />
          <Route path="/all-stores" element={<StoreDiscovery />} />

          {/* Admin Protected Routes */}
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute allowedRoles={['admin']}><Vendors /></ProtectedRoute>} />
          <Route path="/admin/vendor/create" element={<ProtectedRoute allowedRoles={['admin']}><CreateVendor /></ProtectedRoute>} />
          <Route path="/admin/vendor/edit/:id" element={<ProtectedRoute allowedRoles={['admin']}><EditVendor /></ProtectedRoute>} />

          {/* Vendor Protected Routes */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />
          <Route path="/vendor/product/add" element={<ProtectedRoute allowedRoles={['vendor']}><AddProduct /></ProtectedRoute>} />
          <Route path="/vendor/product/edit/:id" element={<ProtectedRoute allowedRoles={['vendor']}><EditProduct /></ProtectedRoute>} />
          <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>} />
          <Route path="/vendor/settings" element={<StoreSettings />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;