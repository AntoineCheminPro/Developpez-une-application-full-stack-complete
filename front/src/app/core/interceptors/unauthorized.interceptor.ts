import { HttpInterceptorFn } from '@angular/common/http';

export const UnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
