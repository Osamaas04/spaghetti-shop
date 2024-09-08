"use client";

import { useRef } from "react";
import Link from "next/link";

export default function SignInForm() {
  const email_username = useRef(null);
  const password = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const email_usernameValue = email_username.current.value;
    const passwordValue = password.current.value;
<<<<<<< HEAD

    //HTTP request
=======
>>>>>>> 1cc6beb4f824f2e8e3a5cbd9653aebf64115ba64
  
    try {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_username: email_usernameValue, password: passwordValue }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      alert('Sign in successful!');
    } catch (error) {
      alert(`Failed to sign in: ${error.message}`);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto grid gap-4">
      <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
        Sign In
      </h1>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-slate-600 font-medium">
            Email or Username
          </label>
          <input
            type="text"
            id="email"
            ref={email_username}
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
          Sign In
        </button>
      </form>

      <div className="text-center text-slate-700">
        Don&apos;t Have An Account? <Link href="/join-us" className="hover:underline">Create One</Link>
      </div>
    </div>
  );
}
