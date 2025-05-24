import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, GccProfile, StartupProfile, ApprovalStatus, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // In a real app, this would come from environment configuration
  private apiUrl = 'api/admin';

  // Mock data for demo purposes
  private mockPendingUsers: User[] = [
    {
      id: '5',
      email: 'pending@example.com',
      name: 'Pending GCC',
      role: UserRole.GCC,
      approvalStatus: ApprovalStatus.PENDING,
      createdAt: new Date('2025-01-22'),
      updatedAt: new Date('2025-01-22')
    },
    {
      id: '6',
      email: 'pending2@example.com',
      name: 'Pending Startup',
      role: UserRole.STARTUP,
      approvalStatus: ApprovalStatus.PENDING,
      createdAt: new Date('2025-01-23'),
      updatedAt: new Date('2025-01-23')
    }
  ];

  private mockUsers: User[] = [
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
    ...this.mockPendingUsers
  ];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // In a real app, this would call an API endpoint
    return of(this.mockUsers);
  }

  getPendingApprovals(): Observable<User[]> {
    // In a real app, this would call an API endpoint with filtering
    return of(this.mockPendingUsers);
  }

  approveUser(userId: string): Observable<User> {
    // In a real app, this would call an API endpoint
    const index = this.mockUsers.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.mockUsers[index] = { 
        ...this.mockUsers[index], 
        approvalStatus: ApprovalStatus.APPROVED,
        updatedAt: new Date()
      };
      
      // Also update in pending users array
      const pendingIndex = this.mockPendingUsers.findIndex(user => user.id === userId);
      if (pendingIndex !== -1) {
        this.mockPendingUsers.splice(pendingIndex, 1);
      }
      
      return of(this.mockUsers[index]);
    }
    
    return of({} as User);
  }

  rejectUser(userId: string): Observable<User> {
    // In a real app, this would call an API endpoint
    const index = this.mockUsers.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.mockUsers[index] = { 
        ...this.mockUsers[index], 
        approvalStatus: ApprovalStatus.REJECTED,
        updatedAt: new Date()
      };
      
      // Also update in pending users array
      const pendingIndex = this.mockPendingUsers.findIndex(user => user.id === userId);
      if (pendingIndex !== -1) {
        this.mockPendingUsers.splice(pendingIndex, 1);
      }
      
      return of(this.mockUsers[index]);
    }
    
    return of({} as User);
  }

  getStats(): Observable<any> {
    // In a real app, this would call an API endpoint
    return of({
      totalUsers: this.mockUsers.length,
      pendingApprovals: this.mockPendingUsers.length,
      gccCount: this.mockUsers.filter(user => user.role === UserRole.GCC && user.approvalStatus === ApprovalStatus.APPROVED).length,
      startupCount: this.mockUsers.filter(user => user.role === UserRole.STARTUP && user.approvalStatus === ApprovalStatus.APPROVED).length
    });
  }
}