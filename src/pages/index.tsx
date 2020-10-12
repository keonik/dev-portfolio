import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import SEO from "../components/seo";

export const query = graphql`
  query {
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const image = data?.file?.childImageSharp?.fluid;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-row items-center flex-wrap justify-center">
        <div className="flex flex-initial flex-col">
          <div className="flex flex-auto flex-col">
            <h1 className="text-4xl text-gray-400 font-thin">John Fay</h1>
            <h2 className="text-base text-indigo-200 tracking-widest">
              Software Engineer
            </h2>
            <p className="text-sm text-gray-300">
              Hey there! I'm working remotely from Ohio, US.
            </p>
            <p className="text-sm text-gray-300">
              I make web applications, usually with React, Node, and Postgres
            </p>
          </div>
        </div>
        {image && (
          <Img
            fluid={image}
            className="m-4 sm:my-4 w-64 rounded-full shadow-2xl border-indigo-400 border-4"
          />
        )}
      </div>
    </Layout>
  );
};
export default IndexPage;
