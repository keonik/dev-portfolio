import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import SEO from "../seo"

const BlogPost = ({ data }) => (
  <div>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <div>
      <h2>{data.markdownRemark.frontmatter.title}</h2>
      <div> {data.markdownRemark.frontmatter.tldr}</div>
      <Img
        fixed={data.markdownRemark.frontmatter.image.childImageSharp.fixed}
      />
    </div>
  </div>
)
export default BlogPost

export const BlogPostTemplateQuery = graphql`
  query BlogPostTemplateQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        path
        description
        tldr
        lastUpdated
        image {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
