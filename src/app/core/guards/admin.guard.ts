import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin()) {
    return true;
  }
  
  // Redirect to appropriate dashboard based on user role
  const role = authService.getCurrentUserRole();
  if (role === UserRole.GCC) {
    router.navigate(['/gcc/dashboard']);
  } else if (role === UserRole.STARTUP) {
    router.navigate(['/startup/dashboard']);
  } else {
    router.navigate(['/']);
  }
  
  return false;
};