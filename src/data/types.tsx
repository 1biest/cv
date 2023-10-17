// types.tsx

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  }
  
  export interface Education {
    schoolName: string;
    degree: string;
    graduationYear: number;
  }
  
  export interface WorkExperience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    desc: string;
    divId?: string;
  }
  
  export interface Project {
    title: string;
    desc: string;
    company: string;
    thumbUrl: string;
    url?: string;
  }
  
  export interface Skill {
    skill: string;
    score: number;
  }
  
  export interface ResumeData {
    personalInfo: PersonalInfo;
    education: Education[];
    workExperience: WorkExperience[];
    projects: Project[];
    skills: Skill[];
  }
  