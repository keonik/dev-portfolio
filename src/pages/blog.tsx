import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const blogPosts = graphql`
  query BlogPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            path
            description
          }
        }
      }
    }
  }
`

const BlogPosts = ({ data }) => (
  <Layout>
    <SEO title="Blog" />
    <h1>John Fay's Blog</h1>
    <p>Blog posts</p>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Link key={node.id} to={`/blog/${node.frontmatter.path}`}>
        <h2>{node.frontmatter.title}</h2>
        <p>{node.frontmatter.description}</p>
      </Link>
    ))}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default BlogPosts
