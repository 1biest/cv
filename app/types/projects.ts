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
  badge?: string;
  roleDescriptor?: string;
  /** Primary content bucket: case studies vs employment history */
  section?: 'study' | 'employment';
  group: 'professional-experience' | 'protocol-ecosystem' | 'projects';
  content: string;
  content2?: string;
  content3?: string;
  highlights: string[];
  ctas: string[];
  /** Optional per-CTA overrides (same index as `ctas`) for link preview title/description. */
  ctaPanelOverrides?: ({ title?: string; description?: string } | null)[];
  images: ProjectImage[];
  githubStats: string[];
  role?: string;
  stack?: string;
  domain?: string;
  scope?: string[];
  context?: string[];
  problemSpace?: string[];
  approach?: string[];
  outcomes?: string[];
}

/**
 * Root data structure containing all projects
 */
export interface ProjectsData {
  technicalSummary: string[];
  coreCompetencies: {
    category: string;
    items: string[];
    description?: string;
  }[];
  systemsBuilt: {
    name: string;
    domain: string;
    integrations: string[];
    constraints: string[];
    outcome: string;
    projectId: string;
    badge?: string;
  }[];
  projects: Project[];
}
