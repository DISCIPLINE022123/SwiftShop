import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { userAPI } from "../../services/api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await userAPI.getCart();
      setCart(res.data || { items: [] });
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELTA LOGIC: 
   * Instead of sending the new total (e.g., 6), 
   * we send the CHANGE (e.g., +1 or -1).
   */
  const handleQuantityUpdate = async (item, change) => {
    // 1. Block if already updating or if trying to go below 1
    if (updatingId || (item.quantity + change < 1)) return;

    try {
      setUpdatingId(item._id);
      const pId = item.productId?._id || item.productId;

      // 2. We send '1' to add one, or '-1' to subtract one.
      // This works with almost all 'addToCart' backend logic.
      await userAPI.addToCart({ 
        productId: pId, 
        quantity: change 
      });

      // 3. Refresh data from server to get the final correct number
      await fetchCart();
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setUpdatingId(itemId);
      await userAPI.removeFromCart(itemId);
      await fetchCart();
    } catch (err) {
      console.error("Remove failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader size="medium" /></div>;

  const items = Array.isArray(cart.items) ? cart.items : [];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold mb-8 text-[#111827]">Your Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-6 text-lg">Your bag is empty.</p>
            <Link to="/products" className="bg-[#0D1B2A] text-[#D4AF37] px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wider">
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Items Column */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 transition-all">
                  
                  {/* Image Box */}
                  <div className="w-20 h-20 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center border border-gray-50 overflow-hidden">
                    {item.productId?.image ? (
                      <img src={item.productId.image} alt="" className="w-full h-full object-contain p-2" />
                    ) : <span className="text-xl">📦</span>}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{item.productId?.name}</h2>
                    <p className="text-[#D4AF37] font-bold text-sm">₹{item.price.toLocaleString()}</p>
                  </div>

                  {/* Controller */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button 
                      onClick={() => handleQuantityUpdate(item, -1)}
                      disabled={updatingId === item._id || item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-red-500 disabled:opacity-30 transition-all font-bold"
                    > − </button>
                    
                    <span className="w-10 text-center font-bold text-sm text-gray-700">
                      {updatingId === item._id ? "..." : item.quantity}
                    </span>

                    <button 
                      onClick={() => handleQuantityUpdate(item, 1)}
                      disabled={updatingId === item._id}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-green-600 disabled:opacity-30 transition-all font-bold"
                    > + </button>
                  </div>

                  {/* Total & Trash */}
                  <div className="text-right min-w-[90px]">
                    <p className="font-bold text-gray-900 text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <button 
                      onClick={() => removeItem(item._id)} 
                      className="text-[11px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-tighter"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0D1B2A] text-white p-6 rounded-3xl shadow-xl sticky top-24">
                <h2 className="text-lg font-bold mb-5 border-b border-white/10 pb-3">Checkout Details</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Shipping</span>
                    <span className="text-[#D4AF37]">Complimentary</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center font-bold">
                    <span className="text-sm">Total Amount</span>
                    <span className="text-xl text-[#D4AF37]">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#D4AF37] text-[#0D1B2A] py-4 rounded-xl font-bold uppercase text-xs tracking-[0.1em] hover:brightness-110 active:scale-95 transition-all shadow-lg"
                >
                  Confirm Order
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;