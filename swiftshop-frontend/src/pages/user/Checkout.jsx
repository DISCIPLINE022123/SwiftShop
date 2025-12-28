import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { userAPI } from "../../services/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]); // ✅ ALWAYS ARRAY
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  // ================= FETCH CART =================
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await userAPI.getCart();

      // ✅ backend returns { items: [...] }
      const items = Array.isArray(res.data?.items)
        ? res.data.items
        : [];

      setCartItems(items);

      if (items.length === 0) {
        navigate("/cart");
      }
    } catch (err) {
      console.error("Fetch cart failed", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item.productId?._id,
          quantity: item.quantity,
        })),
        shippingAddress: formData,
        totalAmount: calculateTotal() + 50,
      };

      await userAPI.createOrder(orderData);

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <Loader size="large" />
        </div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  required
                  className="w-full border p-3 rounded"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="border p-3 rounded"
                  />
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="border p-3 rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="border p-3 rounded"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                    className="border p-3 rounded"
                  />
                </div>

                <button
                  disabled={submitting}
                  className="bg-black text-white w-full py-3 rounded"
                >
                  {submitting ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded shadow sticky top-20">
              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.productId?.name} × {item.quantity}
                    </span>
                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹50</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>₹{calculateTotal() + 50}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
