import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Project, WorkExperience } from '../data/types';
import { CardContent, Typography, CardMedia } from '@mui/material';

import data from "../data/data.json"

const Card = ({ project }: { project: Project }) => {
  const imageUrl = project.thumbUrl;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const importImage = async () => {
      try {
        const imageModule = await import(`../img/thumbnails/${imageUrl}`);
        console.log("imageModule", imageModule)
        setImage(imageModule.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    importImage();
  }, [imageUrl]);

  const cardContent = (
    <div className="card-bg">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.desc}
        </Typography>
      </CardContent>
      {image && (
        <CardMedia
          component="img"
          alt={project.title}
          height="170"
          image={image}
        />
      )}
    </div>
  );

  return (
    project.url ? (
      <a href={project.url} target="_blank">
        {cardContent}
      </a>
    ) : (
      cardContent
    )
  );
};

const Section = ({ experience }: { experience: WorkExperience }) => {

  // Filter the project that matches the company in the experience
  const matchingProjects = data.projects.filter(
    (project) => project.company === experience.company
  );

  return (
    <div className="Section" id={experience.divId ? experience.divId : undefined}>
      <h2>{experience.company}</h2>
      {experience.startDate ? (
        <h4>{experience.startDate} - {experience.endDate}</h4>
      ) : (
        <h4>{experience.endDate}</h4>
      )}
      <h4>{experience.desc}</h4>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
      >
        {matchingProjects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </Grid>
    </div>
  );
};

export default Section;
