import React, { ReactElement } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiCalendar, mdiCalendarSync } from "@mdi/js";

import Layout from "../Layout";
import Tags from "../Tags";
import SEO from "../seo";
import Subscribe from "../Subscribe";

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
            fluid(maxHeight: 500, quality: 100) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
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
`;

const BlogPost = ({ data }): ReactElement => {
  const {
    title,
    description,
    date,
    image,
    lastUpdated,
    tags,
  } = data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;

  return (
    <Layout>
      <SEO title={title} />
      <div className="justify-center overflow-hidden max-w-2xl">
        <section className="bg-gray-800 text-gray-200 mb-4 pb-8 rounded-lg">
          {image && (
            <Img
              fluid={image.childImageSharp.fluid}
              className="min-h-full min-w-full  rounded-t-lg"
            />
          )}
          <div className="p-4 flex flex-col items-center">
            <h1 className="text-3xl font-light tracking-wide text-indigo-100">
              {title}
            </h1>
            {description && (
              <p className="text-base text-justify max-w-screen-sm text-indigo-200 py-2">
                {description}
              </p>
            )}

            <div className="flex flex-row justify-around w-full py-2">
              {date && (
                <div
                  className="flex flex-row"
                  aria-label="Published"
                  title="Published"
                >
                  <Icon path={mdiCalendar} title="Published" size={1} />
                  <p className="ml-2">
                    {dayjs(date).format("MMMM D, YYYY @ h:mm A")}
                  </p>
                </div>
              )}
              {lastUpdated && (
                <div
                  className="flex flex-row"
                  aria-label="Last Updated"
                  title="Last Updated"
                >
                  <Icon path={mdiCalendarSync} title="Last Updated" size={1} />
                  <p className="ml-2">
                    {dayjs(lastUpdated).format("MMMM D, YYYY @ h:mm A")}
                  </p>
                </div>
              )}
            </div>
          </div>
          <Tags tags={tags} />
        </section>
        {html && (
          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        <div className="flex justify-center">
          <Subscribe />
        </div>
      </div>
    </Layout>
  );
};
export default BlogPost;
