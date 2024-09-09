"use client";

import { useRef, useState } from "react";

export default function ContactUsForm() {
  const name = useRef(null);
  const email = useRef(null);
  const feedback = useRef(null);

  const [feedbackList, setFeedbackList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const feedbackValue = feedback.current.value;

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameValue, email: emailValue, feedback: feedbackValue }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Intentionally vulnerable code, adds user input directly to the feedback list
      setFeedbackList((prevFeedbackList) => [
        ...prevFeedbackList,
        { name: nameValue, feedback: feedbackValue },
      ]);

      // Clear form fields after submission
      name.current.value = "";
      email.current.value = "";
      feedback.current.value = "";

      console.log("Message sent successfully!");
    } catch (error) {
      alert(`Failed to send message: ${error.message}`);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center text-slate-700 mb-6">
        Feedback
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
          <label htmlFor="feedback" className="block text-slate-600 font-medium">
            Feedback
          </label>
          <textarea
            rows="4"
            id="feedback"
            ref={feedback}
            className="w-full mt-1 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white py-2 px-4 rounded-md hover:bg-slate-800 focus:ring-2 focus:ring-slate-500 focus:outline-none"
        >
          Send Feedback
        </button>
      </form>

      {/* Feedback section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">User Feedback</h2>
        <ul className="space-y-4">
          {feedbackList.map((item, index) => (
            <li key={index} className="bg-slate-100 p-4 rounded-lg shadow-md">
              <p className="font-bold text-slate-700">{item.name}</p>
              {/* Vulnerable to XSS */}
              <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: item.feedback }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
