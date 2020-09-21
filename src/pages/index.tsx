import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import SEO from "../components/seo";

export const query = graphql`
  query {
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fixed(width: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const image = data?.file?.childImageSharp?.fixed;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="columns">
        <div className="column">
          <div className="content">
            <h1 className="title is-1">John Fay</h1>
            <h2 className="title">Software Engineer</h2>
            <p>
              Hello. I'm a Software Engineer working remotely from Ohio, US.
            </p>
            <p>
              I make web applications, usually with React, Node, and Postgres
            </p>
          </div>
        </div>
        <div className="column">
          {image && <Img style={{ borderRadius: "50%" }} fixed={image} />}
        </div>
      </div>
    </Layout>
  );
};
export default IndexPage;
