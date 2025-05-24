import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  companyName: string;
  industry: string;
  location: string;
  size: string;
}

@Component({
  selector: 'app-gcc-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>Register as GCC</h1>
        <p>Join GCC-Startup Connect to find innovative deep tech solutions</p>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }
          
          <div class="form-section">
            <h2>Company Information</h2>
            
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
            
            <div class="form-group">
              <label for="industry">Industry</label>
              <select 
                id="industry" 
                formControlName="industry"
                [class.input-error]="submitted && f['industry'].errors"
              >
                <option value="">Select industry</option>
                <option value="Technology">Technology</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Telecommunications">Telecommunications</option>
              </select>
              @if (submitted && f['industry'].errors) {
                <div class="validation-error">Industry is required</div>
              }
            </div>
            
            <div class="form-row">
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
              
              <div class="form-group">
                <label for="size">Company Size</label>
                <select 
                  id="size" 
                  formControlName="size"
                  [class.input-error]="submitted && f['size'].errors"
                >
                  <option value="">Select size</option>
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
          </div>
          
          <div class="form-section">
            <h2>Contact Information</h2>
            
            <div class="form-group">
              <label for="name">Contact Person Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name"
                [class.input-error]="submitted && f['name'].errors"
              >
              @if (submitted && f['name'].errors) {
                <div class="validation-error">Name is required</div>
              }
            </div>
            
            <div class="form-group">
              <label for="email">Business Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email"
                [class.input-error]="submitted && f['email'].errors"
              >
              @if (submitted && f['email'].errors) {
                <div class="validation-error">
                  @if (f['email'].errors['required']) {
                    Email is required
                  } @else if (f['email'].errors['email']) {
                    Enter a valid email address
                  }
                </div>
              }
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password"
                [class.input-error]="submitted && f['password'].errors"
              >
              @if (submitted && f['password'].errors) {
                <div class="validation-error">
                  @if (f['password'].errors['required']) {
                    Password is required
                  } @else if (f['password'].errors['minlength']) {
                    Password must be at least 6 characters
                  }
                </div>
              }
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" [disabled]="loading">
            @if (loading) {
              <span class="loading-spinner"></span>
              Creating Account...
            } @else {
              Create GCC Account
            }
          </button>
        </form>
        
        <div class="auth-links">
          <p>Already have an account? <a routerLink="/auth/login">Log In</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: calc(100vh - 72px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
    }
    
    .register-card {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
      width: 100%;
      max-width: 600px;
      text-align: center;
    }
    
    .register-card h1 {
      margin-bottom: var(--space-2);
    }
    
    .register-card > p {
      color: var(--color-neutral-600);
      margin-bottom: var(--space-6);
    }
    
    .register-form {
      text-align: left;
      margin-bottom: var(--space-6);
    }
    
    .form-section {
      margin-bottom: var(--space-6);
      
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
    
    .btn-full {
      width: 100%;
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
    
    .auth-links {
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-neutral-200);
    }
    
    .auth-links p {
      margin: 0;
      color: var(--color-neutral-600);
    }
  `]
})
export class GccRegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      location: ['', [Validators.required]],
      size: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  get f() { return this.registerForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const formValue = this.registerForm.value;
    const registerData: RegisterData = {
      ...formValue,
      role: UserRole.GCC
    };
    
    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message || 'Registration failed';
        this.loading = false;
      }
    });
  }
}