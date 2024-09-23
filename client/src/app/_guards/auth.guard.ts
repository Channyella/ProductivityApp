import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  debugger;

  if (accountService.currentUser()) {
    return router.createUrlTree(['todolist', 'all']);
  }
  return true;
};
