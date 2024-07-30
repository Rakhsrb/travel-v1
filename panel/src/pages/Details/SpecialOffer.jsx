import React from "react";
import { useParams } from "react-router-dom";

const SpecialOffer = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default SpecialOffer;
