import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ValidarLoginGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user: Usuario = JSON.parse(localStorage.getItem('usuario')!);
    if (user) {
      this.router.navigate(['intranet']);
      return false;
    }
    else {
      return true;
    }
  }
}
