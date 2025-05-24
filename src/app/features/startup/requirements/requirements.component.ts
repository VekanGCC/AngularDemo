import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StartupService } from '../../../core/services/startup.service';
import { Requirement } from '../../../core/models/requirement.model';

@Component({
  selector: 'app-startup-requirements',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="requirements-container">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Browse Requirements</h1>
            <p>Discover opportunities that match your startup's capabilities</p>
          </div>
        </header>

        <div class="filters-section">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search requirements by title, description, or tech stack"
              [(ngModel)]="searchTerm"
              (input)="filterRequirements()"
            >
          </div>
          
          <div class="filter-tags">
            <div class="filter-group">
              <h3>Industry</h3>
              <div class="tags">
                @for (industry of industries; track industry) {
                  <button 
                    class="tag" 
                    [class.active]="selectedIndustries.includes(industry)"
                    (click)="toggleIndustry(industry)"
                  >
                    {{ industry }}
                  </button>
                }
              </div>
            </div>
            
            <div class="filter-group">
              <h3>Tech Stack</h3>
              <div class="tags">
                @for (tech of techStacks; track tech) {
                  <button 
                    class="tag" 
                    [class.active]="selectedTechStacks.includes(tech)"
                    (click)="toggleTechStack(tech)"
                  >
                    {{ tech }}
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

        @if (filteredRequirements.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <span class="material-symbols-rounded">search_off</span>
            </div>
            <h2>No Requirements Found</h2>
            <p>Try adjusting your filters or search terms</p>
          </div>
        } @else {
          <div class="requirements-grid">
            @for (req of filteredRequirements; track req.id) {
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
      </div>
    </div>
  `,
  styles: [`
    .requirements-container {
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
export class StartupRequirementsComponent implements OnInit {
  requirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  searchTerm = '';
  
  industries = [
    'AI/ML',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'Cloud',
    'Fintech',
    'Healthcare',
    'Manufacturing'
  ];
  
  techStacks = [
    'Python',
    'JavaScript',
    'Java',
    'C++',
    'Rust',
    'Go',
    'TensorFlow',
    'PyTorch',
    'AWS',
    'Azure',
    'GCP'
  ];
  
  statuses = [
    'OPEN',
    'IN_PROGRESS',
    'COMPLETED',
    'CLOSED'
  ];
  
  selectedIndustries: string[] = [];
  selectedTechStacks: string[] = [];
  selectedStatus: string | null = null;
  
  constructor(private startupService: StartupService) {}
  
  ngOnInit(): void {
    this.loadRequirements();
  }
  
  loadRequirements(): void {
    this.startupService.getRequirements().subscribe(reqs => {
      this.requirements = reqs;
      this.filterRequirements();
    });
  }
  
  filterRequirements(): void {
    this.filteredRequirements = this.requirements.filter(req => {
      const matchesSearch = this.searchTerm === '' || 
        req.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        req.techStack.some(tech => tech.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesIndustry = this.selectedIndustries.length === 0 ||
        req.industry.some(ind => this.selectedIndustries.includes(ind));
      
      const matchesTechStack = this.selectedTechStacks.length === 0 ||
        req.techStack.some(tech => this.selectedTechStacks.includes(tech));
      
      const matchesStatus = !this.selectedStatus ||
        req.status === this.selectedStatus;
      
      return matchesSearch && matchesIndustry && matchesTechStack && matchesStatus;
    });
  }
  
  toggleIndustry(industry: string): void {
    const index = this.selectedIndustries.indexOf(industry);
    if (index === -1) {
      this.selectedIndustries.push(industry);
    } else {
      this.selectedIndustries.splice(index, 1);
    }
    this.filterRequirements();
  }
  
  toggleTechStack(tech: string): void {
    const index = this.selectedTechStacks.indexOf(tech);
    if (index === -1) {
      this.selectedTechStacks.push(tech);
    } else {
      this.selectedTechStacks.splice(index, 1);
    }
    this.filterRequirements();
  }
  
  toggleStatus(status: string): void {
    this.selectedStatus = this.selectedStatus === status ? null : status;
    this.filterRequirements();
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