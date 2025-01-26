import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { loginGuard } from './guards/login.guard';
import { accountGuard } from './guards/account.guard';

export const routes: Routes = [
 {
  path: "",
  component: LayoutComponent,
  children: [
    {
      path: "",
     loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
     canActivate: [loginGuard]
    },
    {
     path: "login",
     loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
     canActivate: [accountGuard]
    },
    {
      path: "register",
      loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
      canActivate: [accountGuard]
     },
     {
      path: "forgot-password",
      loadComponent: () => import('./pages/forgot-pass/forgot-pass.component').then(m => m.ForgotPassComponent),
      canActivate: [accountGuard]
     },
     {
      path: "reset-password",
      loadComponent: () => import('./pages/reset-pass/reset-pass.component').then(m => m.ResetPassComponent),
      canActivate: [accountGuard]
     }
   ]
  }
]; 
