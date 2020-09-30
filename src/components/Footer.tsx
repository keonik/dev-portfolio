import React, { ReactElement } from "react";
import { mdiNpm, mdiGithub, mdiLinkedin } from "@mdi/js";
import SocialLink from "./SocialLink";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <footer className="xl:h-32 lg:h-32 md:h-32 sm:h-40 flex-col items-center sm:flex-row bg-gray-800 min-w-full flex justify-around px-4 py-2">
      <div className="flex flex-row gap-4">
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
          to="https://www.npmjs.com/~keonik"
          label="NPM"
          iconPath={mdiNpm}
        />
      </div>
      <div className="px-4">
        © {new Date().getFullYear()}, Built by
        {` `}
        John Fay. All rights reserved
      </div>
    </footer>
  );
}
