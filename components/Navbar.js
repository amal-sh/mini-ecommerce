// components/Navbar.js
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Placeholder Logo */}
        <Link href="/" className="text-2xl font-black text-slate-800 tracking-tight">
          AERO<span className="text-blue-600">CART</span>
        </Link>

        {/* Links & Cart */}
        <div className="flex items-center gap-6">
          {/* <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link> */}
          
          {/* Cart Icon & Count */}
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full shadow-inner">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 text-slate-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="font-bold text-blue-600">{cartCount}</span>
          </div>
        </div>
        
      </div>
    </nav>
  );
}