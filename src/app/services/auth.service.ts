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

  logIn(username: string, password: string) {
    const url = `${this.BASE_URL}/login`;
    this.http
      .post<LoginResponse>(url, { username, password })
      .toPromise()
      .then(p => {
        if (p.success) {
          localStorage.setItem('token', p.token);
        }
        console.log(p);
      });
      console.log('In angular');
      console.log(this.getToken());
  }

  signUp(username: string, password: string) {
    const url = `${this.BASE_URL}/signup`;
    try {
        this.http
            .post<LoginResponse>(url, {username, password})
            .toPromise()
            .then(p => {
                if (p.success) {
                    localStorage.setItem('token', p.token);
                }
                console.log(p);
            });
    } catch (err) {
      console.log('What is up here!!');
      console.err(err);
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
