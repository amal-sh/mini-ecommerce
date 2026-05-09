'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-slate-200" />
      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-10 bg-slate-200 rounded-lg mt-4" />
      </div>
    </div>
  );
}


function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col">
      {/* Image container with subtle zoom on hover */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden aspect-[4/3] bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Product name */}
        <Link href={`/products/${product.id}`} className="block">
          <h2 className="text-base font-semibold text-slate-800 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h2>
        </Link>

        {/* Price – bold and distinct */}
        <p className="mt-2 text-xl font-bold text-blue-600 mb-3">
          ₹{product.price.toLocaleString('en-IN')}
        </p>

        {/* Push the button to the bottom */}
        <div className="mt-auto pt-4">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all duration-200"
          >
            View Details
            {/* Optional arrow icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? // Skeleton loading – 8 placeholders
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* Empty state (not loading and no products) */}
        {!loading && products.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-slate-500 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}