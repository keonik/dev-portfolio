/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Nav from "./Nav"

import "./layout.css"
import Footer from "./Footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="hero is-primary is-fullheight">
      <header className="hero-head">
        <Nav siteTitle={data.site.siteMetadata.title} />
      </header>
      <main className="hero-body">{children}</main>
      <footer className="hero-footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
