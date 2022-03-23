import React, { ReactElement } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import dayjs from "dayjs";
import { Icon } from "@mdi/react";
import { mdiCalendar } from "@mdi/js";

import Tags from "./Tags";

interface Props {
  node: any;
}

export default function PreviewCard({ node }: Props): ReactElement {
  const {
    id,
    fields,
    frontmatter,
    wordCount: { words },
  } = node;
  const {
    title,
    date,
    description,
    // tldr,
    tags,
    // lastUpdated,
    image,
  } = frontmatter;
  return (
    <Link
      className="rounded-lg w-full  shadow hover:shadow-xl font-light text-lg hover:bg-gray-700 bg-slate-800 hover:text-white text-indigo-100 transition duration-500 ease-in-out transform hover:scale-105"
      key={id}
      to={fields.slug}
    >
      <div className="flex flex-col h-full">
        <GatsbyImage
          alt={`${title} image`}
          image={image?.childImageSharp?.gatsbyImageData}
          className="h-64 lg:h-48 min-w-full object-top rounded-t-lg"
        />
        <div className="pt-4 pb-2 justify-center">
          <h3 className="text-xl font-semibold tracking-wide text-center">
            {title}
          </h3>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <p className="px-4 text-sm text-justify">{description}</p>
        </div>
        <Tags tags={tags} />

        <div className="justify-self-end">
          <div className="flex justify-between text-sm text-left p-4">
            <div className="flex items-center">
              <Icon path={mdiCalendar} title="Published" size={1} />
              <p className="text-xs">
                {dayjs(date).format("MMM DD YYYY @ HH:mm A")}
              </p>
            </div>
            <p className="text-sm text-right">
              Time to read: {Math.round(+words / 70)} minute(s)
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
