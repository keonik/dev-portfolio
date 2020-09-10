import React, { ReactElement } from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import dayjs from "dayjs"

import Tags from "./Tags"

import "./PreviewCard.css"
import { Icon } from "@mdi/react"
import { mdiCalendar, mdiCalendarSync } from "@mdi/js"

interface Props {
  node: any
}

export default function PreviewCard({ node }: Props): ReactElement {
  const {
    id,
    fields,
    frontmatter,
    wordCount: { words },
  } = node
  const {
    title,
    date,
    description,
    tldr,
    tags,
    lastUpdated,
    image,
  } = frontmatter
  return (
    <div>
      <Link className="column box hero" key={id} to={`/blog${fields.slug}`}>
        <div className="preview">
          {image && <Img fluid={image.childImageSharp.fluid} />}
          <div className="overview box">
            <h3 className="title is-3">{title}</h3>
            <div className="columns">
              <div className="column is-narrow">
                <Icon path={mdiCalendar} title="Published" size={1} />
              </div>
              <div className="column is-narrow">
                <p>{dayjs(date).format("MMM DD YYYY @ HH:mm A")}</p>
              </div>
              <div className="column is-narrow">
                <Icon path={mdiCalendarSync} title="Updated" size={1} />
              </div>
              <div className="column is-narrow">
                <p>{dayjs(lastUpdated).format("MMM DD YYYY @ HH:mm A")}</p>
              </div>
            </div>
            <p>{description}</p>
            <p>TLDR: {tldr}</p>
            <p>Time to read: {Math.round(+words / 100)} minute(s)</p>
          </div>
          <Tags tags={tags} />
        </div>
      </Link>
    </div>
  )
}
