import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole, ApprovalStatus, GccProfile, StartupProfile } from '../models/user.model';
import { Requirement, RequirementStatus } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // Mock data for users
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
      approvalStatus: ApprovalStatus.APPROVED,
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2024-12-01')
    },
    {
      id: '2',
      email: 'gcc@example.com',
      name: 'GCC User',
      role: UserRole.GCC,
      approvalStatus: ApprovalStatus.APPROVED,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-10')
    },
    {
      id: '3',
      email: 'startup@example.com',
      name: 'Startup User',
      role: UserRole.STARTUP,
      approvalStatus: ApprovalStatus.APPROVED,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15')
    },
    {
      id: '4',
      email: 'pending@example.com',
      name: 'Pending User',
      role: UserRole.STARTUP,
      approvalStatus: ApprovalStatus.PENDING,
      createdAt: new Date('2025-01-22'),
      updatedAt: new Date('2025-01-22')
    }
  ];

  // Mock data for GCC profiles
  private gccProfiles: GccProfile[] = [
    {
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
      description: 'TechCorp Global is a leading technology company specializing in enterprise solutions.',
      logo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg',
      website: 'https://techcorp-global.example.com'
    }
  ];

  // Mock data for startup profiles
  private startupProfiles: StartupProfile[] = [
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
      logo: 'https://images.pexels.com/photos/2559749/pexels-photo-2559749.jpeg',
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
      logo: 'https://images.pexels.com/photos/13137883/pexels-photo-13137883.jpeg',
      website: 'https://blockchainsolutions.example.com',
      funding: '$8M'
    }
  ];

  // Mock data for requirements
  private requirements: Requirement[] = [
    {
      id: '1',
      title: 'AI-Powered Data Analytics Platform',
      description: 'We are looking for a startup that can provide AI-driven data analytics capabilities to process and analyze large volumes of customer data to identify patterns and insights.',
      gccId: '2',
      gccName: 'TechCorp Global',
      gccLogo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg',
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
      gccLogo: 'https://images.pexels.com/photos/15031644/pexels-photo-15031644/free-photo-of-letter-t-logo.jpeg',
      industry: ['Supply Chain', 'Blockchain'],
      techStack: ['Ethereum', 'Solidity', 'React'],
      budget: '$50K - $100K',
      deadline: new Date('2025-07-15'),
      status: RequirementStatus.OPEN,
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-20')
    }
  ];

  // User related methods
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getPendingUsers(): Observable<User[]> {
    return of(this.users.filter(user => user.approvalStatus === ApprovalStatus.PENDING));
  }

  approveUser(userId: string): Observable<User> {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.approvalStatus = ApprovalStatus.APPROVED;
      user.updatedAt = new Date();
    }
    return of(user || {} as User);
  }

  rejectUser(userId: string): Observable<User> {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.approvalStatus = ApprovalStatus.REJECTED;
      user.updatedAt = new Date();
    }
    return of(user || {} as User);
  }

  // GCC related methods
  getGccProfile(id: string): Observable<GccProfile> {
    return of(this.gccProfiles.find(gcc => gcc.id === id) || {} as GccProfile);
  }

  updateGccProfile(id: string, updates: Partial<GccProfile>): Observable<GccProfile> {
    const index = this.gccProfiles.findIndex(gcc => gcc.id === id);
    if (index !== -1) {
      this.gccProfiles[index] = { ...this.gccProfiles[index], ...updates, updatedAt: new Date() };
      return of(this.gccProfiles[index]);
    }
    return of({} as GccProfile);
  }

  // Startup related methods
  getStartupProfiles(): Observable<StartupProfile[]> {
    return of(this.startupProfiles);
  }

  getStartupProfile(id: string): Observable<StartupProfile> {
    return of(this.startupProfiles.find(startup => startup.id === id) || {} as StartupProfile);
  }

  updateStartupProfile(id: string, updates: Partial<StartupProfile>): Observable<StartupProfile> {
    const index = this.startupProfiles.findIndex(startup => startup.id === id);
    if (index !== -1) {
      this.startupProfiles[index] = { ...this.startupProfiles[index], ...updates, updatedAt: new Date() };
      return of(this.startupProfiles[index]);
    }
    return of({} as StartupProfile);
  }

  // Requirement related methods
  getRequirements(): Observable<Requirement[]> {
    return of(this.requirements);
  }

  getRequirement(id: string): Observable<Requirement> {
    return of(this.requirements.find(req => req.id === id) || {} as Requirement);
  }

  createRequirement(requirement: Partial<Requirement>): Observable<Requirement> {
    const newRequirement: Requirement = {
      id: Math.random().toString(36).substring(2, 9),
      title: requirement.title || '',
      description: requirement.description || '',
      gccId: requirement.gccId || '',
      gccName: requirement.gccName || '',
      gccLogo: requirement.gccLogo,
      industry: requirement.industry || [],
      techStack: requirement.techStack || [],
      budget: requirement.budget,
      deadline: requirement.deadline,
      status: RequirementStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.requirements.push(newRequirement);
    return of(newRequirement);
  }

  updateRequirement(id: string, updates: Partial<Requirement>): Observable<Requirement> {
    const index = this.requirements.findIndex(req => req.id === id);
    if (index !== -1) {
      this.requirements[index] = { ...this.requirements[index], ...updates, updatedAt: new Date() };
      return of(this.requirements[index]);
    }
    return of({} as Requirement);
  }

  // Authentication related methods
  login(email: string, password: string): Observable<{ user: User; token: string }> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return of({
        user,
        token: 'mock-jwt-token-' + user.role.toLowerCase()
      });
    }
    throw new Error('Invalid credentials');
  }

  register(userData: Partial<User>): Observable<{ user: User; token: string }> {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || UserRole.STARTUP,
      approvalStatus: ApprovalStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.push(newUser);
    return of({
      user: newUser,
      token: 'mock-jwt-token-new-user'
    });
  }

  // Stats and metrics
  getStats(): Observable<any> {
    return of({
      totalUsers: this.users.length,
      pendingApprovals: this.users.filter(u => u.approvalStatus === ApprovalStatus.PENDING).length,
      gccCount: this.users.filter(u => u.role === UserRole.GCC && u.approvalStatus === ApprovalStatus.APPROVED).length,
      startupCount: this.users.filter(u => u.role === UserRole.STARTUP && u.approvalStatus === ApprovalStatus.APPROVED).length
    });
  }
}