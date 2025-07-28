export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  content: string;
  content2?: string;
  content3?: string;
  highlights: string[];
  ctas: string[];
  images: ProjectImage[];
  githubStats: string[];
}

export interface ProjectsData {
  projects: Project[];
}
