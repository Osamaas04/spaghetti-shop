"use client"
import bolognese from "@/public/Spaghetti-Bolognese.jpg";
import carbonara from "@/public/Spaghetti-Carbonara.jpg";
import aglie from "@/public/Spaghetti-Aglio-e-Olio.jpg";
import puttanesca from "@/public/Spaghetti-Puttanesca.jpg";
import alfredo from "@/public/Spaghetti-Alfredo.jpg";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import Header from "@/components/Header";


export default function Menu() {
  const { addToCart } = useContext(CartContext);


  const dishes = [
    {
      name: "Classic Spaghetti Bolognese",
      description:
        "Traditional Italian pasta with a rich and savory meat sauce, simmered for hours to perfection.",
      price: "$14.99",
      image: bolognese,
    },
    {
      name: "Spaghetti Carbonara",
      description:
        "Creamy pasta tossed with crispy pancetta, eggs, and Parmesan cheese, finished with a sprinkle of black pepper.",
      price: "$13.99",
      image: carbonara,
    },
    {
      name: "Spaghetti Aglio e Olio",
      description:
        "A simple yet flavorful dish made with garlic, olive oil, red pepper flakes, and fresh parsley.",
      price: "$11.99",
      image: aglie,
    },
    {
      name: "Spaghetti Puttanesca",
      description:
        "Pasta served with a zesty sauce made from tomatoes, olives, capers, and anchovies.",
      price: "$12.99",
      image: puttanesca,
    },
    {
      name: "Spaghetti Alfredo",
      description:
        "Rich and creamy Alfredo sauce made with butter, heavy cream, and Parmesan cheese, served over spaghetti.",
      price: "$12.99",
      image: alfredo,
    },
  ];

  return (
    <>
      <Header />
      <section className="bg-slate-100 py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Our Menu</h1>
          <p className="text-slate-600 mt-4">
            Explore our delicious range of spaghetti dishes.
          </p>
        </header>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
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
                <p className="text-slate-900 font-bold mt-4">{dish.price}</p>
                <button
                  className="mt-4 bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                  onClick={() => addToCart(dish)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
