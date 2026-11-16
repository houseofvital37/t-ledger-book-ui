import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/responseDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(params: {customerId?: number, customerName?: string, categoty?: string, cityId?:number, paginationEnable: boolean, page?: number, pageSize?: number}): Observable<ResponseDTO> {
    params = {
      ...params,
    };
    return this.http.get(`${environment.baseUrl}/customer`, { params: params as any });
  }
  addCustomers(obj: {customerName: string, customerPhone: string, address: string, category: string, cityId: number}):Observable<ResponseDTO>{
    return this.http.post(`${environment.baseUrl}/customer/add`, obj);
  }
  updateCustomers(obj: {customerId:number,customerName: string, customerPhone: string, address: string, category: string, cityId: number}):Observable<ResponseDTO>{
    return this.http.put(`${environment.baseUrl}/customer/update`, obj);
  }
}
