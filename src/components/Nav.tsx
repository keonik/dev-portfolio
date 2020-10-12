import { Link } from "gatsby";
import React, { useState } from "react";
import { mdiClose, mdiMenu } from "@mdi/js";
import { Icon } from "@mdi/react";

// @ts-ignore
import favicon from "../../content/img/home-icon.png";

const LINKS = [
  { to: "/about", content: "About" },
  { to: "/blog", content: "Writing" },
  { to: "/projects", content: "Projects" },
  { to: "/contact", content: "Contact" },
];

const Header = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const fluid = data?.file?.childImageSharp?.fluid;
  return (
    <header className="w-full z-10 fixed bg-indigo-700">
      <nav
        role="navigation"
        aria-label="main navigation"
        className="flex items-center justify-between flex-wrap"
      >
        <div
          className="block pl-2 flex items-center flex-shrink-0 text-white mr-6 mb-0"
          // style={{ marginBottom: 0 }}
        >
          <Link
            to="/"
            aria-label="Home"
            className="h-full hover:bg-indigo-800 p-2"
            activeClassName="bg-indigo-800"
          >
            <img src={favicon} className="w-10" alt="Home" />
          </Link>
        </div>
        <div className="block mr-2 lg:hidden" style={{ marginBottom: 0 }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center px-3 py-2 rounded-full text-white hover:text-indigo-200 transition-all duration-500 focus:outline-none  hover:bg-indigo-800`}
          >
            <Icon
              path={menuOpen ? mdiClose : mdiMenu}
              size={1}
              rotate={menuOpen ? 180 : 0}
              description="Hamburger Menu Button"
              title="Show Links"
              className="transition-all duration-500 ease-in-out"
            />
          </button>
        </div>
        <div
          className={`${
            menuOpen ? `block` : `hidden`
          } w-full flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className={`text-sm lg:flex-grow`}>
            {LINKS.map(({ content, to }) => (
              <Link
                className="block p-2 rounded lg:inline-block lg:mt-0 lg:mx-2 font-light text-lg text-gray-300 hover:text-white hover:bg-indigo-800"
                to={to}
                activeClassName="bg-indigo-800"
                key={to}
                style={{ marginBottom: 0 }}
              >
                {content}
              </Link>
            ))}
          </div>
          <div>{/* Right-side actions */}</div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
