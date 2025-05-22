"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Header from "@/components/Header";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate the total price
  const totalPrice = cart.reduce((total, dish) => {
    const price = parseFloat(dish.price.replace("$", ""));
    return total + price;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      name,
      address,
      email,
      phone,
      total: totalPrice.toFixed(2),
    };

    try {
      const response = await fetch("/api/checkout-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage("Order placed successfully!");
        clearCart();

        // Reset form fields
        setName("");
        setAddress("");
        setEmail("");
        setPhone("");

        // Redirect to a confirmation or thank you page after a delay
        setTimeout(() => {
          window.location.href = "/"; // Redirect to the homepage or another page
        }, 3000);
      } else {
        const errorText = await response.text();
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="bg-slate-100 py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">
            Checkout
          </h1>

          {cart.length === 0 ? (
            <p className="text-center text-slate-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                    Your Details
                  </h2>
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-slate-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full p-2 border border-slate-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-slate-300 rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-2 border border-slate-300 rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800"
                      disabled={loading}
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </button>
                    {message && (
                      <p className="mt-4 text-green-600">{message}</p>
                    )}
                  </form>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                    Your Order
                  </h2>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <ul className="divide-y divide-slate-200">
                      {cart.map((dish, index) => (
                        <li key={index} className="py-4 flex justify-between">
                          <span>{dish.name}</span>
                          <span>{dish.price}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-xl font-bold text-slate-800 mt-4">
                      Total: ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
