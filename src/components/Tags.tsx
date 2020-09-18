import React, { ReactElement } from "react"

export interface Tag {
  label: string
}

interface Props {
  tags: Tag[]
  maxTags?: number
  background?: string
}

export default function Tags({
  tags,
  maxTags,
  background = "is-secondary",
}: Props): ReactElement {
  const items: Tag[] = maxTags ? tags?.slice(0, maxTags) : tags

  return (
    <>
      {tags && tags.length ? (
        <div>
          <ul className="tags">
            {items?.map((label, index) => (
              <span className={`tag ${background}`} key={index}>
                {label}
              </span>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  )
}
