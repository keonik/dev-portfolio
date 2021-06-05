import React, { ReactElement } from "react";
import { mdiNpm, mdiGithub, mdiLinkedin, mdiTwitter } from "@mdi/js";
import SocialLink from "./SocialLink";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer className="xl:h-32 lg:h-32 md:h-32 sm:h-40 sm:py-4 flex-col items-center sm:flex-row bg-gray-800 min-w-full flex justify-around px-4 py-2 z-0">
      <div
        className="py-4 pr-2
       flex flex-row flex-wrap justify-center"
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
      <div className="py-4 md:px-4 text-white">
        © {new Date().getFullYear()}, Built by John Fay. All rights reserved
      </div>
    </footer>
  );
}
