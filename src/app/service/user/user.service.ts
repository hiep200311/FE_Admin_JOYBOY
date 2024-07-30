import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8888/api/v1/admin/users'; // URL của API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
}