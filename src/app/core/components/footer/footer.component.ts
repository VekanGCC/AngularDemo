import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3 class="footer-logo">GCC-Startup Connect</h3>
            <p class="footer-tagline">Bridging Innovation Between Global Capability Centers and Deep Tech Startups</p>
          </div>
          
          <div class="footer-links">
            <div class="link-group">
              <h4>Platform</h4>
              <a routerLink="/">Home</a>
              <a routerLink="/auth/register">Register</a>
              <a routerLink="/auth/login">Login</a>
            </div>
            
            <div class="link-group">
              <h4>Resources</h4>
              <a href="#">How It Works</a>
              <a href="#">Success Stories</a>
              <a href="#">FAQ</a>
            </div>
            
            <div class="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 GCC-Startup Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-neutral-800);
      color: var(--color-neutral-300);
      padding: var(--space-10) 0 var(--space-6);
      margin-top: var(--space-10);
    }
    
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      
      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    
    .footer-brand {
      max-width: 400px;
    }
    
    .footer-logo {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
    }
    
    .footer-tagline {
      color: var(--color-neutral-400);
      font-size: 0.9rem;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: var(--space-8);
    }
    
    .link-group h4 {
      color: white;
      margin-bottom: var(--space-4);
      font-weight: 600;
    }
    
    .link-group a {
      display: block;
      color: var(--color-neutral-400);
      text-decoration: none;
      margin-bottom: var(--space-2);
      transition: color var(--transition-fast);
    }
    
    .link-group a:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-bottom {
      margin-top: var(--space-8);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-neutral-700);
      font-size: 0.9rem;
      color: var(--color-neutral-500);
      text-align: center;
    }
  `]
})
export class FooterComponent {}