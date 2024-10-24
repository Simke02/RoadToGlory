import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth_service:AuthService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     const token = sessionStorage.getItem('token')
     if(!token){
      return next.handle(req);
     }
     const modefiedReq = req.clone({
      setHeaders:{Authorization: `bearer ${token}`}
    })
    return next.handle(modefiedReq);
    
  }
}