import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseDTO } from '../constant/responseDto';
import { Observable } from 'rxjs';
import { createOrderDto } from '../constant/createOrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(params: {}): Observable<ResponseDTO> {
    params = {
      ...params,
    };
    return this.http.get(`${environment.baseUrl}/order-detail`, { params: params });
  }
  createOrder(createOrderDto: createOrderDto):Observable<ResponseDTO>{
      return this.http.post(`${environment.baseUrl}/order-master/add`, createOrderDto);
  }

}
