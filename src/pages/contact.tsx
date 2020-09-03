import React from "react"
import Layout from "../components/Layout"

const Contact = () => (
  <Layout>
    <div className="content">
      <span className="title is-3 ">Feel free to contact me</span>
      <form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/success"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <div className="field">
          <label className="label">Name*</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g Alex Smith"
              required
              id="name"
              name="name"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email*</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
              required
              id="email"
              name="email"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Phone</label>
          <div className="control">
            <input
              className="input"
              type="phone"
              placeholder="111-111-1111"
              required
              id="phone"
              name="phone"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Message</label>
            <textarea
              className="textarea is-info"
              placeholder="Hey John! I'd love to chat about working together"
              id="message"
              name="message"
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </Layout>
)

export default Contact
