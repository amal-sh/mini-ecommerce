// app/products/[id]/page.js
'use client';

import { useEffect, useState, use } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetails({ params }) {
  // 1. Unwrap the dynamic route parameter (Next.js 15 requirement)
  const { id } = use(params);

  // 2. State setup
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 3. Bring in our global Add to Cart function
  const { addToCart } = useCart();

  // 4. Fetch the specific product details
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-slate-500 animate-pulse">Loading details...</div>
      </div>
    );
  }

  // Not Found State
  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link href="/" className="text-blue-600 hover:underline">&larr; Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Side: Large Image */}
        <div className="md:w-1/2 bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
         

          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            {product.name}
          </h1>
          
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ₹{product.price.toFixed(2)}
          </p>
          
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>
          
          {/* Add to Cart Button */}
          <button 
            onClick={addToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            Add to Cart
          </button>
        </div>
        
      </div>
    </div>
  );
}