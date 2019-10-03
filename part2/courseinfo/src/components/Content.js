import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const buildParts = parts =>
    parts.map(part => <Part key={part.id} part={part} />);
  return <div>{buildParts(parts)}</div>;
};

export default Content;
