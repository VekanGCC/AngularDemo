import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GccService } from '../../../../core/services/gcc.service';
import { Requirement } from '../../../../core/models/requirement.model';

@Component({
  selector: 'app-create-requirement',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="create-requirement-container">
      <div class="container">
        <header class="page-header">
          <h1>Post New Requirement</h1>
          <p>Describe your technology requirement to find matching startups</p>
        </header>

        <div class="form-card">
          <form [formGroup]="requirementForm" (ngSubmit)="onSubmit()" class="requirement-form">
            @if (errorMessage) {
              <div class="error-message">{{ errorMessage }}</div>
            }

            <div class="form-group">
              <label for="title">Title</label>
              <input 
                type="text" 
                id="title" 
                formControlName="title" 
                placeholder="Enter a clear, concise title"
                [class.input-error]="submitted && f['title'].errors"
              >
              @if (submitted && f['title'].errors) {
                <div class="validation-error">Title is required</div>
              }
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea 
                id="description" 
                formControlName="description" 
                rows="6"
                placeholder="Describe your requirement in detail"
                [class.input-error]="submitted && f['description'].errors"
              ></textarea>
              @if (submitted && f['description'].errors) {
                <div class="validation-error">Description is required</div>
              }
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="industry">Industry</label>
                <select 
                  id="industry" 
                  formControlName="industry" 
                  multiple
                  [class.input-error]="submitted && f['industry'].errors"
                >
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="IoT">IoT</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
                @if (submitted && f['industry'].errors) {
                  <div class="validation-error">Select at least one industry</div>
                }
              </div>

              <div class="form-group">
                <label for="techStack">Tech Stack</label>
                <select 
                  id="techStack" 
                  formControlName="techStack" 
                  multiple
                  [class.input-error]="submitted && f['techStack'].errors"
                >
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Rust">Rust</option>
                  <option value="Go">Go</option>
                  <option value="TensorFlow">TensorFlow</option>
                  <option value="PyTorch">PyTorch</option>
                  <option value="AWS">AWS</option>
                  <option value="Azure">Azure</option>
                  <option value="GCP">GCP</option>
                </select>
                @if (submitted && f['techStack'].errors) {
                  <div class="validation-error">Select at least one technology</div>
                }
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="budget">Budget Range</label>
                <select 
                  id="budget" 
                  formControlName="budget"
                >
                  <option value="">Select budget range</option>
                  <option value="$10K - $50K">$10K - $50K</option>
                  <option value="$50K - $100K">$50K - $100K</option>
                  <option value="$100K - $250K">$100K - $250K</option>
                  <option value="$250K - $500K">$250K - $500K</option>
                  <option value="$500K+">$500K+</option>
                </select>
              </div>

              <div class="form-group">
                <label for="deadline">Deadline</label>
                <input 
                  type="date" 
                  id="deadline" 
                  formControlName="deadline"
                  [min]="minDate"
                >
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                @if (loading) {
                  <span class="loading-spinner"></span>
                  Posting...
                } @else {
                  Post Requirement
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .create-requirement-container {
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
    
    .form-card {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
    }
    
    .requirement-form {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .form-group {
      margin-bottom: var(--space-4);
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
      
      @media (min-width: 640px) {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
      color: var(--color-neutral-700);
    }
    
    input[type="text"],
    input[type="date"],
    textarea,
    select {
      width: 100%;
      padding: var(--space-3);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--radius-md);
      font-size: 1rem;
      transition: all var(--transition-fast);
    }
    
    textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    select[multiple] {
      height: 160px;
    }
    
    .input-error {
      border-color: var(--color-error-500);
    }
    
    .validation-error {
      color: var(--color-error-500);
      font-size: 0.875rem;
      margin-top: var(--space-1);
    }
    
    .error-message {
      background: var(--color-error-100);
      color: var(--color-error-700);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      text-align: center;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-4);
      margin-top: var(--space-6);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-neutral-200);
    }
    
    .loading-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
      margin-right: var(--space-2);
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class CreateRequirementComponent {
  requirementForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  minDate: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private gccService: GccService,
    private router: Router
  ) {
    this.requirementForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      industry: [[], [Validators.required]],
      techStack: [[], [Validators.required]],
      budget: [''],
      deadline: ['']
    });
    
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  
  get f() { return this.requirementForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    
    if (this.requirementForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.gccService.createRequirement(this.requirementForm.value).subscribe({
      next: () => {
        this.router.navigate(['/gcc/requirements']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to create requirement';
        this.loading = false;
      }
    });
  }
  
  cancel(): void {
    this.router.navigate(['/gcc/requirements']);
  }
}