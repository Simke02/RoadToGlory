import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({ withCredentials: true });
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 && !request.url.includes("/auth/me")) {
          this.router.navigate(["/login"]);
        }
        return throwError(() => error);
      }),
    );
  }
}