//@ts-nocheck
import React, {useEffect} from 'react'
import {useProductContext} from '../contexts/ProductContext.jsx'

  
  export default function ExampleProducts() {
    const {state, fetchProducts} = useProductContext();
    const {products, loading, error} = state;

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

if(loading) return <p>Loading...</p>
if(error) return <p>Error: {error}</p>

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <a key={product._id} href={product.href} className="group">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
                />
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500 italic">{product.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
  