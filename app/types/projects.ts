/**
 * Represents an image or video in a project gallery
 */
export interface ProjectImage {
  src?: string; // Optional for YouTube videos since we can generate from youtubeId
  alt: string;
  type: 'image' | 'youtube';
  youtubeId?: string; // Required when type is 'youtube'
}

/**
 * Represents a project with all its associated data
 */
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

/**
 * Root data structure containing all projects
 */
export interface ProjectsData {
  projects: Project[];
}
