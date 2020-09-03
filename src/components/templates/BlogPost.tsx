// import React from "react"
// import { graphql } from "gatsby"
// import Img from "gatsby-image"
// import SEO from "../seo"

// const BlogPost = ({ data }) => (
//   <div>
//     <SEO title={data.markdownRemark.frontmatter.title} />
//     <div>
//       <h2>{data.markdownRemark.frontmatter.title}</h2>
//       <div> {data.markdownRemark.frontmatter.tldr}</div>
//       <Img
//         fixed={data.markdownRemark.frontmatter.image.childImageSharp.fixed}
//       />
//     </div>
//   </div>
// )

import React, { ReactElement } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import dayjs from "dayjs"
import Icon from "@mdi/react"
import { mdiCalendar, mdiCalendarSync } from "@mdi/js"

import Layout from "../Layout"
import Tags from "../Tags"
import SEO from "../seo"
// import "../../assets/sass/components/tilpost.scss"

// export const BlogPostTemplateQuery = graphql`
//   query BlogPostTemplateQuery($slug: String) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       frontmatter {
//         title
//         path
//         description
//         tldr
//         lastlastUpdated
//         image {
//           childImageSharp {
//             fixed(width: 200) {
//               ...GatsbyImageSharpFixed
//             }
//           }
//         }
//       }
//     }
//   }
// `

export const BlogPostQuery = graphql`
  query BlogPostQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        date
        lastUpdated
        tags
      }
      html
    }
  }
`

const BlogPost = ({ data }): ReactElement => {
  const {
    title,
    description,
    date,
    image,
    lastUpdated,
    tags,
  } = data.markdownRemark.frontmatter
  const { html } = data.markdownRemark

  return (
    <Layout>
      <SEO title={`${title}`} />
      <section className="section body">
        <div className="container post">
          <section className="hero has-text-centered is-small has-background-black-ter">
            <div className="hero-body">
              <div className="column">
                {image && <Img fixed={image.childImageSharp.fixed} />}
              </div>
              <div className="columns is-vcentered">
                <div className="column">
                  <h1 className="title">{title}</h1>
                  {description && <h2 className="subtitle">{description}</h2>}
                  <div className="column">
                    <div className="columns is-centered">
                      <div className="column is-narrow">
                        {date && (
                          <div className="columns">
                            <div className="column is-narrow">
                              <Icon
                                path={mdiCalendar}
                                title="Published"
                                size={1}
                              />
                            </div>
                            <div className="column is-narrow">
                              <p>
                                {dayjs(date).format("MMMM D, YYYY @ h:mm A")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="column is-narrow">
                        {lastUpdated && (
                          <div className="columns">
                            <div className="column is-narrow">
                              <Icon
                                path={mdiCalendarSync}
                                title="Published"
                                size={1}
                              />
                            </div>
                            <div className="column is-narrow">
                              <p>
                                {dayjs(lastUpdated).format(
                                  "MMMM D, YYYY @ h:mm A"
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section">
            {html && (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </section>
          <Tags tags={tags} />
        </div>
      </section>
    </Layout>
  )
}
export default BlogPost
