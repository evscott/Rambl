import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login-response';

@Injectable()
export class AuthService {
  private BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http
      .post<LoginResponse>(url, { username, password })
      .toPromise()
      .then(p => {
        if (p.success) {
          localStorage.setItem('token', p.token);
        }
        console.log(p);
      });
  }

  signUp(username: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/signup`;
    console.log('Beginning signup within angular');
    return this.http
      .post<LoginResponse>(url, { username, password })
      .toPromise()
      .then(p => {
        if (p.success) {
          localStorage.setItem('token', p.token);
        }
        console.log('Within signup promise');
        console.log(p);
      });
    console.log('Ending signup within angular');
  }

  signOut(): boolean {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return true;
    }
    return false;
  }
}
