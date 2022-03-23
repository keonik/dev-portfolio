import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { mdiNpm, mdiGithub, mdiLinkedin, mdiTwitter } from "@mdi/js";
import { Link } from "gatsby";

import SocialLink from "../components/SocialLink";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { LINKS } from "../components/Nav";

export const query = graphql`
  {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: CONSTRAINED)
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const profile = getImage(data?.profile);

  return (
    <Layout includeNav={false}>
      <SEO title="Home" />
      <div className="flex xs:flex-col-reverse md:flex-row items-center flex-wrap justify-center">
        <div className="flex flex-initial flex-col">
          <div className="flex flex-auto flex-col">
            <h1 className="text-4xl text-gray-200 font-thin">John Fay</h1>
            <h2 className="text-base text-indigo-100 tracking-widest">
              Software Engineer Manager
            </h2>
            <p className="text-sm text-gray-300">
              Hey there! I'm working remotely from the US
            </p>
            <p className="text-sm text-gray-300">
              I make web applications and build engineering teams
            </p>
            <p className="text-sm text-gray-300">
              Right now I'm really interested in creating with Next.js, Prisma,
              and GraphQL
            </p>
          </div>
        </div>
        <div className="m-8 sm:my-8 w-48 h-48 rounded-lg shadow-2xl border-sky-800 transition-colors duration-300 hover:border-sky-700 border-4 rotate-45 transform overflow-hidden">
          <div className="w-64  h-64">
            {profile && (
              <GatsbyImage
                image={profile}
                alt="Profile"
                style={{ minHeight: "110%", minWidth: "110%" }}
                className="transform -rotate-45 -translate-x-14 -translate-y-12 cursor-default"
              />
            )}
          </div>
        </div>
        <div
          className="py-2 px-2
       flex flex-row flex-grow-1 min-w-full justify-center"
        >
          {LINKS.map(({ content, to }) => (
            <Link
              className="block p-2 lg:inline-block lg:mt-0 lg:px-3 lg:h-full font-light text-xl text-sky-300 hover:text-sky-100 hover:scale-105"
              to={to}
              activeClassName="bg-slate-700 text-white"
              key={to}
              aria-label={content}
              style={{ marginBottom: 0 }}
            >
              {content}
            </Link>
          ))}
        </div>
        <div
          className="py-2 px-2
       flex flex-row flex-grow-1 min-w-full justify-center"
        >
          <SocialLink
            to="https://github.com/keonik"
            label="GitHub"
            iconPath={mdiGithub}
          />
          <SocialLink
            to="https://www.linkedin.com/in/johnkfay"
            label="LinkedIn"
            iconPath={mdiLinkedin}
          />
          <SocialLink
            to="https://twitter.com/John00864617"
            label="Twitter"
            iconPath={mdiTwitter}
          />
          <SocialLink
            to="https://www.npmjs.com/~keonik"
            label="NPM"
            iconPath={mdiNpm}
          />
        </div>
      </div>

      <ul className="transform-norm bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </Layout>
  );
};
export default IndexPage;
