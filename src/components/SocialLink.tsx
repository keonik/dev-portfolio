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
const ICON_COLOR = "white";

export default function SocialLink({
  to,
  label,
  iconPath,
  color = ICON_COLOR,
  size = ICON_SIZE,
}: Props): ReactElement {
  return (
    <Link to={to} target="_blank" className="button" aria-label={label}>
      <Icon size={size} path={iconPath} color={color} />
      {label}
    </Link>
  );
}
