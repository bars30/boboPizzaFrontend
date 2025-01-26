import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const  accessToken = localStorage.getItem('accessToken');
  const  router = inject(Router);

  if (accessToken) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
