export enum UserRole {
  ADMIN = 'ADMIN',
  GCC = 'GCC',
  STARTUP = 'STARTUP'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  approvalStatus: ApprovalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GccProfile extends User {
  companyName: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  logo?: string;
  website?: string;
}

export interface StartupProfile extends User {
  companyName: string;
  foundingYear: number;
  stage: string; // Seed, Series A, etc.
  industry: string[];
  techStack: string[];
  location: string;
  teamSize: number;
  description: string;
  logo?: string;
  website?: string;
  funding?: string;
}

export interface AdminProfile extends User {
  // Admin-specific fields if needed
}