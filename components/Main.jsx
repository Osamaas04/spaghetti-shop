import Image from "next/image";
import Link from "next/link";

import bolognese from "@/public/Spaghetti-Bolognese.jpg";
import carbonara from "@/public/Spaghetti-Carbonara.jpg";
import puttanesca from "@/public/Spaghetti-Puttanesca.jpg";

export default function Main() {
  return (
    <div className="container mx-auto text-center py-12 px-6">
      <h1 className="text-5xl font-bold text-slate-800 mb-6">
        Welcome to Spaghetti Shop
      </h1>
      <p className="text-slate-600 text-lg mb-8">
        Enjoy the best Italian pasta dishes, crafted with love and the finest
        ingredients.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <Image
            src={bolognese}
            alt="Spaghetti Bolognese"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-slate-800">Our Menu</h2>
            <p className="text-slate-600 mt-2">
              Discover our mouthwatering selection of pasta dishes.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-block bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              Explore Menu
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <Image
            src={carbonara}
            alt="Order Online"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Order Online
            </h2>
            <p className="text-slate-600 mt-2">
              Get your favorite pasta dishes delivered to your door.
            </p>
            <Link
              href="/order-online"
              className="mt-4 inline-block bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
          <Image
            src={puttanesca}
            alt="Contact Us"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              Contact Us
            </h2>
            <p className="text-slate-600 mt-2">
              Have questions? Reach out to us anytime.
            </p>
            <Link
              href="/contact-us"
              className="mt-4 inline-block bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
