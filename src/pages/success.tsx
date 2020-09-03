import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"

import Layout from "../components/Layout"

export const query = graphql`
  query {
    file(relativePath: { eq: "success-page.jpg" }) {
      childImageSharp {
        fixed(width: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
const Success = ({ data }) => {
  const image = data?.file?.childImageSharp?.fixed

  return (
    <Layout>
      <Helmet>
        <title>Success Page</title>
        <meta name="description" content="Success Page" />
      </Helmet>
      <div className="columns">
        <span className="column">
          {image && <Img style={{ borderRadius: "50%" }} fixed={image} />}
        </span>
        <div className="column">
          <h3 className="title is-3">Contact form submitted!</h3>
          <p>
            Thank you for contacting me! I'll get back to you as soon as
            possible
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Success
