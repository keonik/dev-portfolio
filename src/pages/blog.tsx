import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PreviewCard from "../components/PreviewCard"

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
                fluid(maxWidth: 1000, quality: 100) {
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
`

const BlogPosts = ({ data }) => (
  <Layout>
    <SEO title="My Writing" />
    <div className="content">
      <h1>My writing</h1>
      <div className="columns is-desktop">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PreviewCard node={node} />
        ))}
      </div>
    </div>
  </Layout>
)

export default BlogPosts
