import React from 'react';
import Grid from '@mui/material/Grid';
import { WorkExperience } from '../data/types';

const Section = ({ experience }: { experience: WorkExperience }) => {
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
        <Grid item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Section;
