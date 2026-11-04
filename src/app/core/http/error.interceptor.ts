import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const isLoginCall = req.url.endsWith('/auth/login');
      if (err.status === 401 && !isLoginCall) {
        auth.logout();
      }
      return throwError(() => err);
    }),
  );
};