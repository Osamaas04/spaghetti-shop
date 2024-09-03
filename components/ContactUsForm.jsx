"use client";

import { useRef } from "react";

export default function ContactUsForm() {
  const name = useRef(null);
  const email = useRef(null);
  const message = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const messageValue = message.current.value;

    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: nameValue, email: emailValue, message: messageValue }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      alert('Message sent successfully!');
    } catch (error) {
      alert(`Failed to send message: ${error.message}`);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
        Get In Touch
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
          <label htmlFor="message" className="block text-slate-600 font-medium">
            Message
          </label>
          <textarea
            rows="4"
            id="message"
            ref={message}
            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
