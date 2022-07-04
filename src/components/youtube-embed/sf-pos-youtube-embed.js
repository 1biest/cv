import React from "react";

export default function YouTube() {
  return (
    <div style={{paddingTop: '20px', maxWidth: '600px', margin: 'auto'}}>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/6fs2izXKrNE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>{" "}
    </div>
  );
}
