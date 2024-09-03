import { Inter } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spaghetti Shop",
  description: "Order Your favorite spaghetti dishes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><AuthProvider><CartProvider>{children}</CartProvider></AuthProvider></body>
    </html>
  );
}
