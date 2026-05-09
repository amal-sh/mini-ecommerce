import { NextResponse } from 'next/server';
import { products } from '@/data/products';

export async function GET(request, { params }) {
  // 1. Await the params object (Required in Next.js 15+)
  const resolvedParams = await params; 
  const { id } = resolvedParams;

  // 2. Use == to compare safely regardless of string/number types
  const product = products.find((p) => p.id == id);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}