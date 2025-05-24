import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GccService } from '../../../core/services/gcc.service';
import { StartupService } from '../../../core/services/startup.service';
import { Requirement } from '../../../core/models/requirement.model';
import { StartupProfile } from '../../../core/models/user.model';

@Component({
  selector: 'app-gcc-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="container">
        <header class="dashboard-header">
          <div>
            <h1>GCC Dashboard</h1>
            <p>Manage your requirements and find matching startups</p>
          </div>
          <div>
            <a routerLink="/gcc/requirements/create" class="btn btn-primary">
              <span class="material-symbols-rounded">add</span>
              Post New Requirement
            </a>
          </div>
        </header>
        
        <section class="dashboard-summary">
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">description</span>
            </div>
            <div class="summary-info">
              <h3>Active Requirements</h3>
              <p class="summary-value">{{ requirements.length }}</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">rocket_launch</span>
            </div>
            <div class="summary-info">
              <h3>Matching Startups</h3>
              <p class="summary-value">{{ matchingStartups.length }}</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">
              <span class="material-symbols-rounded">calendar_today</span>
            </div>
            <div class="summary-info">
              <h3>Upcoming Deadlines</h3>
              <p class="summary-value">{{ upcomingDeadlines }}</p>
            </div>
          </div>
        </section>
        
        <div class="dashboard-grid">
          <section class="requirements-section">
            <div class="section-header">
              <h2>Your Requirements</h2>
              <a routerLink="/gcc/requirements" class="view-all">View All</a>
            </div>
            
            @if (requirements.length === 0) {
              <div class="empty-state">
                <p>You haven't posted any requirements yet.</p>
                <a routerLink="/gcc/requirements/create" class="btn btn-primary btn-sm">Post Your First Requirement</a>
              </div>
            } @else {
              <div class="requirements-list">
                @for (req of requirements; track req.id) {
                  <a [routerLink]="['/gcc/requirements', req.id]" class="requirement-card">
                    <h3>{{ req.title }}</h3>
                    <p class="requirement-desc">{{ req.description | slice:0:120 }}{{ req.description.length > 120 ? '...' : '' }}</p>
                    <div class="requirement-meta">
                      <span class="status" [class]="req.status.toLowerCase()">{{ req.status }}</span>
                      @if (req.deadline) {
                        <span class="deadline">Deadline: {{ formatDate(req.deadline) }}</span>
                      }
                    </div>
                    <div class="tech-tags">
                      @for (tech of req.techStack.slice(0, 3); track tech) {
                        <span class="tech-tag">{{ tech }}</span>
                      }
                      @if (req.techStack.length > 3) {
                        <span class="tech-tag more">+{{ req.techStack.length - 3 }}</span>
                      }
                    </div>
                  </a>
                }
              </div>
            }
          </section>
          
          <section class="startups-section">
            <div class="section-header">
              <h2>Matching Startups</h2>
              <a routerLink="/gcc/startups" class="view-all">View All</a>
            </div>
            
            @if (matchingStartups.length === 0) {
              <div class="empty-state">
                <p>No matching startups found.</p>
                <a routerLink="/gcc/startups" class="btn btn-primary btn-sm">Browse All Startups</a>
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
                      <div>
                        <h3>{{ startup.companyName }}</h3>
                        <p class="startup-location">{{ startup.location }}</p>
                      </div>
                    </div>
                    
                    <p class="startup-desc">{{ startup.description | slice:0:100 }}{{ startup.description.length > 100 ? '...' : '' }}</p>
                    
                    <div class="tech-tags">
                      @for (tech of startup.techStack.slice(0, 3); track tech) {
                        <span class="tech-tag">{{ tech }}</span>
                      }
                      @if (startup.techStack.length > 3) {
                        <span class="tech-tag more">+{{ startup.techStack.length - 3 }}</span>
                      }
                    </div>
                    
                    <div class="startup-meta">
                      <span class="founding">Founded {{ startup.foundingYear }}</span>
                      <span class="team-size">{{ startup.teamSize }} team members</span>
                    </div>
                    
                    <a class="btn btn-secondary btn-sm btn-full">View Profile</a>
                  </div>
                }
              </div>
            }
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding-bottom: var(--space-8);
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--space-4);
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
    
    .dashboard-header .btn {
      display: flex;
      align-items: center;
      gap: var(--space-2);
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
      background-color: white;
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
      background-color: var(--color-primary-100);
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
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
      
      @media (min-width: 1024px) {
        grid-template-columns: 3fr 2fr;
      }
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
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      text-align: center;
      box-shadow: var(--shadow-sm);
    }
    
    .empty-state p {
      color: var(--color-neutral-500);
      margin-bottom: var(--space-4);
    }
    
    .requirements-list, .startups-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .requirement-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal);
      text-decoration: none;
      color: inherit;
      display: block;
    }
    
    .requirement-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .requirement-card h3 {
      font-size: 1.1rem;
      margin-bottom: var(--space-2);
    }
    
    .requirement-desc {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin-bottom: var(--space-3);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    
    .requirement-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-3);
    }
    
    .status {
      display: inline-block;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .status.open {
      background-color: var(--color-success-100);
      color: var(--color-success-700);
    }
    
    .status.in_progress {
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
    }
    
    .status.completed {
      background-color: var(--color-neutral-100);
      color: var(--color-neutral-700);
    }
    
    .status.closed {
      background-color: var(--color-neutral-200);
      color: var(--color-neutral-800);
    }
    
    .deadline {
      font-size: 0.8rem;
      color: var(--color-neutral-500);
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .tech-tag {
      display: inline-block;
      padding: var(--space-1) var(--space-2);
      background-color: var(--color-neutral-100);
      color: var(--color-neutral-700);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
    }
    
    .tech-tag.more {
      background-color: var(--color-neutral-200);
    }
    
    .startup-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal);
    }
    
    .startup-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .startup-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    .startup-logo {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      overflow: hidden;
      flex-shrink: 0;
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
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .startup-header h3 {
      font-size: 1.1rem;
      margin-bottom: var(--space-1);
    }
    
    .startup-location {
      font-size: 0.8rem;
      color: var(--color-neutral-500);
      margin: 0;
    }
    
    .startup-desc {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin-bottom: var(--space-3);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    
    .startup-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--color-neutral-500);
      margin: var(--space-3) 0;
    }
    
    .btn-full {
      width: 100%;
    }
    
    .btn-sm {
      padding: var(--space-1) var(--space-3);
      font-size: 0.875rem;
    }
  `]
})
export class GccDashboardComponent implements OnInit {
  requirements: Requirement[] = [];
  matchingStartups: StartupProfile[] = [];
  upcomingDeadlines = 0;
  
  constructor(
    private gccService: GccService,
    private startupService: StartupService
  ) {}
  
  ngOnInit(): void {
    this.loadRequirements();
    this.loadMatchingStartups();
  }
  
  loadRequirements(): void {
    this.gccService.getRequirements().subscribe(reqs => {
      this.requirements = reqs;
      this.countUpcomingDeadlines();
    });
  }
  
  loadMatchingStartups(): void {
    this.startupService.getStartups().subscribe(startups => {
      // In a real app, this would use a sophisticated matching algorithm
      // For demo, we're just returning all startups
      this.matchingStartups = startups;
    });
  }
  
  countUpcomingDeadlines(): void {
    const now = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(now.getDate() + 30);
    
    this.upcomingDeadlines = this.requirements.filter(req => {
      if (!req.deadline) return false;
      const deadlineDate = new Date(req.deadline);
      return deadlineDate > now && deadlineDate < thirtyDaysLater;
    }).length;
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