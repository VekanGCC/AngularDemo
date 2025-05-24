import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Welcome Back</h1>
        <p>Log in to your account to continue</p>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }
          
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
              <div class="validation-error">Password is required</div>
            }
          </div>
          
          <button type="submit" class="btn btn-primary btn-full" [disabled]="loading">
            @if (loading) {
              <span class="loading-spinner"></span>
              Logging in...
            } @else {
              Log In
            }
          </button>
        </form>
        
        <div class="auth-links">
          <p>Don't have an account? <a routerLink="/auth/register">Register</a></p>
        </div>
        
        <div class="demo-accounts">
          <p><strong>Demo Accounts:</strong></p>
          <div class="demo-account" (click)="fillDemoAccount('admin&#64;example.com')">
            Admin: admin&#64;example.com
          </div>
          <div class="demo-account" (click)="fillDemoAccount('gcc&#64;example.com')">
            GCC: gcc&#64;example.com
          </div>
          <div class="demo-account" (click)="fillDemoAccount('startup&#64;example.com')">
            Startup: startup&#64;example.com
          </div>
          <div class="demo-account" (click)="fillDemoAccount('pending&#64;example.com')">
            Pending: pending&#64;example.com
          </div>
          <p class="demo-note">Password: "password" for all accounts</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: calc(100vh - 72px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
    }
    
    .login-card {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    
    .login-card h1 {
      margin-bottom: var(--space-2);
    }
    
    .login-card > p {
      color: var(--color-neutral-600);
      margin-bottom: var(--space-6);
    }
    
    .login-form {
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
      padding: var(--space-4) 0;
      border-bottom: 1px solid var(--color-neutral-200);
      margin-bottom: var(--space-4);
    }
    
    .auth-links p {
      margin: 0;
      color: var(--color-neutral-600);
    }
    
    .demo-accounts {
      text-align: left;
    }
    
    .demo-account {
      padding: var(--space-2);
      margin: var(--space-1) 0;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }
    
    .demo-account:hover {
      background-color: var(--color-neutral-100);
    }
    
    .demo-note {
      font-size: 0.875rem;
      color: var(--color-neutral-500);
      margin-top: var(--space-2);
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  get f() { return this.loginForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      error: (error) => {
        this.errorMessage = error.message || 'Login failed';
        this.loading = false;
      }
    });
  }
  
  fillDemoAccount(email: string): void {
    this.loginForm.patchValue({
      email,
      password: 'password'
    });
  }
}