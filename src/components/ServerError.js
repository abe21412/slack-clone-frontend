import React from "react";
import { useParams } from "react-router-dom";

export default function ServerError() {
  const { errorCode } = useParams();
  return <div>{errorCode} Server Error</div>;
}
