import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <div className="flex flex-col w-full items-center max-w-xs">
      <h1 className="text-3xl">Chat with John</h1>
      <p className="text-sm text-justify">Feel free to contact me</p>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/success"
        className="md:flex md:items-center w-full flex-col bg-indigo-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <div className="md:w-1/3">
          <label
            className="block text-gray-100 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="name"
          >
            Name*
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            placeholder="e.g Alex Smith"
            required
            id="name"
            name="name"
          />
        </div>
        <div className="md:w-1/3">
          <label className="">Email*</label>
        </div>
        <div className="md:w-2/3">
          <input
            className=""
            type="email"
            placeholder="e.g. alexsmith@gmail.com"
            required
            id="email"
            name="email"
          />
        </div>
        <div className="md:w-1/3">
          <label className="">Phone</label>
        </div>
        <div className="md:w-2/3">
          <input
            className=""
            type="phone"
            placeholder="111-111-1111"
            required
            id="phone"
            name="phone"
          />
        </div>
        <div className="md:w-1/3">
          <label className="">Message</label>
        </div>
        <div className="md:w-2/3">
          <textarea
            className=""
            placeholder="Hey John! I'd love to chat about working together"
            id="message"
            name="message"
          />
        </div>

        <button className="button is-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  </Layout>
);

export default Contact;
