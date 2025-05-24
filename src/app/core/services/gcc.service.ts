import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GccProfile, UserRole, ApprovalStatus } from '../models/user.model';
import { Requirement, RequirementStatus } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class GccService {
  // In a real app, this would come from environment configuration
  private apiUrl = 'api/gcc';

  // Mock data for demo purposes
  private mockRequirements: Requirement[] = [
    {
      id: '1',
      title: 'AI-Powered Data Analytics Platform',
      description: 'We are looking for a startup that can provide AI-driven data analytics capabilities to process and analyze large volumes of customer data to identify patterns and insights.',
      gccId: '2',
      gccName: 'TechCorp Global',
      gccLogo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      industry: ['Fintech', 'AI/ML'],
      techStack: ['Python', 'TensorFlow', 'AWS'],
      budget: '$100K - $250K',
      deadline: new Date('2025-06-30'),
      status: RequirementStatus.OPEN,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: '2',
      title: 'Blockchain Solution for Supply Chain Tracking',
      description: 'We need a blockchain-based solution to track our global supply chain in real-time with immutable record-keeping capabilities.',
      gccId: '2',
      gccName: 'TechCorp Global',
      gccLogo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      industry: ['Supply Chain', 'Blockchain'],
      techStack: ['Ethereum', 'Solidity', 'React'],
      budget: '$50K - $100K',
      deadline: new Date('2025-07-15'),
      status: RequirementStatus.OPEN,
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-20')
    }
  ];

  private mockGccProfile: GccProfile = {
    id: '2',
    email: 'gcc@example.com',
    name: 'GCC User',
    role: UserRole.GCC,
    approvalStatus: ApprovalStatus.APPROVED,
    createdAt: new Date(),
    updatedAt: new Date(),
    companyName: 'TechCorp Global',
    industry: 'Technology',
    location: 'San Francisco, CA',
    size: '10,000+',
    description: 'TechCorp Global is a leading technology company specializing in enterprise solutions for Fortune 500 companies.',
    logo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    website: 'https://techcorp-global.example.com'
  };

  constructor(private http: HttpClient) {}

  getRequirements(): Observable<Requirement[]> {
    // In a real app, this would call an API endpoint
    return of(this.mockRequirements);
  }

  getRequirement(id: string): Observable<Requirement> {
    // In a real app, this would call an API endpoint
    const requirement = this.mockRequirements.find(req => req.id === id);
    if (requirement) {
      return of(requirement);
    }
    return of({} as Requirement);
  }

  createRequirement(requirement: Partial<Requirement>): Observable<Requirement> {
    // In a real app, this would call an API endpoint
    const newRequirement: Requirement = {
      id: Math.random().toString(36).substring(2, 9),
      title: requirement.title || '',
      description: requirement.description || '',
      gccId: '2', // Using mock GCC ID
      gccName: 'TechCorp Global',
      gccLogo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      industry: requirement.industry || [],
      techStack: requirement.techStack || [],
      budget: requirement.budget,
      deadline: requirement.deadline,
      status: RequirementStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.mockRequirements.push(newRequirement);
    return of(newRequirement);
  }

  updateRequirement(id: string, updates: Partial<Requirement>): Observable<Requirement> {
    // In a real app, this would call an API endpoint
    const index = this.mockRequirements.findIndex(req => req.id === id);
    if (index !== -1) {
      const updatedRequirement = { ...this.mockRequirements[index], ...updates, updatedAt: new Date() };
      this.mockRequirements[index] = updatedRequirement;
      return of(updatedRequirement);
    }
    return of({} as Requirement);
  }

  getProfile(): Observable<GccProfile> {
    // In a real app, this would call an API endpoint
    return of(this.mockGccProfile);
  }

  updateProfile(updates: Partial<GccProfile>): Observable<GccProfile> {
    // In a real app, this would call an API endpoint
    this.mockGccProfile = { ...this.mockGccProfile, ...updates, updatedAt: new Date() };
    return of(this.mockGccProfile);
  }
}