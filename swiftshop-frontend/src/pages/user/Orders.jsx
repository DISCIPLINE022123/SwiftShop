import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { userAPI } from "../../services/api";
import { Truck, CreditCard, ChevronLeft, MapPin, ShieldCheck, ShoppingBag } from "lucide-react";

const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "", city: "", state: "", pincode: "", phone: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await userAPI.getCart();
      const items = Array.isArray(res.data?.items) ? res.data.items : [];
      setCartItems(items);
      if (items.length === 0) navigate("/cart");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => cartItems.reduce((t, i) => t + (i.productId?.price || 0) * i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const orderData = {
        items: cartItems.map(i => ({ productId: i.productId._id, quantity: i.quantity, price: i.productId.price })),
        shippingAddress: formData,
        totalAmount: calculateTotal() + 50,
      };
      await userAPI.createOrder(orderData);
      alert("Order placed successfully 🎉");
      navigate("/orders");
    } catch (err) {
      alert("Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader size="medium" /></div>;

  return (
    <div className="min-h-screen bg-[#F8F8F8] font-['Montserrat', 'Poppins', 'sans-serif'] text-[#333333]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between mb-8 border-b border-[#E0E0E0] pb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#0D1B2A] font-bold hover:text-[#D4AF37] transition-colors">
            <ChevronLeft size={20} /> <span className="text-sm uppercase tracking-wider">Back to Cart</span>
          </button>
          <h1 className="text-2xl font-black text-[#0D1B2A] tracking-tight flex items-center gap-2 uppercase">
            <ShoppingBag size={24} className="text-[#D4AF37]" /> Checkout
          </h1>
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
             <ShieldCheck size={14} /> SECURE PAYMENT
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SHIPPING (Medium Width) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-xl border border-[#E0E0E0] shadow-sm">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-6 flex items-center gap-2 border-l-4 border-[#D4AF37] pl-3">
                Shipping Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Delivery Address</label>
                  <textarea
                    name="address" required value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Street, Apartment, Suite..."
                    className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] focus:ring-1 focus:ring-[#0D1B2A] outline-none transition-all h-24 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City</label>
                    <input name="city" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-sm focus:border-[#0D1B2A] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">State</label>
                    <input name="state" required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-sm focus:border-[#0D1B2A] outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pincode</label>
                    <input name="pincode" required value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-sm focus:border-[#0D1B2A] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone</label>
                    <input name="phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-sm focus:border-[#0D1B2A] outline-none" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: SUMMARY (The Navy & Gold Section) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0D1B2A] text-white p-8 rounded-xl shadow-xl border-t-4 border-[#D4AF37]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                <Truck size={20} className="text-[#D4AF37]" /> Order Summary
              </h3>

              <div className="space-y-4 max-h-48 overflow-y-auto mb-6 pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-bold text-white line-clamp-1">{item.productId?.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#D4AF37]">₹{(item.productId?.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Shipping Cost</span>
                  <span>₹50.00</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="text-xs font-black text-[#D4AF37] uppercase tracking-tighter">Amount to Pay</span>
                  <span className="text-3xl font-black">₹{(calculateTotal() + 50).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full mt-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-[#0D1B2A] rounded-lg font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader size="small" /> : <><CreditCard size={18} /> Place Your Order</>}
              </button>
            </div>
            
            <p className="mt-4 text-[10px] text-center text-gray-400 uppercase tracking-widest leading-loose">
              By placing your order, you agree to SwiftShop's <br/> 
              <span className="underline cursor-pointer">Terms of Service</span> & <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;