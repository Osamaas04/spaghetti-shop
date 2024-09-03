"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
  const { cart } = useContext(CartContext);

  return (
    <header className="bg-slate-800 shadow-lg">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-4xl font-bold text-center text-slate-200">
          Spaghetti Shop
        </h1>

        <nav className="mt-4">
          <ul className="flex gap-8 justify-center text-lg">
            <li>
              <Link
                href="/"
                className="text-slate-200 hover:text-white transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="text-slate-200 hover:text-white transition duration-200"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="text-slate-200 hover:text-white transition duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/join-us"
                className="text-slate-200 hover:text-white transition duration-200"
              >
                Join us
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="text-slate-200 hover:text-white transition duration-200"
              >
                Cart ({cart.length})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
