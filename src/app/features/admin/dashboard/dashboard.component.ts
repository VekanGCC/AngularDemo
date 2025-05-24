import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <div class="container">
        <header class="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage platform users and activity</p>
        </header>
        
        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon pending-icon">
                <span class="material-symbols-rounded">pending</span>
              </div>
              <div class="stat-info">
                <h3>Pending Approvals</h3>
                <p class="stat-value">{{ stats.pendingApprovals }}</p>
                <a routerLink="/admin/approvals" class="stat-link">Review Now</a>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon users-icon">
                <span class="material-symbols-rounded">groups</span>
              </div>
              <div class="stat-info">
                <h3>Total Users</h3>
                <p class="stat-value">{{ stats.totalUsers }}</p>
                <a routerLink="/admin/users" class="stat-link">View All</a>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon gcc-icon">
                <span class="material-symbols-rounded">corporate_fare</span>
              </div>
              <div class="stat-info">
                <h3>Global Capability Centers</h3>
                <p class="stat-value">{{ stats.gccCount }}</p>
                <a routerLink="/admin/users" class="stat-link">Manage</a>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon startup-icon">
                <span class="material-symbols-rounded">rocket_launch</span>
              </div>
              <div class="stat-info">
                <h3>Deep Tech Startups</h3>
                <p class="stat-value">{{ stats.startupCount }}</p>
                <a routerLink="/admin/users" class="stat-link">Manage</a>
              </div>
            </div>
          </div>
        </section>
        
        <section class="recent-section">
          <div class="section-header">
            <h2>Recent Activity</h2>
            <a routerLink="/admin/users" class="btn btn-secondary btn-sm">View All</a>
          </div>
          
          <div class="card">
            <table class="activity-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>New Registration</td>
                  <td>Pending GCC</td>
                  <td><span class="badge gcc">GCC</span></td>
                  <td>Just now</td>
                </tr>
                <tr>
                  <td>New Registration</td>
                  <td>Pending Startup</td>
                  <td><span class="badge startup">Startup</span></td>
                  <td>1 day ago</td>
                </tr>
                <tr>
                  <td>New Requirement Posted</td>
                  <td>TechCorp Global</td>
                  <td><span class="badge gcc">GCC</span></td>
                  <td>2 days ago</td>
                </tr>
                <tr>
                  <td>Profile Updated</td>
                  <td>AI Vision Tech</td>
                  <td><span class="badge startup">Startup</span></td>
                  <td>3 days ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section class="actions-section">
          <h2>Quick Actions</h2>
          
          <div class="actions-grid">
            <a routerLink="/admin/approvals" class="action-card">
              <span class="material-symbols-rounded">person_add</span>
              <h3>Review Approvals</h3>
              <p>Review and approve pending registrations</p>
            </a>
            
            <a routerLink="/admin/users" class="action-card">
              <span class="material-symbols-rounded">manage_accounts</span>
              <h3>Manage Users</h3>
              <p>View and manage all platform users</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding-bottom: var(--space-8);
    }
    
    .dashboard-header {
      margin-bottom: var(--space-8);
    }
    
    .dashboard-header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
    }
    
    .dashboard-header p {
      color: var(--color-neutral-600);
      font-size: 1.1rem;
    }
    
    .stats-section {
      margin-bottom: var(--space-8);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4);
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal);
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      margin-right: var(--space-4);
      flex-shrink: 0;
    }
    
    .stat-icon span {
      font-size: 24px;
    }
    
    .pending-icon {
      background-color: var(--color-warning-100);
      color: var(--color-warning-500);
    }
    
    .users-icon {
      background-color: var(--color-primary-100);
      color: var(--color-primary-500);
    }
    
    .gcc-icon {
      background-color: var(--color-secondary-100);
      color: var(--color-secondary-500);
    }
    
    .startup-icon {
      background-color: var(--color-accent-100);
      color: var(--color-accent-500);
    }
    
    .stat-info {
      flex: 1;
    }
    
    .stat-info h3 {
      font-size: 0.9rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-1);
    }
    
    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: var(--space-1);
    }
    
    .stat-link {
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .section-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
    
    .btn-sm {
      padding: var(--space-1) var(--space-3);
      font-size: 0.875rem;
    }
    
    .recent-section {
      margin-bottom: var(--space-8);
    }
    
    .activity-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .activity-table th {
      text-align: left;
      padding: var(--space-3);
      font-weight: 600;
      color: var(--color-neutral-700);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .activity-table td {
      padding: var(--space-3);
      border-bottom: 1px solid var(--color-neutral-100);
    }
    
    .activity-table tbody tr:hover {
      background-color: var(--color-neutral-50);
    }
    
    .badge {
      display: inline-block;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .badge.gcc {
      background-color: var(--color-secondary-100);
      color: var(--color-secondary-700);
    }
    
    .badge.startup {
      background-color: var(--color-accent-100);
      color: var(--color-accent-700);
    }
    
    .actions-section h2 {
      margin-bottom: var(--space-4);
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4);
    }
    
    .action-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      color: var(--color-neutral-800);
      text-decoration: none;
    }
    
    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      color: var(--color-primary-600);
    }
    
    .action-card span {
      font-size: 36px;
      margin-bottom: var(--space-3);
      color: var(--color-primary-500);
    }
    
    .action-card h3 {
      font-size: 1.1rem;
      margin-bottom: var(--space-2);
    }
    
    .action-card p {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin: 0;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    pendingApprovals: 0,
    gccCount: 0,
    startupCount: 0
  };
  
  constructor(private adminService: AdminService) {}
  
  ngOnInit(): void {
    this.loadStats();
  }
  
  loadStats(): void {
    this.adminService.getStats().subscribe(stats => {
      this.stats = stats;
    });
  }
}