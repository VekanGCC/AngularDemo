import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { GccService } from '../../../../core/services/gcc.service';
import { StartupService } from '../../../../core/services/startup.service';
import { Requirement } from '../../../../core/models/requirement.model';
import { StartupProfile } from '../../../../core/models/user.model';

@Component({
  selector: 'app-requirement-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="requirement-detail-container">
      <div class="container">
        @if (requirement) {
          <header class="page-header">
            <div class="header-content">
              <h1>{{ requirement.title }}</h1>
              <div class="requirement-meta">
                <span class="status" [class]="requirement.status.toLowerCase()">{{ requirement.status }}</span>
                <span class="posted-date">Posted {{ formatDate(requirement.createdAt) }}</span>
              </div>
            </div>
            <div class="header-actions">
              <button class="btn btn-secondary" (click)="editRequirement()">
                <span class="material-symbols-rounded">edit</span>
                Edit
              </button>
            </div>
          </header>

          <div class="content-grid">
            <div class="main-content">
              <div class="card">
                <h2>Description</h2>
                <p class="description">{{ requirement.description }}</p>
                
                <div class="tech-details">
                  <div class="detail-group">
                    <h3>Industry</h3>
                    <div class="tags">
                      @for (industry of requirement.industry; track industry) {
                        <span class="tag">{{ industry }}</span>
                      }
                    </div>
                  </div>
                  
                  <div class="detail-group">
                    <h3>Tech Stack</h3>
                    <div class="tags">
                      @for (tech of requirement.techStack; track tech) {
                        <span class="tag">{{ tech }}</span>
                      }
                    </div>
                  </div>
                </div>
                
                <div class="requirement-info">
                  @if (requirement.budget) {
                    <div class="info-item">
                      <span class="label">Budget Range</span>
                      <span class="value">{{ requirement.budget }}</span>
                    </div>
                  }
                  
                  @if (requirement.deadline) {
                    <div class="info-item">
                      <span class="label">Deadline</span>
                      <span class="value">{{ formatDate(requirement.deadline) }}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h2>Matching Startups</h2>
                  <a routerLink="/gcc/startups" class="btn btn-secondary btn-sm">View All Startups</a>
                </div>
                
                @if (matchingStartups.length === 0) {
                  <div class="empty-state">
                    <p>No matching startups found yet.</p>
                  </div>
                } @else {
                  <div class="startups-list">
                    @for (startup of matchingStartups; track startup.id) {
                      <div class="startup-card">
                        <div class="startup-header">
                          <div class="startup-logo">
                            @if (startup.logo) {
                              <img [src]="startup.logo" [alt]="startup.companyName">
                            } @else {
                              <div class="placeholder-logo">{{ getCompanyInitials(startup.companyName) }}</div>
                            }
                          </div>
                          <div class="startup-info">
                            <h3>{{ startup.companyName }}</h3>
                            <p class="location">{{ startup.location }}</p>
                          </div>
                        </div>
                        
                        <p class="startup-desc">{{ startup.description }}</p>
                        
                        <div class="tech-tags">
                          @for (tech of startup.techStack.slice(0, 3); track tech) {
                            <span class="tech-tag">{{ tech }}</span>
                          }
                          @if (startup.techStack.length > 3) {
                            <span class="tech-tag more">+{{ startup.techStack.length - 3 }}</span>
                          }
                        </div>
                        
                        <div class="startup-meta">
                          <span>Founded {{ startup.foundingYear }}</span>
                          <span>{{ startup.teamSize }} team members</span>
                        </div>
                        
                        <div class="startup-actions">
                          <button class="btn btn-primary btn-sm">Contact Startup</button>
                          <button class="btn btn-secondary btn-sm">View Profile</button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>

            <aside class="sidebar">
              <div class="card">
                <h2>Requirement Stats</h2>
                <div class="stats-grid">
                  <div class="stat-item">
                    <span class="stat-label">Views</span>
                    <span class="stat-value">245</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Matches</span>
                    <span class="stat-value">12</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Responses</span>
                    <span class="stat-value">8</span>
                  </div>
                </div>
              </div>
              
              <div class="card">
                <h2>Timeline</h2>
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-icon">
                      <span class="material-symbols-rounded">post_add</span>
                    </div>
                    <div class="timeline-content">
                      <h4>Requirement Posted</h4>
                      <p>{{ formatDate(requirement.createdAt) }}</p>
                    </div>
                  </div>
                  
                  <div class="timeline-item">
                    <div class="timeline-icon">
                      <span class="material-symbols-rounded">update</span>
                    </div>
                    <div class="timeline-content">
                      <h4>Last Updated</h4>
                      <p>{{ formatDate(requirement.updatedAt) }}</p>
                    </div>
                  </div>
                  
                  @if (requirement.deadline) {
                    <div class="timeline-item">
                      <div class="timeline-icon">
                        <span class="material-symbols-rounded">event</span>
                      </div>
                      <div class="timeline-content">
                        <h4>Deadline</h4>
                        <p>{{ formatDate(requirement.deadline) }}</p>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </aside>
          </div>
        } @else {
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading requirement details...</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .requirement-detail-container {
      padding-bottom: var(--space-8);
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-8);
    }
    
    .header-content h1 {
      font-size: 2rem;
      margin-bottom: var(--space-2);
    }
    
    .requirement-meta {
      display: flex;
      align-items: center;
      gap: var(--space-4);
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
    
    .posted-date {
      color: var(--color-neutral-500);
      font-size: 0.9rem;
    }
    
    .header-actions {
      display: flex;
      gap: var(--space-2);
    }
    
    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-6);
      
      @media (min-width: 1024px) {
        grid-template-columns: 2fr 1fr;
      }
    }
    
    .card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-6);
    }
    
    .card h2 {
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
    }
    
    .description {
      color: var(--color-neutral-700);
      margin-bottom: var(--space-6);
      line-height: 1.6;
    }
    
    .tech-details {
      display: grid;
      gap: var(--space-6);
      margin-bottom: var(--space-6);
    }
    
    .detail-group h3 {
      font-size: 1rem;
      margin-bottom: var(--space-2);
      color: var(--color-neutral-600);
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .tag {
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
      padding: var(--space-1) var(--space-2);
      
      border-radius: var(--radius-full);
      font-size: 0.875rem);
    }
    
    .requirement-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-neutral-200);
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
    
    .info-item .label {
      font-size: 0.875rem;
      color: var(--color-neutral-500);
    }
    
    .info-item .value {
      font-weight: 500;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .empty-state {
      text-align: center;
      padding: var(--space-6);
      color: var(--color-neutral-500);
    }
    
    .startups-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .startup-card {
      padding: var(--space-4);
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-lg);
    }
    
    .startup-header {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    .startup-logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      overflow: hidden;
    }
    
    .startup-logo img {
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
    
    .startup-info h3 {
      margin-bottom: var(--space-1);
    }
    
    .location {
      color: var(--color-neutral-500);
      font-size: 0.875rem;
    }
    
    .startup-desc {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin-bottom: var(--space-3);
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }
    
    .tech-tag {
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
    }
    
    .tech-tag.more {
      background: var(--color-neutral-200);
    }
    
    .startup-meta {
      display: flex;
      justify-content: space-between;
      color: var(--color-neutral-500);
      font-size: 0.875rem;
      margin-bottom: var(--space-3);
    }
    
    .startup-actions {
      display: flex;
      gap: var(--space-2);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: var(--space-4);
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-label {
      display: block;
      font-size: 0.875rem;
      color: var(--color-neutral-500);
      margin-bottom: var(--space-1);
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-primary-600);
    }
    
    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .timeline-item {
      display: flex;
      gap: var(--space-3);
    }
    
    .timeline-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full);
      background: var(--color-primary-100);
      color: var(--color-primary-600);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .timeline-content h4 {
      font-size: 0.9rem;
      margin-bottom: var(--space-1);
    }
    
    .timeline-content p {
      color: var(--color-neutral-500);
      font-size: 0.875rem;
      margin: 0;
    }
    
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-8);
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-primary-100);
      border-top-color: var(--color-primary-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class RequirementDetailComponent implements OnInit {
  requirement: Requirement | null = null;
  matchingStartups: StartupProfile[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private gccService: GccService,
    private startupService: StartupService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadRequirement(params['id']);
        this.loadMatchingStartups();
      }
    });
  }
  
  loadRequirement(id: string): void {
    this.gccService.getRequirement(id).subscribe(req => {
      this.requirement = req;
    });
  }
  
  loadMatchingStartups(): void {
    this.startupService.getStartups().subscribe(startups => {
      // In a real app, this would use a sophisticated matching algorithm
      // For demo, we're just showing all startups
      this.matchingStartups = startups;
    });
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  getCompanyInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
  
  editRequirement(): void {
    // Implement edit functionality
    console.log('Edit requirement:', this.requirement?.id);
  }
}