import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import Loader from '../../components/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const token = response.data?.token;
      const user = response.data?.result;

      if (!token || !user) throw new Error('Invalid login response');

      login(user, token);

      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'vendor') {
        navigate('/vendor/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo - Compact & Premium */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex flex-col items-center">
            <div className="w-10 h-10 bg-[#0D1B2A] border border-[#D4AF37] rounded-lg flex items-center justify-center mb-2">
              <span className="text-[#D4AF37] font-black text-xl">S</span>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#0D1B2A]">
              SwiftShop
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-[#0D1B2A]">Welcome Back</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-2.5 rounded-lg mb-4 text-[11px] font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#0D1B2A] uppercase tracking-widest mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-3 rounded-xl focus:bg-white focus:border-[#D4AF37] outline-none transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0D1B2A] text-[#D4AF37] py-3.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] mt-2 hover:brightness-125 transition-all shadow-lg shadow-navy-900/10 flex items-center justify-center"
            >
              {loading ? <Loader size="small" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[11px] text-gray-500 font-medium">
              New to SwiftShop?{' '}
              <Link
                to="/register"
                className="text-[#D4AF37] font-black uppercase tracking-tighter hover:underline"
              >
                Create Account
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

export default Login;