import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const newReq: HttpRequest<unknown> = req.clone({
    url: req.url,
    withCredentials: true
  });
  return next(newReq);
};
