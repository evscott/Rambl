import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response';

@Injectable()
export class AuthService {
  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  getHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-access-token', this.getToken());
    return headers;
  }

  logIn(username: string, password: string) {
    const url = `${this.BASE_URL}/login`;
    try {
      this.http
        .post<AuthResponse>(url, { username, password })
        .toPromise()
        .then(p => {
          if (p.success) {
            localStorage.setItem('token', p.token);
          }
          console.log(p.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  signUp(username: string, password: string) {
    const url = `${this.BASE_URL}/signup`;
    try {
      this.http
        .post<AuthResponse>(url, { username, password })
        .toPromise()
        .then(p => {
          if (p.success) {
            localStorage.setItem('token', p.token);
          }
          console.log(p.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  signOut(): boolean {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }
}
