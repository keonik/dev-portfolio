import React, { FormEvent, ReactElement, useState } from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"

interface Props {}

export default function Subscribe({}: Props): ReactElement {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // @ts-ignore
    const { result, msg } = await addToMailchimp(email)
    if (result === "success") {
      setSuccess(msg)
      setTimeout(() => setSuccess(""), 4000)
    } else if (result === "error") {
      setError(msg)
      setTimeout(() => setError(""), 4000)
    }
  }

  return (
    <div className="section has-background-dark" style={{ marginTop: "1em" }}>
      <h2 className="title is-2">Thank you for reading!</h2>
      <h3 className="is-3">Notify me when new articles are released</h3>
      <form onSubmit={handleSubmit}>
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
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            Subscribe
          </button>
          <label className="has-text-danger">{error}</label>
          <label className="has-text-success">{success}</label>
        </div>
      </form>
    </div>
  )
}
