import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <div className="flex flex-col w-full items-center max-w-screen-md">
      <h1 className="text-3xl mb-4 text-gray-100 font-light">Chat with John</h1>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/success"
        className="flex items-center w-full flex-col bg-white bg-transparent rounded px-8 pt-6 pb-8 mb-4 max-w-screen-sm"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-700 font-bold md:text-right mb-1 pr-4"
              htmlFor="name"
            >
              Name*
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400 placeholder-black"
              type="text"
              placeholder="e.g Alex Smith"
              required
              id="name"
              name="name"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-700 font-bold md:text-right mb-1 pr-4"
              htmlFor="email"
            >
              Email*
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400 placeholder-black"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              required
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-700 font-bold md:text-right mb-1 pr-4"
              htmlFor="phone"
            >
              Phone
            </label>
          </div>
          <div className="w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400 placeholder-black"
              type="phone"
              placeholder="111-111-1111"
              required
              id="phone"
              name="phone"
            />
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-700 font-bold md:text-right mb-1 pr-4"
              htmlFor="message"
            >
              Message
            </label>
          </div>
          <div className="w-2/3">
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400 placeholder-black"
              placeholder="Hey John! I'd love to chat about working together"
              id="message"
              name="message"
              rows={4}
            />
          </div>
        </div>

        <button
          className="mt-6 bg-purple-800 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  </Layout>
);

export default Contact;
