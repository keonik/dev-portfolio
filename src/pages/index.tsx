import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import SEO from "../components/seo";

export const query = graphql`
  {
    profile: file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: CONSTRAINED)
      }
    }
    dex: file(relativePath: { eq: "dex.png" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: CONSTRAINED)
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const [dexterClassName, setDexterClassName] = useState("hide-dex");
  const profile = getImage(data?.profile);
  const dex = getImage(data?.dex);

  return (
    <Layout>
      <SEO title="Home" />
      <div className="flex flex-row items-center flex-wrap justify-center">
        <div className="flex flex-initial flex-col">
          <div className="flex flex-auto flex-col">
            <h1 className="text-4xl text-gray-200 font-thin">John Fay</h1>
            <h2 className="text-base text-indigo-100 tracking-widest">
              Software Engineer Manager
            </h2>
            <p className="text-sm text-gray-300">
              Hey there! I'm working remotely from Ohio, US.
            </p>
            <p className="text-sm text-gray-300">
              I make web applications, usually with React, Node, and Postgres
            </p>
            <p className="text-sm text-gray-300">
              Right now I'm really interested in Next.js, Prisma, and GraphQL
            </p>
          </div>
        </div>
        <div
          onMouseEnter={() => setDexterClassName("show-dex")}
          onMouseLeave={() => setDexterClassName("hide-dex")}
          className="m-8 sm:my-8 w-48 h-48 rounded-lg shadow-2xl border-indigo-400 transition-colors duration-300 hover:border-gray-800 border-4 rotate-45 transform overflow-hidden"
        >
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
      </div>
      {dex && (
        <div className={`${dexterClassName}`}>
          <GatsbyImage alt="Dexter" image={dex} className="hidden md:block" />
        </div>
      )}
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
