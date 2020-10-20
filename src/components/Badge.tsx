import React, { ReactElement } from "react";

interface Props {
  count?: number;
}

export default function Badge({ count = 0 }: Props): ReactElement {
  return (
    <div className="flex items-center" aria-label="Number of blog posts">
      <span
        aria-label="Number of blog posts"
        className="bg-indigo-500 text-white border-gray-500 border-2 rounded-full text-center px-4 py-2"
      >
        {count}
      </span>
    </div>
  );
}
