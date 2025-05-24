import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, UserRole, ApprovalStatus } from '../models/user.model';

interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  initAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.currentUserSubject.next(user);
        this.isLoggedIn.set(true);
      } catch (e) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    // In a real app, this would call an API endpoint
    return this.simulateApiCall<AuthResponse>({ 
      email, 
      password 
    }).pipe(
      tap(response => {
        if (response.user.approvalStatus !== ApprovalStatus.APPROVED) {
          this.setAuthState(response.user, response.token);
          this.router.navigate(['/auth/pending-approval']);
          return;
        }
        
        this.setAuthState(response.user, response.token);
        this.redirectBasedOnRole(response.user.role);
      }),
      map(response => response.user)
    );
  }
  
  register(userData: Partial<User>): Observable<User> {
    // In a real app, this would call an API endpoint
    return this.simulateApiCall<AuthResponse>(userData).pipe(
      tap(response => {
        this.setAuthState(response.user, response.token);
        this.router.navigate(['/auth/pending-approval']);
      }),
      map(response => response.user)
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  getCurrentUserRole(): UserRole | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }
  
  hasApproval(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.approvalStatus === ApprovalStatus.APPROVED : false;
  }

  isAdmin(): boolean {
    return this.getCurrentUserRole() === UserRole.ADMIN;
  }
  
  isGcc(): boolean {
    return this.getCurrentUserRole() === UserRole.GCC;
  }
  
  isStartup(): boolean {
    return this.getCurrentUserRole() === UserRole.STARTUP;
  }

  private setAuthState(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isLoggedIn.set(true);
  }

  private redirectBasedOnRole(role: UserRole): void {
    switch (role) {
      case UserRole.ADMIN:
        this.router.navigate(['/admin/dashboard']);
        break;
      case UserRole.GCC:
        this.router.navigate(['/gcc/dashboard']);
        break;
      case UserRole.STARTUP:
        this.router.navigate(['/startup/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
  
  // Mock API for demo purposes - this simulates backend responses
  private simulateApiCall<T>(data: any): Observable<T> {
    // In a real app, this would be replaced with actual HTTP calls
    if (data.email === 'admin@example.com') {
      return of({
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: UserRole.ADMIN,
          approvalStatus: ApprovalStatus.APPROVED,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token-admin'
      } as T);
    } else if (data.email === 'gcc@example.com') {
      return of({
        user: {
          id: '2',
          email: 'gcc@example.com',
          name: 'GCC User',
          role: UserRole.GCC,
          approvalStatus: ApprovalStatus.APPROVED,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token-gcc'
      } as T);
    } else if (data.email === 'startup@example.com') {
      return of({
        user: {
          id: '3',
          email: 'startup@example.com',
          name: 'Startup User',
          role: UserRole.STARTUP,
          approvalStatus: ApprovalStatus.APPROVED,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token-startup'
      } as T);
    } else if (data.email === 'pending@example.com') {
      return of({
        user: {
          id: '4',
          email: 'pending@example.com',
          name: 'Pending User',
          role: data.role || UserRole.STARTUP,
          approvalStatus: ApprovalStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token-pending'
      } as T);
    }
    
    // For new registrations
    if (data.role) {
      return of({
        user: {
          id: Math.random().toString(36).substring(2, 9),
          email: data.email,
          name: data.name,
          role: data.role,
          approvalStatus: ApprovalStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        token: 'mock-jwt-token-new-user'
      } as T);
    }
    
    return throwError(() => new Error('Invalid credentials'));
  }
}