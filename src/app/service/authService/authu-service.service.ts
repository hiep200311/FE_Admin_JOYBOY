import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  data: {
    token: string;
    refreshToken: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthuServiceService {

  private baseUrl = 'http://localhost:8888/api/v1/auth'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  logout(token: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, { token });
  }

}