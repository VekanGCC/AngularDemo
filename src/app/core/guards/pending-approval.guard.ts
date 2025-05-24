import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApprovalStatus } from '../models/user.model';

export const pendingApprovalGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn() && !authService.hasApproval()) {
    return true;
  }
  
  if (authService.isLoggedIn()) {
    // User is logged in and already approved, redirect to appropriate dashboard
    const role = authService.getCurrentUserRole();
    if (role === 'ADMIN') {
      router.navigate(['/admin/dashboard']);
    } else if (role === 'GCC') {
      router.navigate(['/gcc/dashboard']);
    } else if (role === 'STARTUP') {
      router.navigate(['/startup/dashboard']);
    } else {
      router.navigate(['/']);
    }
  } else {
    // User is not logged in
    router.navigate(['/auth/login']);
  }
  
  return false;
};