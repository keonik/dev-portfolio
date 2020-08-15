import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import "../assets/styles.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home - John Fay's developer website" />
    <div className="container">
      <div className="content">
        <h1 className="title is-1">John Fay</h1>
        <h2 className="title">Software Engineer</h2>
        <p>Hello. I'm a Software Engineer working remotely from Ohio, US.</p>
        <p>I make web applications, usually with React, Node, and Postgres</p>
      </div>
      <div className="content"></div>
    </div>
  </Layout>
)

export default IndexPage
