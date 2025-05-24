import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GccService } from '../../../core/services/gcc.service';
import { GccProfile } from '../../../core/models/user.model';

@Component({
  selector: 'app-gcc-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="profile-container">
      <div class="container">
        <header class="page-header">
          <h1>Company Profile</h1>
          <p>Manage your GCC profile information</p>
        </header>

        <div class="profile-card">
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
            @if (successMessage) {
              <div class="success-message">{{ successMessage }}</div>
            }
            
            @if (errorMessage) {
              <div class="error-message">{{ errorMessage }}</div>
            }
            
            <div class="form-section">
              <h2>Basic Information</h2>
              
              <div class="form-group">
                <label for="companyName">Company Name</label>
                <input 
                  type="text" 
                  id="companyName" 
                  formControlName="companyName"
                  [class.input-error]="submitted && f['companyName'].errors"
                >
                @if (submitted && f['companyName'].errors) {
                  <div class="validation-error">Company name is required</div>
                }
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="industry">Industry</label>
                  <input 
                    type="text" 
                    id="industry" 
                    formControlName="industry"
                    [class.input-error]="submitted && f['industry'].errors"
                  >
                  @if (submitted && f['industry'].errors) {
                    <div class="validation-error">Industry is required</div>
                  }
                </div>

                <div class="form-group">
                  <label for="size">Company Size</label>
                  <select 
                    id="size" 
                    formControlName="size"
                    [class.input-error]="submitted && f['size'].errors"
                  >
                    <option value="">Select company size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001-5000">1001-5000 employees</option>
                    <option value="5000+">5000+ employees</option>
                  </select>
                  @if (submitted && f['size'].errors) {
                    <div class="validation-error">Company size is required</div>
                  }
                </div>
              </div>

              <div class="form-group">
                <label for="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  formControlName="location"
                  [class.input-error]="submitted && f['location'].errors"
                >
                @if (submitted && f['location'].errors) {
                  <div class="validation-error">Location is required</div>
                }
              </div>
            </div>

            <div class="form-section">
              <h2>Company Details</h2>
              
              <div class="form-group">
                <label for="description">Company Description</label>
                <textarea 
                  id="description" 
                  formControlName="description" 
                  rows="5"
                  [class.input-error]="submitted && f['description'].errors"
                ></textarea>
                @if (submitted && f['description'].errors) {
                  <div class="validation-error">Description is required</div>
                }
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="website">Website</label>
                  <input 
                    type="url" 
                    id="website" 
                    formControlName="website"
                    placeholder="https://example.com"
                  >
                </div>

                <div class="form-group">
                  <label for="logo">Logo URL</label>
                  <input 
                    type="url" 
                    id="logo" 
                    formControlName="logo"
                    placeholder="https://example.com/logo.png"
                  >
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="resetForm()">Reset</button>
              <button type="submit" class="btn btn-primary" [disabled]="loading">
                @if (loading) {
                  <span class="loading-spinner"></span>
                  Saving...
                } @else {
                  Save Changes
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
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
    
    .profile-card {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
    }
    
    .profile-form {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .form-section {
      margin-bottom: var(--space-8);
      
      h2 {
        font-size: 1.25rem;
        margin-bottom: var(--space-4);
        padding-bottom: var(--space-2);
        border-bottom: 1px solid var(--color-neutral-200);
      }
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
    
    input,
    select,
    textarea {
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
    
    .input-error {
      border-color: var(--color-error-500);
    }
    
    .validation-error {
      color: var(--color-error-500);
      font-size: 0.875rem;
      margin-top: var(--space-1);
    }
    
    .success-message {
      background: var(--color-success-100);
      color: var(--color-success-700);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      text-align: center;
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
export class GccProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private gccService: GccService
  ) {
    this.profileForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      location: ['', [Validators.required]],
      size: ['', [Validators.required]],
      description: ['', [Validators.required]],
      website: [''],
      logo: ['']
    });
  }
  
  get f() { return this.profileForm.controls; }
  
  ngOnInit(): void {
    this.loadProfile();
  }
  
  loadProfile(): void {
    this.gccService.getProfile().subscribe(profile => {
      this.profileForm.patchValue({
        companyName: profile.companyName,
        industry: profile.industry,
        location: profile.location,
        size: profile.size,
        description: profile.description,
        website: profile.website,
        logo: profile.logo
      });
    });
  }
  
  onSubmit(): void {
    this.submitted = true;
    this.successMessage = null;
    this.errorMessage = null;
    
    if (this.profileForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.gccService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully';
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to update profile';
        this.loading = false;
      }
    });
  }
  
  resetForm(): void {
    this.submitted = false;
    this.successMessage = null;
    this.errorMessage = null;
    this.loadProfile();
  }
}