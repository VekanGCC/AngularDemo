import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { pendingApprovalGuard } from './core/guards/pending-approval.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register/gcc',
        loadComponent: () => import('./features/auth/register/gcc-register.component').then(c => c.GccRegisterComponent)
      },
      {
        path: 'register/startup',
        loadComponent: () => import('./features/auth/register/startup-register.component').then(c => c.StartupRegisterComponent)
      },
      {
        path: 'pending-approval',
        loadComponent: () => import('./features/auth/pending-approval/pending-approval.component').then(c => c.PendingApprovalComponent),
        canActivate: [pendingApprovalGuard]
      }
    ]
  },
  {
    path: 'gcc',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/gcc/dashboard/dashboard.component').then(c => c.GccDashboardComponent)
      },
      {
        path: 'requirements',
        loadComponent: () => import('./features/gcc/requirements/requirements.component').then(c => c.RequirementsComponent)
      },
      {
        path: 'requirements/create',
        loadComponent: () => import('./features/gcc/requirements/create-requirement/create-requirement.component').then(c => c.CreateRequirementComponent)
      },
      {
        path: 'requirements/:id',
        loadComponent: () => import('./features/gcc/requirements/requirement-detail/requirement-detail.component').then(c => c.RequirementDetailComponent)
      },
      {
        path: 'startups',
        loadComponent: () => import('./features/gcc/startups/startups.component').then(c => c.StartupsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/gcc/profile/profile.component').then(c => c.GccProfileComponent)
      }
    ]
  },
  {
    path: 'startup',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/startup/dashboard/dashboard.component').then(c => c.StartupDashboardComponent)
      },
      {
        path: 'requirements',
        loadComponent: () => import('./features/startup/requirements/requirements.component').then(c => c.StartupRequirementsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/startup/profile/profile.component').then(c => c.StartupProfileComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(c => c.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/users/users.component').then(c => c.UsersComponent)
      },
      {
        path: 'approvals',
        loadComponent: () => import('./features/admin/approvals/approvals.component').then(c => c.ApprovalsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];