import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import PreviewCard from "../components/PreviewCard";

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
    <div className="overflow-hidden flex flex-col">
      <h1 className="flex-initial text-2xl text-gray-200">My writing</h1>
      <div className="grid grid-flow-row grid-rows-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PreviewCard node={node} key={node.id} />
        ))}
      </div>
    </div>
  </Layout>
);

export default BlogPosts;
