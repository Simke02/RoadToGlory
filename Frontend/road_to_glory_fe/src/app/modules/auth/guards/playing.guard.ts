import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'

@Injectable({providedIn: 'root'})
export class PlayingGuard implements CanActivate{;
  constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const room_id = sessionStorage.getItem('room_id');
        if(!!room_id){
            return true;
        }
        else
            return this.router.createUrlTree(['/lobby']);
    }

}