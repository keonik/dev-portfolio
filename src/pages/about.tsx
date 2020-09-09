import React, { ReactNode } from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import {
  mdiAccountSupervisorCircle,
  mdiBriefcase,
  mdiGraphql,
  mdiHiking,
  mdiPartyPopper,
  mdiReact,
  mdiRocket,
  mdiRocketLaunch,
  mdiSchool,
} from "@mdi/js"
import Layout from "../components/Layout"
import Icon from "@mdi/react"
import dayjs from "dayjs"

import Tags from "../components/Tags"

import "react-vertical-timeline-component/style.min.css"

interface Job {
  title: string
  employer: string
  startDate: Date
  endDate: Date
  description: string
  location: string
  icon?: string
  tags?: string[]
  color: string
}

const JOBS: Job[] = [
  {
    title: "Senior Software Engineer",
    employer: "Mile Two",
    startDate: new Date(2019, 2),
    endDate: new Date(),
    description:
      "I've had opportunities to bring new quality tools and libraries such as typescript and graphql to further advance the software development experience and throughput. At this time I took on more leadership roles to help share my knowledge and progress the people around me. It's been a wonderful experience thus far!",
    location: "Dayton, OH.",
    tags: ["react", "typescript", "graphql", "apollo"],
    icon: mdiGraphql,
    color: "rgb(33, 150, 243)",
  },
  {
    title: "Software Engineer",
    employer: "Mile Two",
    startDate: new Date(2019, 1),
    endDate: new Date(2020, 2),
    description:
      "I transitioned to a 70/30 frontend/backend developer role. I got the chance to head up the code quality working group and instill tooling to improve quality, proficiency, and most importantly developer experience",
    location: "Dayton, OH.",
    tags: ["react", "redux", "postgres", "python", "code quality"],
    icon: mdiReact,
    color: "#016848",
  },
  {
    title: "Software Engineer Team Lead",
    employer: "Pretalen",
    startDate: new Date(2017, 12),
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
    endDate: new Date(2017, 12),
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
      "Directly out of grade school I spent five years serving in the US Navy. I had opportunities to see new parts of the world and meet amazing people. I wouldn't change a thing about it",
    location: "Pearl Harbor, HI.",
    tags: ["Personnel Management", "Attention to detail", "Scheduling"],
    icon: mdiAccountSupervisorCircle,
    color: "#000048",
  },
]

const about = () => {
  return (
    <Layout>
      <div className="content">
        <h2 className="is-2 title">About me</h2>
        <p>
          I'm a husband to a wonderful wife, dog parent to two pups, and in
          pursuit of financial independence
        </p>
        <p>
          Right now I'm most interested in disc golf, biking, hiking, and
          whitewater
        </p>
        <p>
          Reach out if you're interested in chatting about my interests,
          pursuing financial independence, or software development
        </p>
        <h2 className="is-2 title">My career moves</h2>
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
  )
}

export default about