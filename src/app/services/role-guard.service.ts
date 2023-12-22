import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {CanActivate, Router} from "@angular/router";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    let canAccess = localStorage.getItem('isAdmin')

    console.log(canAccess)
    if (canAccess === null || !(canAccess.includes('true'))) {
      this.router.navigate(['/not-found']).then();
      return false;
    }

    return true;
  }
}
