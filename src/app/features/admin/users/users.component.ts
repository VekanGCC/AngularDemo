import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { User, UserRole, ApprovalStatus } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="users-container">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Platform Users</h1>
            <p>Manage and monitor all registered users</p>
          </div>
        </header>

        <div class="filters-section">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search users by name or email"
              [(ngModel)]="searchTerm"
              (input)="filterUsers()"
            >
          </div>
          
          <div class="filter-tags">
            <div class="filter-group">
              <h3>Role</h3>
              <div class="tags">
                @for (role of roles; track role) {
                  <button 
                    class="tag" 
                    [class.active]="selectedRole === role"
                    (click)="toggleRole(role)"
                  >
                    {{ role }}
                  </button>
                }
              </div>
            </div>
            
            <div class="filter-group">
              <h3>Status</h3>
              <div class="tags">
                @for (status of statuses; track status) {
                  <button 
                    class="tag" 
                    [class.active]="selectedStatus === status"
                    (click)="toggleStatus(status)"
                  >
                    {{ status }}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>

        @if (filteredUsers.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <span class="material-symbols-rounded">group_off</span>
            </div>
            <h2>No Users Found</h2>
            <p>Try adjusting your filters or search terms</p>
          </div>
        } @else {
          <div class="users-table-wrapper">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (user of filteredUsers; track user.id) {
                  <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span class="role-badge" [class]="user.role.toLowerCase()">
                        {{ user.role }}
                      </span>
                    </td>
                    <td>
                      <span class="status-badge" [class]="user.approvalStatus.toLowerCase()">
                        {{ user.approvalStatus }}
                      </span>
                    </td>
                    <td>{{ formatDate(user.createdAt) }}</td>
                    <td>
                      <div class="actions">
                        @if (user.approvalStatus === 'PENDING') {
                          <button 
                            class="btn btn-success btn-sm"
                            (click)="approveUser(user.id)"
                          >
                            Approve
                          </button>
                          <button 
                            class="btn btn-error btn-sm"
                            (click)="rejectUser(user.id)"
                          >
                            Reject
                          </button>
                        } @else {
                          <button class="btn btn-secondary btn-sm">View Profile</button>
                        }
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding-bottom: var(--space-8);
    }
    
    .page-header {
      margin-bottom: var(--space-8);
    }
    
    .page-header h1 {
      font-size: 2rem;
      margin-bottom: var(--space-2);
    }
    
    .page-header p {
      color: var(--color-neutral-600);
    }
    
    .filters-section {
      margin-bottom: var(--space-8);
    }
    
    .search-box {
      margin-bottom: var(--space-6);
    }
    
    .search-box input {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      border: 2px solid var(--color-neutral-200);
      border-radius: var(--radius-lg);
      font-size: 1rem;
      transition: all var(--transition-fast);
    }
    
    .search-box input:focus {
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 3px var(--color-primary-100);
    }
    
    .filter-tags {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
    
    .filter-group h3 {
      font-size: 0.9rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-3);
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .tag {
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .tag:hover {
      background: var(--color-neutral-200);
    }
    
    .tag.active {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }
    
    .empty-state {
      text-align: center;
      padding: var(--space-8);
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    
    .empty-icon {
      width: 64px;
      height: 64px;
      background: var(--color-neutral-100);
      color: var(--color-neutral-600);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-4);
    }
    
    .empty-icon span {
      font-size: 32px;
    }
    
    .users-table-wrapper {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    
    .users-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .users-table th,
    .users-table td {
      padding: var(--space-4);
      text-align: left;
    }
    
    .users-table th {
      background: var(--color-neutral-50);
      font-weight: 600;
      color: var(--color-neutral-700);
    }
    
    .users-table tr {
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .users-table tr:last-child {
      border-bottom: none;
    }
    
    .role-badge,
    .status-badge {
      display: inline-block;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .role-badge.admin {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }
    
    .role-badge.gcc {
      background: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }
    
    .role-badge.startup {
      background: var(--color-accent-100);
      color: var(--color-accent-700);
    }
    
    .status-badge.pending {
      background: var(--color-warning-100);
      color: var(--color-warning-700);
    }
    
    .status-badge.approved {
      background: var(--color-success-100);
      color: var(--color-success-700);
    }
    
    .status-badge.rejected {
      background: var(--color-error-100);
      color: var(--color-error-700);
    }
    
    .actions {
      display: flex;
      gap: var(--space-2);
    }
    
    .btn-sm {
      padding: var(--space-1) var(--space-3);
      font-size: 0.875rem;
    }
    
    .btn-success {
      background: var(--color-success-500);
      color: white;
    }
    
    .btn-success:hover {
      background: var(--color-success-600);
    }
    
    .btn-error {
      background: var(--color-error-500);
      color: white;
    }
    
    .btn-error:hover {
      background: var(--color-error-600);
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  
  roles = Object.values(UserRole);
  statuses = Object.values(ApprovalStatus);
  
  selectedRole: UserRole | null = null;
  selectedStatus: ApprovalStatus | null = null;
  
  constructor(private adminService: AdminService) {}
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }
  
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = this.searchTerm === '' || 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = !this.selectedRole || user.role === this.selectedRole;
      const matchesStatus = !this.selectedStatus || user.approvalStatus === this.selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }
  
  toggleRole(role: UserRole): void {
    this.selectedRole = this.selectedRole === role ? null : role;
    this.filterUsers();
  }
  
  toggleStatus(status: ApprovalStatus): void {
    this.selectedStatus = this.selectedStatus === status ? null : status;
    this.filterUsers();
  }
  
  approveUser(userId: string): void {
    this.adminService.approveUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
  
  rejectUser(userId: string): void {
    this.adminService.rejectUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}