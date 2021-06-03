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
            <h1 className="text-4xl text-gray-200 font-thin">John Fay</h1>
            <h2 className="text-base text-indigo-100 tracking-widest">
              Software Engineer
            </h2>
            <p className="text-sm text-gray-300">
              Hey there! I'm working remotely from Ohio, US.
            </p>
            <p className="text-sm text-gray-300">
              I make web applications, usually with React, Node, and Postgres
            </p>
            <p className="text-sm text-gray-300">
              Right now I'm really interested in Next.js, Prisma, and GraphQL
            </p>
          </div>
        </div>
        <div className="m-8 sm:my-8 w-48 h-48 rounded-lg shadow-2xl border-indigo-400 transition-colors duration-300 hover:border-gray-800 border-4 rotate-45 transform overflow-hidden">
          <div className="w-64  h-64">
            {image && (
              <Img
                fluid={image}
                style={{ minHeight: "110%", minWidth: "110%" }}
                className="transform -rotate-45 -translate-x-14 -translate-y-12 cursor-default"
              />
            )}
          </div>
        </div>
        <ul className="transform-norm bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </Layout>
  );
};
export default IndexPage;
