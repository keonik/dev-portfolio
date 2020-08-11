import { Link } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle = "" }: HeaderProps) => (
  <header>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          {siteTitle}
        </Link>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/blog">
            Blog
          </Link>
        </div>
      </div>

      <div className="navbar-end"></div>
    </nav>
  </header>
)

export default Header
