import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  // ❌ Headers ko globally 'application/json' par fix mat kijiye 
  // taaki multipart/form-data automatically detect ho sake
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/* ================= AUTH APIs ================= */
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

/* ================= ADMIN APIs ================= */
export const adminAPI = {
  getVendors: () => api.get('/admin/vendors'),
  getVendorById: (id) => api.get(`/admin/vendor/${id}`),
  createVendor: (vendorData) => api.post('/admin/vendor', vendorData),
  updateVendor: (id, vendorData) => api.put(`/admin/vendor/${id}`, vendorData),
  deleteVendor: (id) => api.delete(`/admin/vendor/${id}`),
  getStats: () => api.get('/admin/stats'),
};

/* ================= VENDOR APIs ================= */
export const vendorAPI = {
  getProfile: () => api.get('/vendor/profile'),
  updateProfile: (data) => api.put('/vendor/profile', data),

  getProducts: () => api.get('/vendor/products'),
  
  // 🔥 FIX: Added headers for File Upload support
  createProduct: (formData) => api.post('/vendor/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  updateProduct: (id, formData) => api.put(`/vendor/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  deleteProduct: (id) => api.delete(`/vendor/product/${id}`),

  getOrders: () => api.get('/vendor/orders'),
  updateOrderStatus: (id, status) => api.put(`/vendor/order/${id}/status`, { status }),
};

/* ================= USER APIs ================= */
/* ================= USER APIs ================= */
export const userAPI = {
  // Products fetch karne ke liye (existing)
  getProducts: (params) => api.get('/user/products', { params }),
  getProductById: (id) => api.get(`/user/product/${id}`),
  getVendorProducts: (vendorId) => api.get(`/user/products/vendor/${vendorId}`),

  // 🔥 NEW: Vendors/Stores fetch karne ke liye with Filters (City & Category)
  // Usage: getVendors({ city: 'Jabalpur', category: 'Electronics' })
  getVendors: (params) => api.get('/user/vendors', { params }),

  // Cart & Orders (existing)
  addToCart: (data) => api.post("/cart", data),
  getCart: () => api.get("/cart"),
  updateCartItem: (id, quantity) => api.put(`/cart/${id}`, { quantity }),
  removeFromCart: (id) => api.delete(`/cart/${id}`),
  clearCart: () => api.delete("/cart"),
  createOrder: (orderData) => api.post('/user/order', orderData),
  getOrders: () => api.get('/user/orders'),
  cancelOrder: (id) => api.put(`/user/order/${id}/cancel`),
};
export default api;