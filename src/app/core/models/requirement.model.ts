export interface Requirement {
  id: string;
  title: string;
  description: string;
  gccId: string;
  gccName: string;
  gccLogo?: string;
  industry: string[];
  techStack: string[];
  budget?: string;
  deadline?: Date;
  status: RequirementStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum RequirementStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}

export interface RequirementFilter {
  industry?: string[];
  techStack?: string[];
  status?: RequirementStatus;
  searchTerm?: string;
}

export interface StartupMatch {
  startupId: string;
  startupName: string;
  matchScore: number;
  matchReasons: string[];
}