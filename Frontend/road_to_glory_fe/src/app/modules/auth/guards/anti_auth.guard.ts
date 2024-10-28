import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'

@Injectable({providedIn: 'root'})
export class AntiAuthGuard implements CanActivate{;
  constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = sessionStorage.getItem('token');
        if(token){
            return this.router.createUrlTree(['/home']);
        }
        else
            return true;
    }

}