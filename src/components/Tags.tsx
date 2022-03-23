import React, { ReactElement } from "react";

interface Props {
  tags: string[];
  maxTags?: number;
  background?: string;
}

export default function Tags({ tags, maxTags }: Props): ReactElement {
  const items = maxTags ? tags?.slice(0, maxTags) : tags;

  return (
    <>
      {tags && tags.length ? (
        <ul className="flex items-center justify-center flex-initial flex-wrap">
          {items?.map((label, index) => (
            <span
              className={`bg-sky-700 text-white text-sm py-1 px-2 m-1 rounded shadow-sm lowercase select-none`}
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
