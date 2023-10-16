import React from 'react';
import Grid from '@mui/material/Grid';
import { WorkExperience } from '../data/types';

import data from "../data/data.json"

const Section = ({ experience }: { experience: WorkExperience }) => {

  // Filter the project that matches the company in the experience
  const matchingProjects = data.projects.filter(
    (project) => project.company === experience.company
  );

  console.log("matchingProjects", matchingProjects)

  return (
    <div className="Section">
      <h2>{experience.company}</h2>
      <h4>{experience.startDate} - {experience.endDate}</h4>
      <p>{experience.desc}</p>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        {matchingProjects.map((project, index) => (
          <div key={index}>
            <p>{project.title}</p>
            <p>{project.desc}</p>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Section;
