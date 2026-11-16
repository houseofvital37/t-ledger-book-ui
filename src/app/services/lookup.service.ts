import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient,) { 

  }

  getCities():Observable<any>{
    return this.http.get(`${environment.baseUrl}/lookup/city`);
  }

  getProductCategories():Observable<any>{
    return this.http.get(`${environment.baseUrl}/lookup/product-category`);
  }

  getSuppliers():Observable<any>{
    return this.http.get(`${environment.baseUrl}/lookup/suppliers`);
  }

  getInstallmentPlans():Observable<any>{
    return this.http.get(`${environment.baseUrl}/installment-plan`);
  }
}
