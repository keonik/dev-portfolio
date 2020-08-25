import React from "react"
import Layout from "../components/Layout"

const Contact = () => (
  <Layout>
    <div className="content">
      <span className="title is-3 ">Feel free to contact me</span>
      <form
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
        name="contact"
        className="form box"
      >
        <div className="field">
          <label className="label">Name*</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g Alex Smith"
              required
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
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Message</label>
            <textarea
              className="textarea is-info"
              placeholder="Hey John! I'd love to chat about working together"
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
