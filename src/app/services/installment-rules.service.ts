import { Injectable } from '@angular/core';
import { ResponseDTO } from '../constant/responseDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstallmentRulesService {

  constructor(private http: HttpClient) { }

    getInstallmentRules(filters?: {
    categoryInstallmentRuleId?: number;
    ruleName?: string;
    productCategoryId?: number;
    installmentRuleId?: number;
  }): Observable<ResponseDTO> {
  
    let params: any = {};
  
    if (filters?.categoryInstallmentRuleId !== undefined) {
      params.categoryInstallmentRuleId = filters.categoryInstallmentRuleId;
    }

    if (filters?.ruleName) {
      params.ruleName = filters.ruleName;
    }
  
    if (filters?.productCategoryId !== undefined) {
      params.productCategoryId = filters.productCategoryId;
    }
  
    if (filters?.installmentRuleId !== undefined) {
      params.installmentRuleId = filters.installmentRuleId;
    }
  
    return this.http.get<ResponseDTO>(
      `${environment.baseUrl}/category-installment-rule`,
      { params }
    );
  }
  
  addInstallmentRule(obj:{
      ruleName?: string,
      productCategoryId?: number,
      installmentPlanId?: number,
      advance?: number,
      percentage?: number
  }):Observable<ResponseDTO>{
      return this.http.post(`${environment.baseUrl}/category-installment-rule/add`, obj);
  }
  
  updateInstallmentRule(obj:{
      categoryInstallmentRuleId: number,
      ruleName?: string,
      productCategoryId?: number,
      installmentPlanId?: number,
      advance?: number,
      percentage?: number
  }):Observable<ResponseDTO>{
      return this.http.put(`${environment.baseUrl}/category-installment-rule/update`, obj);
  }
}
