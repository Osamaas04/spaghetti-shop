"use client"

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";

export default function Cart() {
  const { cart } = useContext(CartContext);

  // Calculate the total price
  const totalPrice = cart.reduce((total, dish) => {
    // Convert the price to a number by removing the "$" sign and parsing the string
    const price = parseFloat(dish.price.replace("$", ""));
    return total + price;
  }, 0);

  return (
    <>
      <Header />
      <section className="bg-slate-100 py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-slate-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cart.map((dish, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                      priority
                    />
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-slate-800">
                        {dish.name}
                      </h2>
                      <p className="text-slate-600 mt-2">{dish.description}</p>
                      <p className="text-slate-900 font-bold mt-4">
                        {dish.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price and Checkout Section */}
              <div className="mt-8 text-right">
                <p className="text-2xl font-bold text-slate-800">
                  Total: ${totalPrice.toFixed(2)}
                </p>
                <Link href="/checkout">
                  <button className="mt-4 bg-slate-700 text-white py-2 px-6 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none">
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
