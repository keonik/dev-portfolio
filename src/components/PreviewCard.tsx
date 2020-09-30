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
    <div className="overflow-hidden rounded-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 bg-gray-800">
      <Link
        className="font-light text-lg  hover:text-teal-300 text-teal-100"
        key={id}
        to={`/blog${fields.slug}`}
      >
        <div className="flex flex-col justify-items-start">
          <Img
            fluid={image.childImageSharp.fluid}
            className="h-32 object-top"
          />
          <div className="p-4 flex-1">
            <h3 className="text-2xl">{title}</h3>
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
          <Tags tags={tags} />
        </div>
      </Link>
    </div>
  );
}
