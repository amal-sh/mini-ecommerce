'use client'; // We need this to fetch data on the client side

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the products from our API when the page loads
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-slate-500 animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Featured Products</h1>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Product Image */}
            <div className="h-48 overflow-hidden bg-slate-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-slate-800 mb-2 line-clamp-2">
                {product.name}
              </h2>
              <p className="text-xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              {/* Push button to bottom */}
              <div className="mt-auto">
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full text-center bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}