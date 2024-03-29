import React, { ReactElement } from "react";
import { Link } from "gatsby";
import { Icon } from "@mdi/react";

interface Props {
  to: string;
  label: string;
  iconPath: string;
  color?: string;
  size?: number;
}

const ICON_SIZE = 1;
const ICON_COLOR = "#ffffff";

export default function SocialLink({
  to,
  label,
  iconPath,
  color = ICON_COLOR,
  size = ICON_SIZE,
}: Props): ReactElement {
  return (
    <a
      href={to}
      target="_blank"
      className="inline-flex items-center bg-sky-800 hover:bg-sky-700 text-white hover:text-white font-bold py-2 px-4 my-2 mx-2 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      aria-label={label}
    >
      <Icon size={size} path={iconPath} color={color} />

      {/* <p className="hidden md:block">{label}</p> */}
    </a>
  );
}
