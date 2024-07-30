import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl = 'http://localhost:8888/api/v1/brands/getAll/brands';
  private addBrandUrl = 'http://localhost:8888/api/v1/admin/brands/add-brand';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addBrand(brand: any): Observable<any> {
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.addBrandUrl, brand, { headers });
  }

}