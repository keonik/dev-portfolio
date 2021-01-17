import { graphql } from "gatsby";
import React, { ReactElement } from "react";

import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import SEO from "../components/seo";

export const projectPosts = graphql`
  query Projects {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { fields: { slug: { regex: "/projects/" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            link
            github
            description
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
        }
      }
    }
  }
`;

export interface ProjectFrontmatter {
  date: Date;
  description: string;
  github: string;
  image: any;
  lastUpdated: Date;
  link: string;
  tags: string[];
  title: string;
}

interface ProjectEdge {
  node: { frontmatter: ProjectFrontmatter };
}
interface ProjectRemark {
  allMarkdownRemark: { edges: ProjectEdge[] };
}
interface Props {
  data: ProjectRemark;
}

export default function projects({ data }: Props): ReactElement {
  const projects = data.allMarkdownRemark.edges.map(
    ({
      node: {
        frontmatter: {
          date,
          description,
          github,
          image,
          lastUpdated,
          link,
          tags,
          title,
        },
      },
    }) => ({ date, description, github, image, lastUpdated, link, tags, title })
  );

  return (
    <Layout>
      <SEO title="My Projects" />
      <div className="flex flex-col">
        <h1 className="flex-initial text-3xl text-gray-200 text-center font-semibold pb-4">
          Projects
        </h1>
        <div className="grid grid-flow-row grid-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
