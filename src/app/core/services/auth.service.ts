import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: "platform",
})
export class AuthService {
  private URL = 'http://localhost:5001/api/v1';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(code: string, password: string): Observable<any> {
    const body = { code, password };
    return this.http.post(this.URL + '/login', body);
  }

  register(user:User) {
    return this.http.post(this.URL + '/register', user);
  }
  
  logout(): void {
    this.isAuthenticated = false;
  }

  setAuthenticationStatus(status: boolean): void {
    this.isAuthenticated = status;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }


}
