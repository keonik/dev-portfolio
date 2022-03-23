import React, { ReactElement } from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiCalendar, mdiCalendarSync } from "@mdi/js";
import Tags from "../Tags";
import SEO from "../seo";
import Footer from "../Footer";
import Nav from "../Nav";

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
            gatsbyImageData(height: 500, quality: 100, layout: CONSTRAINED)
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
  const { title, description, date, image, lastUpdated, tags } =
    data.markdownRemark.frontmatter;
  const { html } = data.markdownRemark;

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex flex-col bg-zinc-900 font-sans z-0">
      <Nav />
      <main className="flex-col flex-auto sm:flex-1 justify-center overflow-y-auto w-full mt-8 pt-8 z-0 px-4">
        <SEO title={title} />
        <section className="flex-col items-center justify-center bg-gray-800 text-gray-200 mb-4 pb-8 rounded-lg max-w-3xl overflow-x-hidden mx-auto">
          {image && (
            <GatsbyImage
              alt={""}
              image={image.childImageSharp.gatsbyImageData}
              className="min-h-full min-w-full rounded-t-lg"
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
        <div className="max-w-3xl overflow-x-hidden mx-auto justify-center">
          {html && (
            <section
              className="markdown pb-8"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </main>
    </div>
  );
};
export default BlogPost;
