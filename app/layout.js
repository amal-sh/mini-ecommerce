// app/layout.js
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Voxen E-Commerce Assessment",
  description: "Mini E-Commerce Product Listing Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {/* Navbar sits outside the main content area */}
          <Navbar />
          
          {/* Main content wrapper with padding */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}