"use client";

import Link from "next/link";
import { useRef } from "react";

export default function SignUpForm() {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameValue, email: emailValue, password: passwordValue }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert('Sign up successful!');
    } catch (error) {
      alert(`Failed to sign up: ${error.message}`);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto grid gap-4">
      <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
        Sign Up
      </h1>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-slate-600 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            ref={name}
            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-600 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={email}
            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-slate-600 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={password}
            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center text-slate-700">
        Already Have An Account? <Link href="/sign-in" className="hover:underline">Sign In</Link>
      </div>
    </div>
  );
}
