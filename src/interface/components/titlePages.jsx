import React from "react";

const Title = (props) => {
  const { title, description } = props;
  return (
    <>
      <h2 className="TitlePages">{title}</h2>
      <p className="SubTitlePages">{description}</p>
    </>
  );
}

export default Title;