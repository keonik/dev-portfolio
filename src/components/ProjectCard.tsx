import React, { ReactElement } from "react";
import Img from "gatsby-image";
import { ProjectFrontmatter } from "../pages/projects";
import Tags from "./Tags";
import Icon from "@mdi/react";
import {
  mdiCalendarEdit,
  mdiCalendarStar,
  mdiGithub,
  mdiLinkVariant,
} from "@mdi/js";
import dayjs from "dayjs";

interface Props {
  project: ProjectFrontmatter;
}

export default function ProjectCard({
  project: { date, html, github, image, lastUpdated, link, tags, title },
}: Props): ReactElement {
  return (
    <div
      key={title}
      className="flex flex-col rounded-lg w-full shadow font-light text-lg bg-gray-800  hover:text-white text-indigo-100 transition duration-500 ease-in-out transform shadow-2xl"
    >
      <div className="pb-4 pt-2 justify-center">
        <h3 className="text-xl font-semibold tracking-wide text-center select-none">
          {title}
        </h3>
      </div>
      <Img
        fluid={image?.childImageSharp?.fluid}
        className="h-64 lg:h-48 min-w-full object-top rounded-t-lg"
      />
      <section
        className="flex flex-col justify-items-end markdown px-4 text-sm select-none py-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="flex flex-1 flex-col justify-end">
        <div className="flex flex-row justify-evenly py-3">
          {github && (
            <a href={github} target="__blank" className="">
              <Icon
                className="hover:text-indigo-500"
                path={mdiGithub}
                title="Github"
                size={2}
              />
            </a>
          )}
          {link && (
            <a href={link} target="__blank" className="">
              <Icon
                className="hover:text-indigo-500"
                path={mdiLinkVariant}
                size={2}
                title="Link"
              ></Icon>
            </a>
          )}
        </div>
        <Tags tags={tags} />
        <div className="flex justify-between text-sm text-left p-4">
          <div className="flex items-center space-x-2">
            <Icon path={mdiCalendarStar} title="Release" size={1}>
              Released
            </Icon>
            <p className="text-xs font-semibold">Released:</p>
            <p className="text-xs">{dayjs(date).format("MMM DD YYYY")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon path={mdiCalendarEdit} title="Last Updated" size={1} />
            <p className="text-xs font-semibold">Updated:</p>
            <p className="text-xs">
              {dayjs(lastUpdated).format("MMM DD YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
