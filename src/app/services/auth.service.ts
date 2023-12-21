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

  login(credentials: any): Observable<HttpResponse<AuthResponse>> {
    return this.httpClient.post<HttpResponse<AuthResponse>>("http://localhost:8080/api/authenticate", credentials);
  }

  getUserDetail(): Observable<AppUser> {
    let userId = '';
    // @ts-ignore
    userId = localStorage.getItem('cartId');
    const params = new HttpParams()
      .set('userId', userId);
    return this.httpClient.get<AppUser>("http://localhost:8080/api/authenticate/get-user", {params});
  }

  verifyOtp(otpNumber: string) {
    const params = new HttpParams()
      .set('otp', otpNumber);
    return this.httpClient.get<boolean>("http://localhost:8080/authenticate/verify-otp", {params});
  }

  createOtp(email: string, phoneNumber: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('phoneNumber', phoneNumber);
    return this.httpClient.get<any>("http://localhost:8080/authenticate/create-otp", {params});
  }

  register(user: any) {
    return this.httpClient.post<AuthResponse>("http://localhost:8080/api/register", user);
  }
}
