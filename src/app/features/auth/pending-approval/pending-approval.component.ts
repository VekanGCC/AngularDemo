import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pending-container">
      <div class="pending-card">
        <div class="pending-icon">
          <span class="material-symbols-rounded">pending</span>
        </div>
        <h1>Registration Under Review</h1>
        <p class="description">Thank you for registering on GCC-Startup Connect. Your account is currently pending approval by our admin team.</p>
        
        @if (user) {
          <div class="user-info">
            <div class="info-item">
              <span class="label">Name:</span>
              <span class="value">{{ user.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">Email:</span>
              <span class="value">{{ user.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">Account Type:</span>
              <span class="value">{{ user.role }}</span>
            </div>
            <div class="info-item">
              <span class="label">Status:</span>
              <span class="status pending">{{ user.approvalStatus }}</span>
            </div>
          </div>
        }
        
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Verification</h3>
              <p>Our admin team will verify your details</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Approval</h3>
              <p>Once approved, you'll receive an email notification</p>
            </div>
          </div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Access</h3>
              <p>You can then log in and access the platform</p>
            </div>
          </div>
        </div>
        
        <p class="note">The approval process usually takes 24-48 hours. We appreciate your patience.</p>
        
        <div class="actions">
          <button class="btn btn-secondary" (click)="logout()">Logout</button>
          <button class="btn btn-primary" (click)="checkStatus()">Check Status</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pending-container {
      min-height: calc(100vh - 72px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-6);
    }
    
    .pending-card {
      width: 100%;
      max-width: 600px;
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
      text-align: center;
    }
    
    .pending-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-6);
      width: 80px;
      height: 80px;
      background-color: var(--color-warning-100);
      color: var(--color-warning-500);
      border-radius: var(--radius-full);
    }
    
    .pending-icon span {
      font-size: 40px;
    }
    
    h1 {
      margin-bottom: var(--space-3);
      color: var(--color-neutral-900);
    }
    
    .description {
      color: var(--color-neutral-600);
      margin-bottom: var(--space-6);
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .user-info {
      background-color: var(--color-neutral-50);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      margin-bottom: var(--space-6);
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) 0;
      border-bottom: 1px solid var(--color-neutral-200);
    }
    
    .info-item:last-child {
      border-bottom: none;
    }
    
    .label {
      font-weight: 500;
      color: var(--color-neutral-600);
    }
    
    .value {
      color: var(--color-neutral-800);
    }
    
    .status {
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .status.pending {
      background-color: var(--color-warning-100);
      color: var(--color-warning-700);
    }
    
    .steps {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      margin: var(--space-6) 0;
      text-align: left;
    }
    
    .step {
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
    }
    
    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background-color: var(--color-primary-500);
      color: white;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.9rem;
      flex-shrink: 0;
    }
    
    .step-content {
      flex: 1;
    }
    
    .step-content h3 {
      font-size: 1rem;
      margin-bottom: var(--space-1);
    }
    
    .step-content p {
      color: var(--color-neutral-600);
      font-size: 0.9rem;
      margin-bottom: 0;
    }
    
    .note {
      color: var(--color-neutral-500);
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: var(--space-6);
    }
    
    .actions {
      display: flex;
      gap: var(--space-4);
      justify-content: center;
    }
    
    @media (max-width: 640px) {
      .pending-card {
        padding: var(--space-6) var(--space-4);
      }
    }
  `]
})
export class PendingApprovalComponent implements OnInit {
  user: User | null = null;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
  
  logout(): void {
    this.authService.logout();
  }
  
  checkStatus(): void {
    // In a real app, this would check with the backend for any status updates
    alert('Your account is still pending approval. Please check back later or contact support if this takes longer than expected.');
  }
}