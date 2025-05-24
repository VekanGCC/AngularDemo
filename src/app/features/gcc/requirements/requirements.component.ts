import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GccService } from '../../../core/services/gcc.service';
import { Requirement } from '../../../core/models/requirement.model';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="requirements-container">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>My Requirements</h1>
            <p>Manage and track your posted requirements</p>
          </div>
          <div>
            <a routerLink="/gcc/requirements/create" class="btn btn-primary">
              <span class="material-symbols-rounded">add</span>
              Post New Requirement
            </a>
          </div>
        </header>

        @if (requirements.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <span class="material-symbols-rounded">description</span>
            </div>
            <h2>No Requirements Posted</h2>
            <p>Start by posting your first requirement to find matching startups.</p>
            <a routerLink="/gcc/requirements/create" class="btn btn-primary">Post Requirement</a>
          </div>
        } @else {
          <div class="requirements-grid">
            @for (req of requirements; track req.id) {
              <div class="requirement-card">
                <h3>{{ req.title }}</h3>
                <p class="requirement-desc">{{ req.description }}</p>
                
                <div class="tech-stack">
                  <h4>Tech Stack</h4>
                  <div class="tech-tags">
                    @for (tech of req.techStack; track tech) {
                      <span class="tech-tag">{{ tech }}</span>
                    }
                  </div>
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
                
                <div class="card-actions">
                  <a [routerLink]="['/gcc/requirements', req.id]" class="btn btn-secondary">View Details</a>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .requirements-container {
      padding-bottom: var(--space-8);
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-8);
    }
    
    .page-header h1 {
      font-size: 2rem;
      margin-bottom: var(--space-2);
    }
    
    .page-header p {
      color: var(--color-neutral-600);
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
      background: var(--color-primary-100);
      color: var(--color-primary-600);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-4);
    }
    
    .empty-icon span {
      font-size: 32px;
    }
    
    .empty-state h2 {
      margin-bottom: var(--space-2);
    }
    
    .empty-state p {
      color: var(--color-neutral-600);
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
    
    .requirement-card h3 {
      margin-bottom: var(--space-2);
      font-size: 1.25rem;
    }
    
    .requirement-desc {
      color: var(--color-neutral-600);
      margin-bottom: var(--space-4);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .tech-stack {
      margin-bottom: var(--space-4);
    }
    
    .tech-stack h4 {
      font-size: 0.875rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-2);
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .tech-tag {
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
    }
    
    .requirement-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-4);
      padding: var(--space-4) 0;
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
    
    .card-actions {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class RequirementsComponent implements OnInit {
  requirements: Requirement[] = [];
  
  constructor(private gccService: GccService) {}
  
  ngOnInit(): void {
    this.loadRequirements();
  }
  
  loadRequirements(): void {
    this.gccService.getRequirements().subscribe(reqs => {
      this.requirements = reqs;
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