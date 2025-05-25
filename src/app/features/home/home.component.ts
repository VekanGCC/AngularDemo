import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Bridging Innovation <span>Between Global Capability Centers and Deep Tech Startups</span></h1>
            <p class="hero-subtitle">Connect, collaborate, and transform your business with cutting-edge technology solutions</p>
            <div class="hero-cta">
              <a routerLink="/auth/login" class="btn btn-primary">Get Started</a>
              <a href="#how-it-works" class="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="GCC and Startup Collaboration" />
          </div>
        </div>
      </section>

      <section id="how-it-works" class="how-it-works">
        <div class="container">
          <h2 class="section-title">How It Works</h2>
          <div class="steps">
            <div class="step">
              <div class="step-icon">1</div>
              <h3>Register Your Organization</h3>
              <p>Sign up as a Global Capability Center or a Deep Tech Startup and complete your profile</p>
            </div>
            <div class="step">
              <div class="step-icon">2</div>
              <h3>Get Verified</h3>
              <p>Our admin team will verify your details to ensure quality and authenticity</p>
            </div>
            <div class="step">
              <div class="step-icon">3</div>
              <h3>Connect & Collaborate</h3>
              <p>GCCs post requirements, startups showcase capabilities, and our AI helps with matching</p>
            </div>
            <div class="step">
              <div class="step-icon">4</div>
              <h3>Transform & Grow</h3>
              <p>Form valuable partnerships and drive innovation in your organization</p>
            </div>
          </div>
        </div>
      </section>

      <section class="for-gcc">
        <div class="container">
          <div class="section-content">
            <div class="section-text">
              <h2>For Global Capability Centers</h2>
              <p>Access a curated network of innovative deep tech startups to solve your most challenging business problems.</p>
              <ul class="feature-list">
                <li>Post specific technology requirements</li>
                <li>Discover startups with matching capabilities</li>
                <li>Leverage AI-powered matching to find the perfect fit</li>
                <li>Streamline your innovation sourcing process</li>
              </ul>
              <a routerLink="/auth/register/gcc" class="btn btn-primary">Join as a GCC</a>
            </div>
            <div class="section-image">
              <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Global Capability Center" />
            </div>
          </div>
        </div>
      </section>

      <section class="for-startup">
        <div class="container">
          <div class="section-content reverse">
            <div class="section-text">
              <h2>For Deep Tech Startups</h2>
              <p>Connect with Global Capability Centers looking for innovative solutions in your domain.</p>
              <ul class="feature-list">
                <li>Showcase your unique capabilities</li>
                <li>Access enterprise-level requirements</li>
                <li>Get discovered through AI-powered matching</li>
                <li>Scale your business with enterprise clients</li>
              </ul>
              <a routerLink="/auth/register/startup" class="btn btn-primary">Join as a Startup</a>
            </div>
            <div class="section-image">
              <img src="https://images.pexels.com/photos/8353790/pexels-photo-8353790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Deep Tech Startup" />
            </div>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">50+</div>
              <div class="stat-label">Global Capability Centers</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">200+</div>
              <div class="stat-label">Deep Tech Startups</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">100+</div>
              <div class="stat-label">Successful Matches</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">15+</div>
              <div class="stat-label">Technology Domains</div>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <h2>Ready to transform your business?</h2>
          <p>Join our platform today and connect with the right partners for your innovation journey.</p>
          <div class="cta-buttons">
            <a routerLink="/auth/register/gcc" class="btn btn-primary">Join as a GCC</a>
            <a routerLink="/auth/register/startup" class="btn btn-secondary">Join as a Startup</a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      overflow-x: hidden;
    }
    
    /* Hero section */
    .hero {
      padding: var(--space-8) 0 var(--space-16);
      background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .hero .container {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      
      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
        gap: var(--space-16);
      }
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: var(--space-4);
      color: var(--color-neutral-900);
    }
    
    .hero-title span {
      background: linear-gradient(90deg, var(--color-primary-600) 0%, var(--color-accent-500) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-6);
      line-height: 1.5;
    }
    
    .hero-cta {
      display: flex;
      gap: var(--space-4);
      margin-top: var(--space-6);
    }
    
    .hero-image {
      width: 100%;
      
      @media (min-width: 1024px) {
        width: 50%;
      }
      
      img {
        width: 100%;
        height: auto;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        transition: transform var(--transition-normal);
      }
      
      img:hover {
        transform: translateY(-4px);
      }
    }
    
    /* How it works */
    .how-it-works {
      padding: var(--space-16) 0;
    }
    
    .section-title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: var(--space-12);
      position: relative;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary-500) 0%, var(--color-accent-500) 100%);
      border-radius: var(--radius-full);
    }
    
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-6);
    }
    
    .step {
      background-color: white;
      padding: var(--space-6);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      text-align: center;
      transition: transform var(--transition-normal);
    }
    
    .step:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .step-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      margin: 0 auto var(--space-4);
    }
    
    /* For GCC and For Startups sections */
    .for-gcc, .for-startup {
      padding: var(--space-16) 0;
    }
    
    .for-gcc {
      background-color: var(--color-neutral-50);
    }
    
    .section-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      
      @media (min-width: 1024px) {
        flex-direction: row;
        align-items: center;
      }
    }
    
    .section-content.reverse {
      @media (min-width: 1024px) {
        flex-direction: row-reverse;
      }
    }
    
    .section-text, .section-image {
      width: 100%;
      
      @media (min-width: 1024px) {
        width: 50%;
      }
    }
    
    .section-text h2 {
      font-size: 2rem;
      margin-bottom: var(--space-4);
    }
    
    .section-text p {
      font-size: 1.125rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-6);
    }
    
    .feature-list {
      list-style-type: none;
      padding: 0;
      margin: 0 0 var(--space-6);
    }
    
    .feature-list li {
      padding-left: var(--space-6);
      margin-bottom: var(--space-3);
      position: relative;
    }
    
    .feature-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--color-success-500);
      font-weight: bold;
    }
    
    .section-image img {
      width: 100%;
      height: auto;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }
    
    /* Stats section */
    .stats {
      padding: var(--space-16) 0;
      background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-900) 100%);
      color: white;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: var(--space-6);
    }
    
    .stat-card {
      text-align: center;
      padding: var(--space-6);
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(8px);
      transition: transform var(--transition-normal);
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.15);
    }
    
    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: var(--space-2);
      background: linear-gradient(90deg, white 0%, var(--color-primary-200) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .stat-label {
      font-size: 1rem;
      color: var(--color-neutral-200);
    }
    
    /* CTA section */
    .cta {
      padding: var(--space-16) 0;
      text-align: center;
      background-color: var(--color-neutral-50);
    }
    
    .cta h2 {
      font-size: 2rem;
      margin-bottom: var(--space-4);
    }
    
    .cta p {
      font-size: 1.25rem;
      color: var(--color-neutral-600);
      margin-bottom: var(--space-8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-buttons {
      display: flex;
      gap: var(--space-4);
      justify-content: center;
    }
  `]
})
export class HomeComponent {}