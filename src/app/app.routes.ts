import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'customers', canActivate: [authGuard], loadChildren: () => import('./pages/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES) },
  { path: 'suppliers', canActivate: [authGuard], loadChildren: () => import('./pages/suppliers/suppliers.routes').then(m => m.SUPPLIERS_ROUTES) },
  { path: 'products', canActivate: [authGuard], loadChildren: () => import('./pages/products/products.routes').then(m => m.PRODUCTS_ROUTES) },
  { path: 'product-category', canActivate: [authGuard], loadChildren: () => import('./pages/product-category/product-category.routes').then(m => m.PRODUCT_CATEGORY_ROUTES) },
  { path: 'installment-rules', canActivate: [authGuard], loadChildren: () => import('./pages/installment-rules/rules.routes').then(m => m.INSTALLMENT_RULES_ROUTES) },
  { path: 'sale-orders', canActivate: [authGuard], loadChildren: () => import('./pages/sale-orders/sale-orders.routes').then(m => m.SALE_ORDERS_ROUTES) },
  { path: 'installment-ledger', canActivate: [authGuard], loadChildren: () => import('./pages/installment-ledger/installment-ledger.routes').then(m => m.INSTALLMENT_LEDGER_ROUTES) },
  { path: 'installment-collection', canActivate: [authGuard], loadChildren: () => import('./pages/installment-collection/installment-collection.routes').then(m => m.INSTALLMENT_COLLECTION_ROUTES) }
];
