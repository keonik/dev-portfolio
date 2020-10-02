import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import PreviewCard from "../components/PreviewCard";
import Subscribe from "../components/Subscribe";

export const blogPosts = graphql`
  query BlogPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            tldr
            tags
            date
            lastUpdated
            image {
              childImageSharp {
                fluid(maxHeight: 350, quality: 100) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
            }
          }
          wordCount {
            words
          }
        }
      }
    }
  }
`;

const BlogPosts = ({ data }) => (
  <Layout>
    <SEO title="My Writing" />
    <div className="flex flex-col">
      <h1 className="flex-initial text-2xl text-gray-200 text-center font-semibold">
        My writing
      </h1>
      <div className="flex p-8 justify-center">
        <p className="text-sm text-center w-full md:w-10/12 lg:w-7/12 xl:w-1/2 text-gray-400 font-light">
          Here is some of my developer writing I've gathered. These are normally
          a short walk through of a question I am asked commonly at work. They
          also could be something I found and wanted to share
        </p>
      </div>
      <div className="grid grid-flow-row grid-rows-auto grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PreviewCard node={node} key={node.id} />
        ))}
      </div>
    </div>
  </Layout>
);

export default BlogPosts;
