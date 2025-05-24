// @ts-nocheck
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { format } from 'date-fns';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFulfilled, setShowFulfilled] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get('/orders');
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleFulfilled = async (orderId, currentStatus) => {
    try {
      const res = await axiosInstance.patch(`/orders/${orderId}`, {
        fulfilled: !currentStatus,
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, fulfilled: res.data.fulfilled } : o))
      );
    } catch (err) {
      console.error('Failed to update status:', err.message);
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin: Order Summary</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFulfilled((prev) => !prev)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {showFulfilled ? 'Hide Fulfilled Orders' : 'Show Fulfilled Orders'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              <th className="text-left px-4 py-3">Pickup Info</th>
              <th className="text-left px-4 py-3">Items</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => showFulfilled || !order.fulfilled)
              .map((order) => {
                const total = order.cartItems.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );
                return (
                  <tr key={order._id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{order.pickupName}</p>
                      <p>{order.pickupLocation}</p>
                      <p>{format(new Date(order.pickupTime), 'PPpp')}</p>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <ul className="list-disc pl-4">
                        {order.cartItems.map((item, i) => (
                          <li key={i}>
                            {item.quantity} × {item.name} ({item.size})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3 font-medium">${total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleFulfilled(order._id, order.fulfilled)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.fulfilled
                            ? 'bg-green-200 text-green-900'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.fulfilled ? 'Fulfilled' : 'Pending'}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
