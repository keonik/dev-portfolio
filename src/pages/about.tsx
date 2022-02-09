import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import {
  mdiAccountSupervisorCircle,
  mdiBriefcase,
  mdiGraphql,
  mdiAccountGroup,
  mdiRocketLaunch,
  mdiSchool,
} from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "dayjs";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Tags from "../components/Tags";

import "react-vertical-timeline-component/style.min.css";
import { Link } from "gatsby";
import Slideshow from "../components/Slideshow";
import Carousel from "../components/Carousel";

interface Job {
  title: string;
  employer: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
  icon?: string;
  tags?: string[];
  color: string;
}

const JOBS: Job[] = [
  {
    title: "Software Engineer Manager",
    employer: "Mile Two",
    startDate: new Date(2021, 8),
    endDate: new Date(),
    description:
      "I'm learning how to build efficient teams to accomplish goals for a portfolio of projects. There are many struggles to overcome as a manager, and all of them lead to new lessons learned. I'm excited to see what I can accomplish with my team.",
    location: "Dayton, OH.",
    tags: [
      "management",
      "professional-development",
      "growth",
      "typescript",
      "graphql-mesh",
    ],
    icon: mdiAccountGroup,
    color: "#223f9a",
  },
  {
    title: "Senior Software Engineer",
    employer: "Mile Two",
    startDate: new Date(2019, 1),
    endDate: new Date(2021, 7),
    description:
      "I've had opportunities to bring new quality tools and libraries such as typescript and graphql to further advance the software development experience. At this time I took on more leadership roles to help share my knowledge and progress the people around me. This role made me realize I enjoy improving developer experience(DX) and as a side-effect of improving DX we all write better code on more efficient timelines",
    location: "Dayton, OH.",
    tags: [
      "javascript",
      "react",
      "typescript",
      "graphql",
      "apollo",
      "next.js",
      "prisma",
      "redux",
      "postgres",
      "python",
      "code quality",
    ],
    icon: mdiGraphql,
    color: "#016848",
  },
  {
    title: "Software Engineer Team Lead",
    employer: "Pretalen",
    startDate: new Date(2018, 1),
    endDate: new Date(2019, 0),
    description:
      "Promotion! I led multiple full stack projects to include a charting slide deck generator and a radio frequency fuzzing application",
    location: "Beavercreek, OH.",
    tags: ["python", "javascript", "react", "electron"],
    icon: mdiRocketLaunch,
    color: "#354164",
  },
  {
    title: "Software Engineer",
    employer: "Pretalen",
    startDate: new Date(2017, 1),
    endDate: new Date(2018, 0),
    description:
      "Full Stack software development to create a government time tracking system. Integration of various GNSS receivers into commercial applications",
    location: "Beavercreek, OH.",
    tags: ["c#", "python", "ASP.Net", "MSSQL"],
    color: "#6610f2",
  },
  {
    title: "Software Engineering Student",
    employer: "Miami University, OH.",
    startDate: new Date(2015, 9),
    endDate: new Date(2017, 5),
    description:
      "Throughout my studies I held many jobs to gain experience in the software development industry. I started as an teaching assistant reviewing code for quality and completion, to learning how to function in a scrum team as a junior developer, to an internship at Pretalen that landed me my first full time offer!",
    location: "Oxford, OH.",
    icon: mdiSchool,
    color: "#c3142d",
  },
  {
    title: "Sonar Technician on Submarines",
    employer: "United States Navy",
    startDate: new Date(2009, 9),
    endDate: new Date(2014, 9),
    description:
      "Directly out of high school I spent five years serving in the US Navy. I had opportunities to see new parts of the world and meet amazing people. I wouldn't change a thing about it",
    location: "Pearl Harbor, HI.",
    tags: ["Personnel Management", "Attention to detail", "Scheduling"],
    icon: mdiAccountSupervisorCircle,
    color: "#000048",
  },
];

const about = () => {
  return (
    <Layout>
      <SEO title="About Me" />
      <div className="text-white flex flex-col items-center gap-8 pb-8">
        <h2 className="font-light tracking-widest text-center text-3xl text-gray-300">
          About me
        </h2>
        <div className="grid grid-flow-col gap-16">
          <div className="">
            <p className="text-base text-justify text-gray-200 max-w-sm pb-10">
              I'm a husband to a wonderful wife, father of a daughter, dog
              parent to two pups and in pursuit of financial independence. I
              currently am most interested in disc golf, biking, and hiking.
              Reach out if you're interested in chatting about my interests,
              pursuing financial independence, or software development
            </p>
            <div className="flex justify-center">
              <Link
                to="https://drive.google.com/file/d/1r-ig7KP032I12AdoL65ZTAvQmFdgXR-O/view?usp=sharing"
                target="_blank"
                className="inline-flex  items-center bg-gray-900 hover:bg-green-600 text-white hover:text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                aria-label="Download Resume in pdf format"
              >
                View PDF Resume
              </Link>
            </div>
          </div>
          <Carousel />
        </div>
        <h2 className="font-light tracking-widest text-center text-2xl text-gray-300 m-6">
          My career moves
        </h2>

        <VerticalTimeline>
          {JOBS.map(
            ({
              title,
              employer,
              startDate,
              endDate,
              description,
              location,
              icon,
              tags,
              color,
            }) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: color, color: "#fff" }}
                contentArrowStyle={{
                  borderRight: `7px solid  ${color}`,
                }}
                date={`${dayjs(startDate).format("MMM YYYY")} - ${dayjs(
                  endDate
                ).format("MMM YYYY")}`}
                iconStyle={{ background: color, color: "#fff" }}
                icon={<Icon path={icon || mdiBriefcase} />}
              >
                <h3 className="vertical-timeline-element-title">{title} </h3>
                <h3 className="vertical-timeline-element-title">{employer} </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {location}
                </h4>
                <p>{description}</p>
                {<Tags tags={tags} />}
              </VerticalTimelineElement>
            )
          )}
        </VerticalTimeline>
      </div>
    </Layout>
  );
};

export default about;
