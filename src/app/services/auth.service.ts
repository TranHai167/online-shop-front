import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AppUser, AuthResponse} from "../models/app-user";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      // Reload the current page
      window.location.reload()
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if the token exists; otherwise, return false
  }

  // @ts-ignore
  get appUser$() {

  }

  login(credentials: any): Observable<HttpResponse<AuthResponse>> {
    return this.httpClient.post<HttpResponse<AuthResponse>>("http://localhost:8080/authenticate", credentials);
  }

  getUserDetail(): Observable<AppUser> {
    let userId = '';
    // @ts-ignore
    userId = localStorage.getItem('cartId');
    const params = new HttpParams()
      .set('userId', userId);
    return this.httpClient.get<AppUser>("http://localhost:8080/authenticate/get-user", {params})
  }
}
