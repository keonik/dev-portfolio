import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/seo"

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
            image {
              childImageSharp {
                fixed(height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

const BlogPosts = ({ data }) => (
  <Layout>
    <SEO title="Blog - John Fay's curation of blog posts" />
    <div className="content">
      <h1>My writing</h1>
      <div className="columns is-desktop">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Link
            className="column box"
            key={node.id}
            to={`/blog${node.fields.slug}`}
          >
            <div className="">
              <h2>{node.frontmatter.title}</h2>
              <p>TLDR: {node.frontmatter.tldr}</p>
              <p>{node.frontmatter.description}</p>
            </div>
            {node.frontmatter.image && (
              <Img fixed={node.frontmatter.image.childImageSharp.fixed} />
            )}
          </Link>
        ))}
      </div>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </Layout>
)

export default BlogPosts
