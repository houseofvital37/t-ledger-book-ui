import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/responseDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplier(params: {supplierId?: number, supplierName?: string, categoty?: string, cityId?:number, paginationEnable: boolean, page?: number, pageSize?: number}): Observable<ResponseDTO> {
    params = {
      ...params,
    };
    return this.http.get(`${environment.baseUrl}/supplier`, { params: params as any });
  }
  addSupplier(obj: {supplierName: string, supplierPhone: string, address: string, category: string, cityId: number}):Observable<ResponseDTO>{
    return this.http.post(`${environment.baseUrl}/supplier/add`, obj);
  }
  updateSupplier(obj: {supplierId:number,supplierName: string, supplierPhone: string, address: string, category: string, cityId: number}):Observable<ResponseDTO>{
    return this.http.put(`${environment.baseUrl}/supplier/update`, obj);
  }
}
