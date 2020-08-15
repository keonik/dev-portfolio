import React, { ReactElement } from "react"

import { Link } from "gatsby"
import { Icon } from "@mdi/react"
import { mdiNpm, mdiGithub, mdiLinkedin } from "@mdi/js"

interface Props {}

const ICON_SIZE = 1
const ICON_COLOR = "white"

export default function Footer({}: Props): ReactElement {
  return (
    <>
      <div className="footer columns">
        <div className="column buttons">
          <Link
            to="https://github.com/keonik"
            target="_blank"
            className="button is-medium"
            aria-label="GitHub"
          >
            <Icon size={ICON_SIZE} path={mdiGithub} color={ICON_COLOR} />
            GitHub
          </Link>
          <Link
            to="https://www.linkedin.com/in/johnkfay"
            target="_blank"
            className="button is-medium"
            aria-label="LinkedIn"
          >
            <Icon size={ICON_SIZE} path={mdiLinkedin} color={ICON_COLOR} />
            LinkedIn
          </Link>
          <Link
            to="https://www.npmjs.com/~keonik"
            target="_blank"
            className="button is-medium"
            aria-label="NPM"
          >
            <Icon size={ICON_SIZE} path={mdiNpm} color={ICON_COLOR} />
            npm
          </Link>
        </div>
        <div className="column" />
        <div className="column">
          © {new Date().getFullYear()}, Built with
          {` `}
          John Fay. All rights reserved
          {/* <a href="https://www.gatsbyjs.org">Gatsby</a> */}
        </div>
      </div>
    </>
  )
}
