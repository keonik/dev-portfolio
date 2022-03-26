import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { ReactElement, useState } from "react";

interface Props {}

export default function Carousel({}: Props): ReactElement {
  const [index, setIndex] = useState(0);
  const { allFile } = useStaticQuery(
    graphql`
      {
        allFile(
          sort: { fields: name, order: DESC }
          filter: { relativeDirectory: { eq: "slideshow" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                gatsbyImageData(width: 320, layout: FIXED)
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
    <div
      id="aboutMeCarousel"
      className="carousel slide relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        {allFile.edges.map((file, position) => (
          <button
            key={file.node.id}
            type="button"
            data-bs-target="#aboutMeCarousel"
            data-bs-slide-to={position}
            className={position === index ? "active" : ""}
            aria-current="true"
            aria-label={file.node.name.replace(/-/g, " ").substring(2)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner relative overflow-hidden">
        <div className="carousel-item active float-left md:w-96 sm:max-w-fit">
          <GatsbyImage
            image={node.childImageSharp.gatsbyImageData}
            key={node.id}
            alt={node.name.replace(/-/g, " ").substring(2)}
            className="md:w-3/6 sm:w-4 rounded h-64 shadow-xl"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        onClick={() => handlePrevious()}
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        onClick={() => handleNext()}
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
