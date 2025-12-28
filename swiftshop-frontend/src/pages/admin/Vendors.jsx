import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { adminAPI } from '../../services/api';

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'active', 'pending'
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchVendors(); }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getVendors();
      setVendors(res.data || []);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // Feature: Quick Approve Function
  const handleApprove = async (id) => {
    try {
      // Update status to active
      await adminAPI.updateVendor(id, { isActive: true, isApproved: true });
      setVendors(prev => prev.map(v => v._id === id ? { ...v, isActive: true, isApproved: true } : v));
      alert('Vendor approved successfully!');
    } catch (err) {
      alert('Approval failed');
    }
  };

  // Logic: Advanced Filtering
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesSearch = (v.name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      if (viewMode === 'pending') return matchesSearch && !v.isApproved;
      if (viewMode === 'active') return matchesSearch && v.isActive;
      return matchesSearch;
    });
  }, [vendors, searchTerm, viewMode]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold">Vendor Moderation</h1>
            <p className="text-gray-500">Review and approve vendor registrations</p>
          </div>
          <Link to="/admin/vendor/create" className="btn-primary">➕ New Vendor</Link>
        </header>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-6 bg-white p-1 rounded-xl w-fit border shadow-sm">
          <button 
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'all' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500'}`}
          >
            All Vendors ({vendors.length})
          </button>
          <button 
            onClick={() => setViewMode('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'pending' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-500'}`}
          >
            Pending ({vendors.filter(v => !v.isApproved).length})
          </button>
        </div>

        {/* The Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 font-semibold">Vendor</th>
                <th className="p-4 font-semibold">Registration Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVendors.map((vendor) => (
                <tr key={vendor._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {vendor.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{vendor.name}</p>
                        <p className="text-xs text-gray-400">{vendor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(vendor.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {vendor.isApproved ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Approved</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">Pending Review</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {!vendor.isApproved ? (
                      <button 
                        onClick={() => handleApprove(vendor._id)}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-xs px-4 py-2 rounded-lg font-bold transition-all shadow-sm"
                      >
                        ✅ Approve
                      </button>
                    ) : (
                      <div className="flex justify-end gap-2">
                         <Link to={`/admin/vendor/edit/${vendor._id}`} className="text-gray-400 hover:text-blue-600">✏️</Link>
                         <button className="text-gray-400 hover:text-red-600">🗑️</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendors;