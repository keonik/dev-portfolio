import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Nav from "./Nav"
import Footer from "./Footer"

import "../assets/styles.css"

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
      <main className="hero-body container">{children}</main>
      <footer className="hero-footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
