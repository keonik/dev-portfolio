import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Nav from "./Nav";

import "../assets/styles.css";

const Layout = ({ children, includeNav = true }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex flex-col bg-zinc-900 font-sans z-0">
      {includeNav && <Nav />}
      <main className="flex flex-auto sm:flex-1 p-8 justify-center overflow-y-auto mt-8 z-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
