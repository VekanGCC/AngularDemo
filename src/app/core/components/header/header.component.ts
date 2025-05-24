import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <a routerLink="/" class="logo">
            <span class="logo-text">GCC-Startup Connect</span>
          </a>
          
          <nav class="nav">
            @if (authService.isLoggedIn()) {
              @if (authService.isGcc()) {
                <a routerLink="/gcc/dashboard" routerLinkActive="active">Dashboard</a>
                <a routerLink="/gcc/requirements" routerLinkActive="active">My Requirements</a>
                <a routerLink="/gcc/startups" routerLinkActive="active">Find Startups</a>
              } @else if (authService.isStartup()) {
                <a routerLink="/startup/dashboard" routerLinkActive="active">Dashboard</a>
                <a routerLink="/startup/requirements" routerLinkActive="active">Explore Requirements</a>
              } @else if (authService.isAdmin()) {
                <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
                <a routerLink="/admin/approvals" routerLinkActive="active">Approvals</a>
                <a routerLink="/admin/users" routerLinkActive="active">Users</a>
              }
            } @else {
              <a routerLink="/auth/login" routerLinkActive="active">Login</a>
              <a routerLink="/auth/register" routerLinkActive="active">Register</a>
            }
          </nav>
          
          @if (authService.isLoggedIn()) {
            <div class="user-menu">
              <button class="profile-button" (click)="toggleUserMenu()">
                <span class="user-name">{{ getUserName() }}</span>
                <span class="avatar">{{ getUserInitials() }}</span>
              </button>
              
              @if (showUserMenu) {
                <div class="dropdown-menu slide-up">
                  @if (authService.isGcc()) {
                    <a routerLink="/gcc/profile">My Profile</a>
                  } @else if (authService.isStartup()) {
                    <a routerLink="/startup/profile">My Profile</a>
                  }
                  <a (click)="logout()" class="logout-link">Logout</a>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--color-primary-700);
      text-decoration: none;
    }
    
    .logo-text {
      background: linear-gradient(90deg, var(--color-primary-600) 0%, var(--color-accent-500) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .nav {
      display: flex;
      gap: var(--space-6);
    }
    
    .nav a {
      color: var(--color-neutral-700);
      text-decoration: none;
      font-weight: 500;
      transition: color var(--transition-fast);
      position: relative;
    }
    
    .nav a:hover {
      color: var(--color-primary-600);
      text-decoration: none;
    }
    
    .nav a.active {
      color: var(--color-primary-600);
    }
    
    .nav a.active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-primary-600);
      border-radius: var(--radius-full);
    }
    
    .user-menu {
      position: relative;
    }
    
    .profile-button {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background: none;
      border: none;
      cursor: pointer;
      padding: var(--space-2);
    }
    
    .user-name {
      font-weight: 500;
      color: var(--color-neutral-700);
      
      @media (max-width: 640px) {
        display: none;
      }
    }
    
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--color-primary-100);
      color: var(--color-primary-700);
      font-weight: 600;
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: var(--shadow-lg);
      border-radius: var(--radius-md);
      padding: var(--space-2) 0;
      min-width: 180px;
      margin-top: var(--space-2);
    }
    
    .dropdown-menu a {
      display: block;
      padding: var(--space-3) var(--space-4);
      color: var(--color-neutral-700);
      text-decoration: none;
      transition: background-color var(--transition-fast);
    }
    
    .dropdown-menu a:hover {
      background-color: var(--color-neutral-50);
      color: var(--color-primary-600);
    }
    
    .logout-link {
      border-top: 1px solid var(--color-neutral-200);
      margin-top: var(--space-2);
      color: var(--color-error-500) !important;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .nav {
        gap: var(--space-4);
      }
    }
  `]
})
export class HeaderComponent {
  showUserMenu = false;
  
  constructor(public authService: AuthService) {}
  
  getUserName(): string {
    const currentUser = this.authService.currentUser$.subscribe;
    return 'User';
  }
  
  getUserInitials(): string {
    const currentUser = this.authService.currentUser$.subscribe;
    return 'U';
  }
  
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }
  
  logout(): void {
    this.authService.logout();
    this.showUserMenu = false;
  }
}