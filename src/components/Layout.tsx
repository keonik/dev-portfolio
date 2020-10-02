import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Nav from "./Nav";
import Footer from "./Footer";

import "../assets/styles.css";

const Layout = ({ children }) => {
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
    <div className="flex flex-col min-h-screen bg-indigo-900 font-sans">
      <Nav siteTitle={data.site.siteMetadata.title} />
      <main className="flex flex-auto sm:flex-1 p-8 justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
