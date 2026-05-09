// app/api/products/route.js
import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET() {
  // Simulating a slight network delay to mimic a real database
  return NextResponse.json(products);
}