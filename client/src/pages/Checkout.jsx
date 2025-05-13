// src/pages/Checkout.jsx
import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { LockClosedIcon } from '@heroicons/react/20/solid';

export default function Checkout() {
  const { cartItems, subtotal } = useCartContext();

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden bg-white">
      <h1 className="sr-only">Checkout</h1>

      {/* Order summary (desktop) */}
      <section
        aria-labelledby="summary-heading"
        className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
      >
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <ul role="list" className="flex-auto divide-y divide-gray-200 overflow-y-auto px-6">
          {cartItems.map((product) => (
            <li key={product._id} className="flex space-x-6 py-6">
              <img
                alt={product.name}
                src={product.imageSrc}
                className="size-40 flex-none rounded-md bg-gray-200 object-cover"
              />
              <div className="flex flex-col justify-between space-y-2">
                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                <p className="text-gray-500 text-sm">
                  {product.quantity} × {formatPrice(product.price)}
                </p>
                <p className="text-gray-900 text-sm">
                  {formatPrice(product.quantity * product.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="sticky bottom-0 border-t border-gray-200 bg-gray-50 p-6">
          <dl className="space-y-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-medium text-gray-900">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-semibold text-gray-900">Total</dt>
              <dd className="text-base font-semibold text-gray-900">{formatPrice(subtotal)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Checkout form */}
      <section
        aria-labelledby="payment-heading"
        className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-0 lg:pb-24"
      >
        <div className="mx-auto max-w-lg">
          <h2 className="text-xl font-semibold mb-8 text-gray-900">Payment Information</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                Name on card
              </label>
              <input
                id="name-on-card"
                name="name-on-card"
                type="text"
                required
                autoComplete="cc-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card number
              </label>
              <input
                id="card-number"
                name="card-number"
                type="text"
                required
                autoComplete="cc-number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                  Expiration (MM/YY)
                </label>
                <input
                  id="expiration-date"
                  name="expiration-date"
                  type="text"
                  required
                  autoComplete="cc-exp"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  id="cvc"
                  name="cvc"
                  type="text"
                  required
                  autoComplete="csc"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 text-sm font-medium"
            >
              Pay {formatPrice(subtotal)}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
              <LockClosedIcon className="w-4 h-4 mr-1 text-gray-400" aria-hidden="true" />
              Secure payment processing
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
