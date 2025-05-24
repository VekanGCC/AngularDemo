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
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h1>Create Account</h1>
        <p>Join GCC-Startup Connect to start collaborating</p>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }
          
          <div class="form-group">
            <label for="name">Full Name</label>
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
            <label for="email">Email</label>
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
          
          <div class="form-group">
            <label for="role">Account Type</label>
            <select 
              id="role" 
              formControlName="role"
              [class.input-error]="submitted && f['role'].errors"
            >
              <option value="">Select account type</option>
              <option [value]="UserRole.GCC">Global Capability Center</option>
              <option [value]="UserRole.STARTUP">Deep Tech Startup</option>
            </select>
            @if (submitted && f['role'].errors) {
              <div class="validation-error">Account type is required</div>
            }
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" [disabled]="loading">
            @if (loading) {
              <span class="loading-spinner"></span>
              Creating Account...
            } @else {
              Create Account
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
      max-width: 400px;
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
    
    .form-group {
      margin-bottom: var(--space-4);
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
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  UserRole = UserRole;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
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
    
    const { name, email, password, role } = this.registerForm.value;
    const registerData: RegisterData = { name, email, password, role };
    
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