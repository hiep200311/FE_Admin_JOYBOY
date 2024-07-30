import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8888/api/v1/admin/products/uploads';

  constructor(private http: HttpClient) { }

  uploadImages(productId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    // Retrieve the token from session storage
    const token = sessionStorage.getItem('token');

    // Create headers and include the token if it exists
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<any>(`${this.apiUrl}/${productId}`, formData, {
      headers: headers
    });
  }
}