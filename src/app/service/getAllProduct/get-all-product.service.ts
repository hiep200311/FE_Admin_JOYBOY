import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllProductService {
  private apiUrl = 'http://localhost:8888/api/v1/products';

  private apiAdminProduct = 'http://localhost:8888/api/v1/admin/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProductPage(page: number, size: number, categoryIds?: string, brandIds?: string, keyword?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (categoryIds) {
      params = params.set('categoryIds', categoryIds);
    }
    if (brandIds) {
      params = params.set('brandIds', brandIds);
    }
    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any>(`${this.apiUrl}/getAll`, { params });
  }

  searchProducts(keyword: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?keyword=${keyword}&pageNumber=${page}&pageSize=${size}`);
  }

  addProduct(product: any): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Lấy admin ID từ session storage
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Tạo đối tượng body với sản phẩm và adminId
    const body = {
      ...product,
      adminId: adminId 
    };
  
    // Gửi yêu cầu POST với body và headers
    return this.http.post<any>(`${this.apiAdminProduct}/add-product`, body, { headers });
  }
}                                                                                                                                                                                                         