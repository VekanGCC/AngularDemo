import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartupService } from '../../../core/services/startup.service';
import { Requirement, RequirementStatus } from '../../../core/models/requirement.model';

@Component({
  selector: 'app-startup-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="container">
        <header class="dashboard-header">
          <div>
            <h1>Startup Dashboard</h1>
            <p>Find and respond to GCC requirements matching your capabilities</p>
          </div>
        </header>

        <section class="dashboard-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">description</span>
            </div>
            <div class="summary-info">
              <h3>Matching Requirements</h3>
              <p class="summary-value">{{ matchingRequirements.length }}</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">corporate_fare</span>
            </div>
            <div class="summary-info">
              <h3>Connected GCCs</h3>
              <p class="summary-value">{{ connectedGccs }}</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">handshake</span>
            </div>
            <div class="summary-info">
              <h3>Active Collaborations</h3>
              <p class="summary-value">{{ activeCollaborations }}</p>
            </div>
          </div>
        </section>

        <section class="requirements-section">
          <div class="section-header">
            <h2>Matching Requirements</h2>
            <a routerLink="/startup/requirements" class="view-all">View All</a>
          </div>
          
          @if (matchingRequirements.length === 0) {
            <div class="empty-state">
              <p>No matching requirements found.</p>
              <a routerLink="/startup/requirements" class="btn btn-primary btn-sm">Browse All Requirements</a>
            </div>
          } @else {
            <div class="requirements-grid">
              @for (req of matchingRequirements; track req.id) {
                <div class="requirement-card">
                  <div class="requirement-header">
                    <div class="gcc-logo">
                      @if (req.gccLogo) {
                        <img [src]="req.gccLogo" [alt]="req.gccName">
                      } @else {
                        <div class="placeholder-logo">{{ getCompanyInitials(req.gccName) }}</div>
                      }
                    </div>
                    <div class="gcc-info">
                      <h3>{{ req.title }}</h3>
                      <p class="gcc-name">{{ req.gccName }}</p>
                    </div>
                  </div>
                  
                  <p class="requirement-desc">{{ req.description }}</p>
                  
                  <div class="tech-tags">
                    @for (tech of req.techStack.slice(0, 3); track tech) {
                      <span class="tech-tag">{{ tech }}</span>
                    }
                    @if (req.techStack.length > 3) {
                      <span class="tech-tag more">+{{ req.techStack.length - 3 }}</span>
                    }
                  </div>
                  
                  <div class="requirement-meta">
                    <div class="meta-item">
                      <span class="label">Status</span>
                      <span class="status" [class]="req.status.toLowerCase()">{{ req.status }}</span>
                    </div>
                    @if (req.budget) {
                      <div class="meta-item">
                        <span class="label">Budget</span>
                        <span>{{ req.budget }}</span>
                      </div>
                    }
                    @if (req.deadline) {
                      <div class="meta-item">
                        <span class="label">Deadline</span>
                        <span>{{ formatDate(req.deadline) }}</span>
                      </div>
                    }
                  </div>
                  
                  <div class="requirement-actions">
                    <button class="btn btn-primary btn-sm">Express Interest</button>
                    <button class="btn btn-secondary btn-sm">View Details</button>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding-bottom: var(--space-8);
    }
    
    .dashboard-header {
      margin-bottom: var(--space-8);
    }
    
    .dashboard-header h1 {
      font-size: 2rem;
      margin-bottom: var(--space-2);
    }
    
    .dashboard-header p {
      color: var(--color-neutral-600);
    }
    
    .dashboard-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }
    
    .summary-card {
      display: flex;
      align-items: center;
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
    }
    
    .summary-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      background: var(--color-primary-100);
      color: var(--color-primary-600);
      margin-right: var(--space-4);
    }
    
    .summary-icon span {
      font-size: 24px;
    }
    
    .summary-info h3 {
      font-size: 0.9rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-1);
    }
    
    .summary-value {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
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
    
    .view-all {
      color: var(--color-primary-600);
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .empty-state {
      text-align: center;
      padding: var(--space-8);
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    
    .empty-state p {
      color: var(--color-neutral-500);
      margin-bottom: var(--space-4);
    }
    
    .requirements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-4);
    }
    
    .requirement-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
    }
    
    .requirement-header {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    .gcc-logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .gcc-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .placeholder-logo {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-100);
      color: var(--color-primary-700);
      font-weight: 600;
    }
    
    .gcc-info h3 {
      margin-bottom: var(--space-1);
    }
    
    .gcc-name {
      color: var(--color-neutral-500);
      font-size: 0.875rem;
    }
    
    .requirement-desc {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin-bottom: var(--space-3);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }
    
    .tech-tag {
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
    }
    
    .tech-tag.more {
      background: var(--color-neutral-200);
    }
    
    .requirement-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: var(--space-2);
      margin-bottom: var(--space-3);
      padding: var(--space-3) 0;
      border-top: 1px solid var(--color-neutral-200);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
    
    .meta-item .label {
      font-size: 0.75rem;
      color: var(--color-neutral-500);
    }
    
    .status {
      display: inline-block;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status.open {
      background: var(--color-success-100);
      color: var(--color-success-700);
    }
    
    .status.in_progress {
      background: var(--color-primary-100);
      color: var(--color-primary-700);
    }
    
    .status.completed {
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
    }
    
    .status.closed {
      background: var(--color-neutral-200);
      color: var(--color-neutral-800);
    }
    
    .requirement-actions {
      display: flex;
      gap: var(--space-2);
    }
    
    .btn-sm {
      padding: var(--space-1) var(--space-3);
      font-size: 0.875rem;
    }
  `]
})
export class StartupDashboardComponent implements OnInit {
  matchingRequirements: Requirement[] = [];
  connectedGccs = 0;
  activeCollaborations = 0;
  
  constructor(private startupService: StartupService) {}
  
  ngOnInit(): void {
    this.loadMatchingRequirements();
  }
  
  loadMatchingRequirements(): void {
    this.startupService.getRequirements().subscribe(reqs => {
      this.matchingRequirements = reqs;
      this.countStats();
    });
  }
  
  countStats(): void {
    // Count unique GCCs
    const uniqueGccs = new Set(this.matchingRequirements.map(req => req.gccId));
    this.connectedGccs = uniqueGccs.size;
    
    // Count active collaborations (requirements in progress)
    this.activeCollaborations = this.matchingRequirements.filter(
      req => req.status === RequirementStatus.IN_PROGRESS
    ).length;
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  getCompanyInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}