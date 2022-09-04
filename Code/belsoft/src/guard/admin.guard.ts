import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  checklogin: any;
  constructor(
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.checklogin = localStorage.getItem('login');
      this.checklogin = JSON.parse(this.checklogin);
      if(this.checklogin){
        return true;
      }
      else{
        this.router.navigate(['login'])
        return false;
      }
      
  }
  
}
