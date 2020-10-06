import React, { FormEvent, ReactElement, useState } from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";

interface Props {}

export default function Subscribe({}: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    const { result, msg } = await addToMailchimp(email);
    if (result === "success") {
      setSuccess(msg);
      setTimeout(() => setSuccess(""), 4000);
    } else if (result === "error") {
      setError(msg);
      setTimeout(() => setError(""), 4000);
    }
  };

  return (
    <div className="bg-gray-800 text-gray-200 m-4 p-4 rounded-lg max-w-screen-md flex flex-col items-center justify-center">
      <h2 className="text-2xl text-center font-light tracking-wider">
        🎉 Thank you for reading! 🎉
      </h2>
      <h3 className="text-lg p-4 text-purple-400">
        Notify me when new articles are released 🔔
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center mb-6">
          <div className="w-1/3">
            <label
              className=" block text-gray-400 font-bold md:text-right mb-1 pr-4"
              htmlFor="email"
            >
              Email*
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="bg-gray-300 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              required
              id="email"
              name="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mt-2 bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-300"
            type="submit"
          >
            Subscribe
          </button>
          <label className="text-red-600">{error}</label>
          <label className="text-green-400">{success}</label>
        </div>
      </form>
    </div>
  );
}
