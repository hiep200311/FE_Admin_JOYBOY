import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private baseUrl = 'http://localhost:8888/api/v1';
  

  constructor(private http: HttpClient) { }

  addAttributeType(attributeTypeName: string): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Lấy admin ID từ session storage
    const token = sessionStorage.getItem('token'); // Lấy token từ session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Tạo đối tượng body với attributeTypeName và adminId
    const body = {
      attribute_type_name: attributeTypeName,
      adminId: adminId 
    };

    // Gửi yêu cầu POST với body và headers
    return this.http.post<any>(`${this.baseUrl}/admin/attributes/add-type`, body, { headers });
  }

  getAllAttributeTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/attributes/getAll/attribute-type`);
  }

  getAllAttributeOptions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/attributes/getAll/attribute-option`);
  }

  addAttributeOption(attributeOption: { attribute_option_name: string; attribute_option_value: string; attribute_type_id: number }): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Get the admin ID from session storage
    const token = sessionStorage.getItem('token'); // Get the token from session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  
    const body = {
      ...attributeOption,
      adminId: adminId
    };

    // POST request to add a new attribute option
    return this.http.post<any>(`${this.baseUrl}/admin/attributes/add-option`, body, { headers });
  }

  addProductAttribute(productAttribute: { product_id: number; attribute_option_id: number[]; price: number; discount_price: number }): Observable<any> {
    const adminId = sessionStorage.getItem('adminId'); // Get the admin ID from session storage
    const token = sessionStorage.getItem('token'); // Get the token from session storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = {
      ...productAttribute,
      adminId: adminId
    };

    // POST request to add a new product attribute
    return this.http.post<any>(`${this.baseUrl}/admin/products/attribute`, body, { headers });
  }

  uploadImageProductAttribute(productId: number, attributeOptionId: number, file: File): Observable<any> {
    // Tạo FormData và thêm tệp tin vào FormData
    const formData: FormData = new FormData();
    formData.append('file', file);
  
    // Lấy token từ session storage
    const token = sessionStorage.getItem('token');
  
    // Tạo headers và thêm token nếu tồn tại
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Tạo URL cho phương thức upload image với productId và attributeOptionId
    const uploadUrl = `${this.baseUrl}/admin/products/uploads/${productId}/attribute-option/${attributeOptionId}`;
  
    return this.http.post<any>(uploadUrl, formData, { headers });
  }
}