import { Link } from "gatsby";
import React from "react";

interface HeaderProps {
  siteTitle: string;
}

const Header = ({ siteTitle = "" }: HeaderProps) => {
  const [active, setActive] = React.useState(false);

  return (
    <header className="h-16">
      <nav
        className="bg-indigo-900"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          {/* Main links */}
          <Link to="/" className="navbar-item">
            {siteTitle}
          </Link>
          <Link
            className="is-hidden-touch navbar-item"
            to="/about"
            activeClassName="bg-indigo-600"
          >
            About
          </Link>
          <Link
            className="is-hidden-touch navbar-item"
            to="/blog"
            activeClassName="bg-indigo-600"
          >
            Writing
          </Link>
          <Link
            className="is-hidden-touch navbar-item"
            to="/projects"
            activeClassName="bg-indigo-600"
          >
            Projects
          </Link>
          <Link
            className="is-hidden-touch navbar-item"
            to="/contact"
            activeClassName="bg-indigo-600"
          >
            Contact Me
          </Link>
          {/* The navbar-burger */}
          <a
            role="button"
            className={`navbar-burger burger ${active && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => {
              setActive(!active);
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/* The navbar-menu */}
        {active && (
          <div
            className={`navbar-menu has-background-grey-darker ${
              active && "is-active"
            }`}
          >
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/blog">
                Writing
              </Link>
              <Link className="navbar-item" to="/projects">
                Projects
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact Me
              </Link>
            </div>
          </div>
        )}
        <div className="navbar-end"></div>
      </nav>
    </header>
  );
};

export default Header;
