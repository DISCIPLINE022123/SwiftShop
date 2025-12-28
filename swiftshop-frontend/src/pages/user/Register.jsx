import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import Loader from '../../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
      await authAPI.register(formData);
      navigate('/login', {
        state: { message: 'Registration successful! Please login.' },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        
        {/* Logo - Matching Luxury Theme */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex flex-col items-center">
            <div className="w-10 h-10 bg-[#0D1B2A] border border-[#D4AF37] rounded-lg flex items-center justify-center mb-2 shadow-sm">
              <span className="text-[#D4AF37] font-black text-xl">S</span>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#0D1B2A]">
              SwiftShop
            </span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-[#0D1B2A]">Create Account</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Join our premium marketplace</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-2.5 rounded-lg mb-4 text-[11px] font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#0D1B2A] uppercase tracking-widest mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-[#D4AF37] outline-none transition-all text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#0D1B2A] uppercase tracking-widest mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-[#D4AF37] outline-none transition-all text-sm"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#0D1B2A] uppercase tracking-widest mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-[#D4AF37] outline-none transition-all text-sm"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D1B2A] text-[#D4AF37] py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] mt-2 hover:brightness-125 transition-all shadow-lg shadow-navy-900/10 flex items-center justify-center"
            >
              {loading ? <Loader size="small" /> : 'Register Now'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-gray-500 font-medium">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#D4AF37] font-black uppercase tracking-tighter hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] hover:text-[#0D1B2A] transition-colors">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;