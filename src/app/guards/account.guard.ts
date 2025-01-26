import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const accountGuard: CanActivateFn = (route, state) => {
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);
  
  if (accessToken) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
