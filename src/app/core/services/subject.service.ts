import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private URL = 'http://localhost:5001/api/v1';

  constructor(private http: HttpClient) {}


  getAllSubjects(): Observable<any> {
    return this.http.get(`${this.URL}/subjects`);
  }
  
  createSubject(name: string, qr: string): Observable<any> {
    const body = { name: name, qr: qr };
    return this.http.post(`${this.URL}/subjects`, body);
  }
}
