import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { User, UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="approvals-container">
      <div class="container">
        <header class="page-header">
          <h1>Pending Approvals</h1>
          <p>Review and approve new user registrations</p>
        </header>
        
        @if (pendingUsers.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <span class="material-symbols-rounded">check_circle</span>
            </div>
            <h2>No Pending Approvals</h2>
            <p>You're all caught up! There are no users waiting for approval.</p>
          </div>
        } @else {
          <div class="approvals-list">
            @for (user of pendingUsers; track user.id) {
              <div class="approval-card" [class.expanded]="expandedUserId === user.id">
                <div class="approval-header" (click)="toggleExpand(user.id)">
                  <div class="user-info">
                    <div class="user-avatar">{{ getUserInitials(user) }}</div>
                    <div class="user-details">
                      <h3>{{ user.name }}</h3>
                      <p>{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="user-meta">
                    <span class="user-role" [class]="user.role.toLowerCase()">{{ user.role }}</span>
                    <span class="user-date">Registered {{ formatDate(user.createdAt) }}</span>
                    <span class="expand-icon material-symbols-rounded">{{ expandedUserId === user.id ? 'expand_less' : 'expand_more' }}</span>
                  </div>
                </div>
                
                <div class="approval-content">
                  <div class="user-details-expanded">
                    <div class="detail-item">
                      <span class="detail-label">Full Name</span>
                      <span class="detail-value">{{ user.name }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Email</span>
                      <span class="detail-value">{{ user.email }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Account Type</span>
                      <span class="detail-value">{{ user.role }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Registered On</span>
                      <span class="detail-value">{{ formatFullDate(user.createdAt) }}</span>
                    </div>
                  </div>
                  
                  <div class="approval-actions">
                    <button class="btn btn-secondary" (click)="rejectUser(user.id)">
                      <span class="material-symbols-rounded">close</span>
                      Reject
                    </button>
                    <button class="btn btn-primary" (click)="approveUser(user.id)">
                      <span class="material-symbols-rounded">check</span>
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .approvals-container {
      padding-bottom: var(--space-8);
    }
    
    .page-header {
      margin-bottom: var(--space-8);
    }
    
    .page-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
    }
    
    .page-header p {
      color: var(--color-neutral-600);
      font-size: 1.1rem;
    }
    
    .empty-state {
      text-align: center;
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-8);
      box-shadow: var(--shadow-md);
    }
    
    .empty-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-4);
      width: 80px;
      height: 80px;
      background-color: var(--color-success-100);
      color: var(--color-success-500);
      border-radius: var(--radius-full);
    }
    
    .empty-icon span {
      font-size: 40px;
    }
    
    .empty-state h2 {
      font-size: 1.5rem;
      margin-bottom: var(--space-3);
    }
    
    .empty-state p {
      color: var(--color-neutral-600);
      max-width: 400px;
      margin: 0 auto;
    }
    
    .approvals-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .approval-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      transition: all var(--transition-normal);
    }
    
    .approval-card:hover {
      box-shadow: var(--shadow-lg);
    }
    
    .approval-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) var(--space-6);
      cursor: pointer;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-full);
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .user-details h3 {
      margin-bottom: 0;
      font-size: 1.1rem;
    }
    
    .user-details p {
      margin: 0;
      color: var(--color-neutral-500);
      font-size: 0.9rem;
    }
    
    .user-meta {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }
    
    .user-role {
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .user-role.gcc {
      background-color: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }
    
    .user-role.startup {
      background-color: var(--color-accent-100);
      color: var(--color-accent-700);
    }
    
    .user-role.admin {
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
    }
    
    .user-date {
      color: var(--color-neutral-500);
      font-size: 0.9rem;
    }
    
    .expand-icon {
      color: var(--color-neutral-400);
      transition: transform var(--transition-fast);
    }
    
    .approval-card.expanded .expand-icon {
      transform: rotate(180deg);
    }
    
    .approval-content {
      height: 0;
      overflow: hidden;
      transition: height var(--transition-normal);
      border-top: 1px solid var(--color-neutral-100);
    }
    
    .approval-card.expanded .approval-content {
      height: auto;
      padding: var(--space-6);
    }
    
    .user-details-expanded {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }
    
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
    
    .detail-label {
      font-size: 0.9rem;
      color: var(--color-neutral-500);
    }
    
    .detail-value {
      font-weight: 500;
    }
    
    .approval-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-4);
    }
    
    .approval-actions button {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .material-symbols-rounded {
      font-size: 20px;
    }
    
    @media (max-width: 768px) {
      .user-meta {
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-1);
      }
      
      .approval-header {
        padding: var(--space-4);
      }
      
      .approval-card.expanded .approval-content {
        padding: var(--space-4);
      }
    }
  `]
})
export class ApprovalsComponent implements OnInit {
  pendingUsers: User[] = [];
  expandedUserId: string | null = null;
  
  constructor(private adminService: AdminService) {}
  
  ngOnInit(): void {
    this.loadPendingApprovals();
  }
  
  loadPendingApprovals(): void {
    this.adminService.getPendingApprovals().subscribe(users => {
      this.pendingUsers = users;
    });
  }
  
  approveUser(userId: string): void {
    this.adminService.approveUser(userId).subscribe(() => {
      // Remove from pending list
      this.pendingUsers = this.pendingUsers.filter(user => user.id !== userId);
    });
  }
  
  rejectUser(userId: string): void {
    this.adminService.rejectUser(userId).subscribe(() => {
      // Remove from pending list
      this.pendingUsers = this.pendingUsers.filter(user => user.id !== userId);
    });
  }
  
  toggleExpand(userId: string): void {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }
  
  getUserInitials(user: User): string {
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
  
  formatDate(date: Date): string {
    // This is a simple implementation - in a real app, use a proper date library
    const now = new Date();
    const diff = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
    
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  }
  
  formatFullDate(date: Date): string {
    // This is a simple implementation - in a real app, use a proper date library
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}