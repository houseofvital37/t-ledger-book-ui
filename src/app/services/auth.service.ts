import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse<T> { payload: T; statusCode: number; message?: string; }
interface LoginResult { accessToken: string; tokenType: string; expiresIn: number; user: any; }
interface Company { id: number; title: string; code: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'ledger_access_token';
  private readonly companyKey = 'ledger_company_id';

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<{ user: any; companyId: number }> {
    return this.http.post<ApiResponse<{ authentication: LoginResult }>>(`${environment.baseUrl}/ledger/auth/login`, { username, password }).pipe(
      tap(response => sessionStorage.setItem(this.tokenKey, response.payload.authentication.accessToken)),
      switchMap(response => this.http.get<ApiResponse<{ companies: Company[] }>>(`${environment.baseUrl}/ledger/auth/companies`).pipe(
        map(companyResponse => {
          const companies = companyResponse.payload?.companies || [];
          if (!companies.length) throw new Error('This account has no active company access.');
          const savedCompanyId = Number(sessionStorage.getItem(this.companyKey));
          const selectedCompany = companies.find(company => company.id === savedCompanyId) || companies[0];
          sessionStorage.setItem(this.companyKey, String(selectedCompany.id));
          return { user: response.payload.authentication.user, companyId: selectedCompany.id };
        })
      ))
    );
  }

  accessToken(): string | null { return sessionStorage.getItem(this.tokenKey); }
  currentCompanyId(): number | null {
    const value = Number(sessionStorage.getItem(this.companyKey));
    return Number.isInteger(value) && value > 0 ? value : null;
  }
  isAuthenticated(): boolean { return Boolean(this.accessToken()); }
  logout(): void { sessionStorage.removeItem(this.tokenKey); sessionStorage.removeItem(this.companyKey); }
}
