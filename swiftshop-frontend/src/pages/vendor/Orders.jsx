import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { vendorAPI } from '../../services/api';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await vendorAPI.getOrders();
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await vendorAPI.updateOrderStatus(orderId, newStatus);
      // Refresh local state to show updated status
      fetchOrders();
      alert(`Order updated to ${newStatus}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  // Logic for the Smart Action Button
  const getNextAction = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Mark as Shipped', next: 'shipped', color: 'bg-indigo-600' };
      case 'shipped':
        return { label: 'Mark as Delivered', next: 'delivered', color: 'bg-green-600' };
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      shipped: 'bg-blue-100 text-blue-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="vendor" />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500">View and fulfill your customer requests.</p>
        </header>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size="large" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
            <span className="text-5xl mb-4 block">📦</span>
            <p className="text-gray-500 text-lg">No orders found yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const action = getNextAction(order.status);
              
              return (
                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-gray-900">Order #{order._id?.slice(-8).toUpperCase()}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {action && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, action.next)}
                          className={`${action.color} text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all active:scale-95`}
                        >
                          {action.label}
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                          className="text-red-600 font-bold text-sm hover:underline"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Order Content */}
                  <div className="p-6 grid md:grid-cols-2 gap-8">
                    {/* Items List */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Items Overview</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                            {item.product?.image ? (
                              <img src={item.product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{item.product?.name}</p>
                            <p className="text-xs text-gray-500">{item.quantity} x ₹{item.product?.price}</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900">₹{item.quantity * (item.product?.price || 0)}</p>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Revenue</span>
                        <span className="text-xl font-black text-indigo-600">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Customer & Shipping */}
                    <div className="bg-gray-50/50 p-4 rounded-xl space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Detail</h4>
                        <p className="text-sm font-bold text-gray-800">{order.customer?.name || 'Guest User'}</p>
                        <p className="text-sm text-gray-600">{order.customer?.email}</p>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Delivery Address</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {order.shippingAddress?.address},<br />
                          {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                        </p>
                        <p className="text-sm font-bold text-gray-700 mt-2">📞 {order.shippingAddress?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default VendorOrders;