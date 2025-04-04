import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStorageService } from '../services/auth.storage.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authStorageService = inject(AuthStorageService);
  const token = authStorageService.getToken();

  
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
