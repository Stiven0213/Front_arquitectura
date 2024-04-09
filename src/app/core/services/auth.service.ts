import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:5001/api/v1';

  constructor(private http: HttpClient) {}

  login(code: string, password: string): Observable<any> {
    const body = { code, password };
    return this.http.post(this.URL + '/login', body);
  }

  // register(
  //   name: string,
  //   lastname: string,
  //   email: string,
  //   age: number,
  //   code_teacher: string
  // ) {
  //   const body = { name, lastname, email, age, code_teacher };
  //   return this.http.post(this.URL + '/register', body);
  // }

  register(user:any) {
    return this.http.post(this.URL + '/register', user);
  }
}
