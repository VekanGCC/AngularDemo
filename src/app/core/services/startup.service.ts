import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StartupProfile, UserRole, ApprovalStatus } from '../models/user.model';
import { Requirement, RequirementStatus } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  // In a real app, this would come from environment configuration
  private apiUrl = 'api/startup';

  // Mock data for demo purposes
  private mockStartups: StartupProfile[] = [
    {
      id: '3',
      email: 'startup@example.com',
      name: 'Startup User',
      role: UserRole.STARTUP,
      approvalStatus: ApprovalStatus.APPROVED,
      createdAt: new Date(),
      updatedAt: new Date(),
      companyName: 'AI Vision Tech',
      foundingYear: 2023,
      stage: 'Seed',
      industry: ['AI/ML', 'Computer Vision'],
      techStack: ['Python', 'TensorFlow', 'AWS'],
      location: 'Boston, MA',
      teamSize: 8,
      description: 'AI Vision Tech develops advanced computer vision solutions for retail analytics and security.',
      logo: 'https://images.pexels.com/photos/2559749/pexels-photo-2559749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      website: 'https://aivisiontech.example.com',
      funding: '$2M'
    },
    {
      id: '4',
      email: 'blockchain@example.com',
      name: 'Blockchain Startup',
      role: UserRole.STARTUP,
      approvalStatus: ApprovalStatus.APPROVED,
      createdAt: new Date(),
      updatedAt: new Date(),
      companyName: 'BlockChain Solutions',
      foundingYear: 2021,
      stage: 'Series A',
      industry: ['Blockchain', 'Supply Chain'],
      techStack: ['Ethereum', 'Solidity', 'React'],
      location: 'San Francisco, CA',
      teamSize: 15,
      description: 'Building enterprise-grade blockchain solutions for supply chain transparency and tracking.',
      logo: 'https://images.pexels.com/photos/13137883/pexels-photo-13137883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      website: 'https://blockchainsolutions.example.com',
      funding: '$8M'
    }
  ];
  
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
  
  private mockStartupProfile: StartupProfile = this.mockStartups[0];

  constructor(private http: HttpClient) {}

  getRequirements(): Observable<Requirement[]> {
    // In a real app, this would call an API endpoint
    return of(this.mockRequirements);
  }

  getRequirementsByTech(techStack: string[]): Observable<Requirement[]> {
    // In a real app, this would call an API endpoint with filtering
    return of(this.mockRequirements.filter(req => 
      req.techStack.some(tech => techStack.includes(tech))
    ));
  }

  getStartups(): Observable<StartupProfile[]> {
    // In a real app, this would call an API endpoint
    return of(this.mockStartups);
  }

  getStartup(id: string): Observable<StartupProfile> {
    // In a real app, this would call an API endpoint
    const startup = this.mockStartups.find(s => s.id === id);
    if (startup) {
      return of(startup);
    }
    return of({} as StartupProfile);
  }

  getProfile(): Observable<StartupProfile> {
    // In a real app, this would call an API endpoint
    return of(this.mockStartupProfile);
  }

  updateProfile(updates: Partial<StartupProfile>): Observable<StartupProfile> {
    // In a real app, this would call an API endpoint
    this.mockStartupProfile = { ...this.mockStartupProfile, ...updates, updatedAt: new Date() };
    return of(this.mockStartupProfile);
  }
}