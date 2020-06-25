import React from "react";

export default function Root(props) {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Home</h1>
      <p className="lead">
        Simple demo for Micro Frontend using single-spa framework.
      </p>
      <hr className="my-4" />
      <em>{props.name} using React</em>
    </div>
  );
}
