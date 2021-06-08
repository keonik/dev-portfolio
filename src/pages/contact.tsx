import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <div className="flex flex-col w-full items-center max-w-screen-md mb-8 pb-8">
      <h1 className="text-3xl mb-4 text-gray-100 font-light">Chat with John</h1>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/success"
        className="flex w-full flex-col bg-indigo-900 bg-transparent rounded px-8 pt-6 pb-8 mb-4 max-w-screen-sm"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <div className="flex items-center mb-6">
          <div className="w-min">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 pr-4"
              htmlFor="name"
            >
              Name*
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-indigo-700 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-indigo-600 focus:border-gray-500 placeholder-gray-400"
              type="text"
              placeholder="e.g Alex Smith"
              required
              id="name"
              name="name"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-min">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 pr-4"
              htmlFor="email"
            >
              Email*
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-indigo-700 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-indigo-600 focus:border-gray-500 placeholder-gray-400"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              required
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-min">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 pr-4"
              htmlFor="phone"
            >
              Phone
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-indigo-700 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-indigo-600 focus:border-gray-500 placeholder-gray-400"
              type="phone"
              placeholder="111-111-1111"
              required
              id="phone"
              name="phone"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-min">
            <label
              className="block text-gray-200 font-bold md:text-right mb-1 pr-4"
              htmlFor="message"
            >
              Message
            </label>
          </div>
          <div className="w-full">
            <textarea
              className="bg-indigo-700 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-200 leading-tight focus:outline-none focus:bg-indigo-600 focus:border-gray-500 placeholder-gray-400"
              placeholder="Hey John! I'd love to chat about working together"
              id="message"
              name="message"
              rows={4}
            />
          </div>
        </div>

        <button
          className="mt-6 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </Layout>
);

export default Contact;
