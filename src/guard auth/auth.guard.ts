import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthServiceService } from 'src/Service/AuthService/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  console.log(authService.isLoggedIn())
  if (authService.isLoggedIn()) {
  
    return true;
  } else {
    router.navigate(['/Login']);
    return false;
  }
  return true;
};
