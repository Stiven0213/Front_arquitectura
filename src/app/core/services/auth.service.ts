import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:5001/api/v1';

  constructor( private http: HttpClient ) { }

  login(code: string, password: string): Observable<any> {
    const body = { code: code, password: password };
    return this.http.post(this.URL + '/login', body);
  }
}
