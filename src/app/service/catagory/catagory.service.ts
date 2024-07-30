import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
  private apiUrl = 'http://localhost:8888/api/v1/categories/getAll';
  private addCategoryUrl = 'http://localhost:8888/api/v1/admin/categories/add-category';
  private addImgCategoryUrl = 'http://localhost:8888/api/v1/admin/categories/uploads';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addCategory(category: any): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Lấy admin ID từ session storage
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = {
      ...category,
      adminId: adminId 
    };
    return this.http.post<any>(this.addCategoryUrl, body, { headers });
  }

  uploadImageCategory(categoryId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
  
    // Thêm tệp tin vào FormData
    formData.append('file', file);
  
    // Lấy token từ session storage
    const token = sessionStorage.getItem('token');
  
    // Tạo headers và thêm token nếu tồn tại
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Tạo URL cho phương thức upload image với categoryId
    const uploadUrl = `${this.addImgCategoryUrl}/${categoryId}`;
  
    return this.http.post<any>(uploadUrl, formData, {
      headers: headers
    });
  }
}