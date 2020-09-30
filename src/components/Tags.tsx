import React, { ReactElement } from "react";

export interface Tag {
  label: string;
}

interface Props {
  tags: Tag[];
  maxTags?: number;
  background?: string;
}

export default function Tags({
  tags,
  maxTags,
  background = "is-secondary",
}: Props): ReactElement {
  const items: Tag[] = maxTags ? tags?.slice(0, maxTags) : tags;

  return (
    <>
      {tags && tags.length ? (
        <ul className="flex items-center justify-center flex-initial flex-wrap">
          {items?.map((label, index) => (
            <span
              className={`bg-gray-900 text-white text-sm p-1 m-1 rounded`}
              key={index}
            >
              {label}
            </span>
          ))}
        </ul>
      ) : null}
    </>
  );
}
