import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStorageService } from '../services/auth.storage.service';

export const UnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authStorageService = inject(AuthStorageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authStorageService.removeToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
