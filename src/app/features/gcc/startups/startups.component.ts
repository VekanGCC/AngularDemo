import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StartupService } from '../../../core/services/startup.service';
import { StartupProfile } from '../../../core/models/user.model';

@Component({
  selector: 'app-startups',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="startups-container">
      <div class="container">
        <header class="page-header">
          <div>
            <h1>Find Startups</h1>
            <p>Discover innovative deep tech startups that match your requirements</p>
          </div>
        </header>

        <div class="filters-section">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search startups by name, tech stack, or industry"
              [(ngModel)]="searchTerm"
              (input)="filterStartups()"
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
          </div>
        </div>

        @if (filteredStartups.length === 0) {
          <div class="empty-state">
            <div class="empty-icon">
              <span class="material-symbols-rounded">search_off</span>
            </div>
            <h2>No Startups Found</h2>
            <p>Try adjusting your filters or search terms</p>
          </div>
        } @else {
          <div class="startups-grid">
            @for (startup of filteredStartups; track startup.id) {
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
                  <div class="meta-item">
                    <span class="label">Founded</span>
                    <span>{{ startup.foundingYear }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="label">Team Size</span>
                    <span>{{ startup.teamSize }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="label">Stage</span>
                    <span>{{ startup.stage }}</span>
                  </div>
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
  `,
  styles: [`
    .startups-container {
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
      background-color: var(--color-neutral-100);
      color: var(--color-neutral-700);
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .tag:hover {
      background-color: var(--color-neutral-200);
    }
    
    .tag.active {
      background-color: var(--color-primary-100);
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
    
    .startups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-4);
    }
    
    .startup-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--space-4);
      box-shadow: var(--shadow-md);
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
    
    .startup-meta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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
    
    .startup-actions {
      display: flex;
      gap: var(--space-2);
    }
    
    .btn-sm {
      padding: var(--space-1) var(--space-3);
      font-size: 0.875rem;
    }
  `]
})
export class StartupsComponent implements OnInit {
  startups: StartupProfile[] = [];
  filteredStartups: StartupProfile[] = [];
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
  
  selectedIndustries: string[] = [];
  selectedTechStacks: string[] = [];
  
  constructor(private startupService: StartupService) {}
  
  ngOnInit(): void {
    this.loadStartups();
  }
  
  loadStartups(): void {
    this.startupService.getStartups().subscribe(startups => {
      this.startups = startups;
      this.filterStartups();
    });
  }
  
  filterStartups(): void {
    this.filteredStartups = this.startups.filter(startup => {
      const matchesSearch = this.searchTerm === '' || 
        startup.companyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        startup.techStack.some(tech => tech.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        startup.industry.some(ind => ind.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesIndustry = this.selectedIndustries.length === 0 ||
        startup.industry.some(ind => this.selectedIndustries.includes(ind));
      
      const matchesTechStack = this.selectedTechStacks.length === 0 ||
        startup.techStack.some(tech => this.selectedTechStacks.includes(tech));
      
      return matchesSearch && matchesIndustry && matchesTechStack;
    });
  }
  
  toggleIndustry(industry: string): void {
    const index = this.selectedIndustries.indexOf(industry);
    if (index === -1) {
      this.selectedIndustries.push(industry);
    } else {
      this.selectedIndustries.splice(index, 1);
    }
    this.filterStartups();
  }
  
  toggleTechStack(tech: string): void {
    const index = this.selectedTechStacks.indexOf(tech);
    if (index === -1) {
      this.selectedTechStacks.push(tech);
    } else {
      this.selectedTechStacks.splice(index, 1);
    }
    this.filterStartups();
  }
  
  getCompanyInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}