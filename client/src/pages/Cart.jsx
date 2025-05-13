import {Link} from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cartItems, dispatch, subtotal } = useCartContext();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleQuantityChange = (id, newQty) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: parseInt(newQty, 10) },
    });
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <form className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Cart Items */}
          <section className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((product, idx) => (
                <li key={product._id || product.id} className="flex py-6 sm:py-10">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt || product.name}
                    className="h-24 w-24 sm:h-48 sm:w-48 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${((+product.price || 0) * (+product.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between sm:mt-0">
                      <label htmlFor={`qty-${idx}`} className="sr-only">Quantity</label>
                      <select
                        id={`qty-${idx}`}
                        name={`qty-${idx}`}
                        value={product.quantity || 1}
                        onChange={(e) => handleQuantityChange(product._id || product.id, e.target.value)}
                        className="rounded-md border-gray-300 text-base"
                      >
                        {[...Array(8)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleRemove(product._id || product.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        <XMarkIcon className="w-5 h-5" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary */}
          <section className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between text-base text-gray-700">
                <p>Subtotal</p>
                <p>${(subtotal || 0).toFixed(2)}</p>
              </div>
             <Link
  to="/checkout"
  className="block mt-6 w-full text-center bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700"
>
  Checkout
</Link>

            </div>
          </section>
        </form>
      )}
    </div>
  );
};

export default Cart;
