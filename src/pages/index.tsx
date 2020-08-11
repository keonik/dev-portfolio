import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "../assets/styles.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home - John Fay's developer website" />
    <h1>John Fay</h1>
    <p>Software Developer</p>
    <div className="columns">
      <div className="column">
        <Image />
      </div>
      <div className="column">
        <Image />
      </div>
      <div className="column">
        <Image />
      </div>
    </div>
    <Link to="/blog/">
      <button className="button is-primary">My Blog</button>
    </Link>
  </Layout>
)

export default IndexPage
