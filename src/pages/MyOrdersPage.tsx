import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserOrdersFromFirestore } from '../store/slices/ordersSlice';
import type { Order } from '../types/OrderTypes';

function MyOrdersPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }
    dispatch(fetchUserOrdersFromFirestore(user.uid));
  }, [dispatch, user, isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading orders...</p>
      </div>
    );
  }

  const pendingOrders = orders.filter((order) => order.status === 'pending');

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {pendingOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No pending orders</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-800 hover:text-blue-600 underline"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingOrders.map((order: Order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h2>
                  <p className="text-sm text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Shipping Address:</h3>
                <p className="text-sm text-gray-700">
                  {order.shippingAddress.name}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                  {order.shippingAddress.pincode}
                  <br />
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="border border-gray-200 rounded p-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <p className="font-semibold text-sm">{item.product.title}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-bold text-sm">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="font-bold text-xl">₹{order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;

