import React from "react";

export default function YouTube() {
  return (
    <div style={{paddingTop: '20px', maxWidth: '600px', margin: 'auto'}}>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/videoseries?list=PLpJRPBhx6Yqf3bFYZ2WH2E6cYjb3v5ZAU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>{" "}
    </div>
  );
}
