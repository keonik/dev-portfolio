import React, { ChangeEvent, useState } from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import PreviewCard from "../components/PreviewCard";
import Badge from "../components/Badge";

export const blogPosts = graphql`
  query BlogPosts {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { slug: { regex: "/blog/" } } }
    ) {
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

const BlogPosts = ({ data }) => {
  const [posts, setPosts] = useState(data.allMarkdownRemark.edges);

  const filterPosts = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value.split(" ");

    setPosts(
      data.allMarkdownRemark.edges.filter(
        ({ node }) =>
          node.frontmatter.tags.findIndex(
            tag =>
              !!values.find(value =>
                tag.toLowerCase().indexOf(value.toLowerCase())
              )
          ) ||
          node.frontmatter.title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <SEO title="My Writing" />
      <div className="flex flex-col">
        <h1 className="flex-initial text-3xl text-gray-200 text-center font-semibold">
          My writing
        </h1>

        <div className="flex justify-center mb-4">
          <input
            alt="Search"
            placeholder="Type to filter posts by tags and title..."
            onChange={filterPosts}
            className="self-center bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full md:w-1/2 py-2 px-4 m-4 text-gray-800 placeholder-indigo-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-400"
            type="text"
          />
          <Badge count={posts.length} />
        </div>
        <div className="grid grid-flow-row grid-rows-auto grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {posts.map(({ node }) => (
            <PreviewCard node={node} key={node.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPosts;
