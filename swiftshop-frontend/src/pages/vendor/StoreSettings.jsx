import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { vendorAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Camera, Image as ImageIcon, Save, ExternalLink, Info } from 'lucide-react';

const StoreSettings = () => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    profileImage: '',
    backgroundImage: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await vendorAPI.getProfile();
      setFormData({
        username: res.data.username || '',
        phone: res.data.phone || '',
        profileImage: res.data.profileImage || '',
        backgroundImage: res.data.backgroundImage || '',
        description: res.data.description || ''
      });
      setVendorId(res.data._id);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
        const res = await vendorAPI.updateProfile(formData);
        
        // ✅ Update Global Auth State (Sidebar/Navbar)
        updateUser(res.data);
        
        alert('✨ Store Branding Updated Successfully!');
    } catch (err) {
        console.error("Update Error:", err);
        alert('Update failed');
    } finally {
        setSubmitting(false);
    }
};

  if (loading) return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="vendor" />
      <div className="flex-1 flex items-center justify-center">
        <Loader size="large" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar role="vendor" />
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#0D1B2A] uppercase tracking-tight">Store Branding</h1>
            <p className="text-gray-500">Customize how customers see your shop</p>
          </div>
          {vendorId && (
            <Link target="_blank" to={`/vendor-store/${vendorId}`} className="flex items-center gap-2 text-sm font-bold text-indigo-600">
              <ExternalLink size={16} /> View Live Store
            </Link>
          )}
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-10">
          <section className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="relative group">
              <div className="h-72 w-full rounded-[2.2rem] overflow-hidden bg-gray-100">
                <img src={formData.backgroundImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'} className="w-full h-full object-cover" alt="Banner" />
              </div>
              <div className="absolute -bottom-12 left-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] border-8 border-white shadow-2xl bg-indigo-600 overflow-hidden">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} className="w-full h-full object-cover" alt="Logo" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white">
                      {formData.username?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-20 pb-8 px-10 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Banner Image URL</label>
                  <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" value={formData.backgroundImage} onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})} />
               </div>
               <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Logo Image URL</label>
                  <input type="url" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" value={formData.profileImage} onChange={(e) => setFormData({...formData, profileImage: e.target.value})} />
               </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Display Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Contact Number</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Bio</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>

            <div className="bg-[#0D1B2A] p-8 rounded-[2.5rem] flex flex-col justify-between text-white">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-[#0D1B2A]">
                  <Info size={24} />
                </div>
                <h3 className="font-black uppercase">Branding Tips</h3>
                <p className="text-sm text-gray-400 leading-relaxed">High-quality banners increase trust by 40%.</p>
              </div>
              <button type="submit" disabled={submitting} className="w-full mt-8 py-4 bg-[#D4AF37] text-[#0D1B2A] rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all">
                {submitting ? <Loader size="small"/> : <><Save size={18}/> Save Changes</>}
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default StoreSettings;