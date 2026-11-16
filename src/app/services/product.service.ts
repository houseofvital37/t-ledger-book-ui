import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/responseDto';
import { environment } from '../../environments/environment';
import { Product } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(params: {productId?: number, productName?: string, sku?: string, paginationEnable: boolean, page?: number, pageSize?: number, sortBy?:string, direction?:string}): Observable<ResponseDTO> {
    params = {
      ...params,
    };
    return this.http.get(`${environment.baseUrl}/products`, { params: params as any });
  }

  addProduct(obj:Product):Observable<ResponseDTO>{
    return this.http.post(`${environment.baseUrl}/products/add`, obj);
  }
  updateProduct(productId: number, obj: Product):Observable<ResponseDTO>{
    return this.http.put(`${environment.baseUrl}/products/update/${productId}`, obj);
  }

}
