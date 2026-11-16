import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/responseDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }

  getProductCategories(filters?: {
  status?: boolean;
  productCategoryId?: number;
  productCategory?: string;
}): Observable<ResponseDTO> {

  let params: any = {};

  if (filters?.status !== undefined) {
    params.status = filters.status;
  }

  if (filters?.productCategoryId !== undefined) {
    params.productCategoryId = filters.productCategoryId;
  }

  if (filters?.productCategory) {
    params.productCategory = filters.productCategory;
  }

  return this.http.get<ResponseDTO>(
    `${environment.baseUrl}/product-category`,
    { params }
  );
}

  addProductCategory(obj:{productCategory: string, status: boolean}):Observable<ResponseDTO>{
    return this.http.post(`${environment.baseUrl}/product-category/add`, obj);
  }
  updateProductCategory(obj:{productCategoryId: number, productCategory: string, status: boolean}):Observable<ResponseDTO>{
    return this.http.put(`${environment.baseUrl}/product-category/update`, obj);
  }
  // deleteProductCategory(productId: number, obj: Product):Observable<ResponseDTO>{
  //   return this.http.delete(`${environment.baseUrl}/products/update/${productId}`, obj);
  // }
}