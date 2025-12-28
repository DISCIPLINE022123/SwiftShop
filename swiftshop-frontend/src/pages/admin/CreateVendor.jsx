import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { adminAPI } from '../../services/api';

const CreateVendor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    shopName: '',
    address: '',
    // 🔥 NEW FIELDS ADDED FOR FILTERS
    city: 'Jabalpur', 
    businessCategory: 'Clothing'
  });

  const cities = ["Jabalpur", "Indore", "Bhopal", "Gwalior", "Ujjain"];
  const categories = ["Clothing", "Electronics", "Footwear", "Accessories", "Grocery"];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Is data mein ab city aur category bhi jayegi
      await adminAPI.createVendor(formData);
      alert('Vendor created successfully');
      navigate('/admin/vendors');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create vendor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-display font-bold mb-8 text-[#2C4152]">Add New Vendor</h1>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>}

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Existing Fields (Name, Email, Password) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52]" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52]" required />
                </div>
              </div>

              {/* 🔥 NEW: CITY & CATEGORY DROPDOWNS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">City *</label>
                  <select name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52] bg-white">
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Category *</label>
                  <select name="businessCategory" value={formData.businessCategory} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52] bg-white">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Other Fields (Password, Phone, etc.) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52]" required minLength={6} />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Shop Name</label>
                <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} className="w-full p-3 border rounded-xl outline-none focus:border-[#A67C52]" />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-[#2C4152] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#1a2a36] transition-all">
                  {loading ? <Loader size="small" /> : 'Create Vendor'}
                </button>
                <button type="button" onClick={() => navigate('/admin/vendors')} className="px-8 py-4 border border-gray-200 rounded-xl font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVendor;