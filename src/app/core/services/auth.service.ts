import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User, UserRole, ApprovalStatus } from '../models/user.model';
import { CommonService } from './common.service';

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
    private router: Router,
    private commonService: CommonService
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
    return this.commonService.login(email, password).pipe(
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
    return this.commonService.register(userData).pipe(
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
}