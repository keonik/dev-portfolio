import React, { ReactElement } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import dayjs from "dayjs";

import Tags from "./Tags";

import "./PreviewCard.css";
import { Icon } from "@mdi/react";
import { mdiCalendar, mdiCalendarSync } from "@mdi/js";

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
    tldr,
    tags,
    lastUpdated,
    image,
  } = frontmatter;
  return (
    <div className="rounded-lg w-full bg-gray-800">
      <Link
        className="font-light text-lg  hover:text-teal-300 text-teal-100"
        key={id}
        to={`/blog${fields.slug}`}
      >
        <div className="flex flex-col justify-items-start">
          <Img
            fluid={image.childImageSharp.fluid}
            className="h-64 min-w-full object-top rounded-lg"
          />
          <div className="p-4 flex-1 justify-center">
            <h3 className="text-3xl font-thin">{title}</h3>
            <Tags tags={tags} />

            <div className="">
              <div className="flex">
                <Icon path={mdiCalendar} title="Published" size={1} />
                <p>{dayjs(date).format("MMM DD YYYY @ HH:mm A")}</p>
              </div>
            </div>
            <div className="">
              <p className="">{description}</p>
              <p className="">TLDR: {tldr}</p>
              <p>Time to read: {Math.round(+words / 70)} minute(s)</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
