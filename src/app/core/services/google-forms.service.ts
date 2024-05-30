import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleFormsService {
  private baseUrl = 'http://localhost:5001/api/v1'; // URL de tu backend

  constructor(private http: HttpClient) {}

  // getAttendanceBySubject(subject: string): Observable<any[]> {
  //   return this.http.get<any[]>(
  //     `${this.baseUrl}/attendance/${subject}`
  //   );
  // }

    getAttendanceAndQR(teacherId: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/attendance/${teacherId}`
    );
  }
}
