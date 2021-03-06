import { useStaticQuery, graphql } from "gatsby";
import React, { useState } from "react";
import Img from "gatsby-image";

function Slideshow() {
  const [index, setIndex] = useState(0);
  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          sort: { fields: name, order: DESC }
          filter: { relativeDirectory: { eq: "slideshow" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `
  );

  //Minus 1 for array offset from 0
  const length = allFile.edges.length - 1;
  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1);
  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1);
  const { node } = allFile.edges[index];
  return (
    <div className="">
      <div className="max-w-screen-md">
        <Img
          fluid={node.childImageSharp.fluid}
          key={node.id}
          alt={node.name.replace(/-/g, " ").substring(2)}
          className="max-w-screen-md rounded h-64 shadow-xl"
        />
      </div>
      <div className="flex py-4 gap-4 justify-between">
        <button
          className="inline-flex items-center bg-gray-900 hover:bg-green-600 text-white hover:text-white font-bold py-2 px-4 mr-2 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <button
          className="inline-flex items-center bg-gray-900 hover:bg-green-600 text-white hover:text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Slideshow;
