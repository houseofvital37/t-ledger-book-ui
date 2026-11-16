import { Routes } from '@angular/router';
import { SuppliersComponent } from '../suppliers/suppliers.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';

export const SUPPLIERS_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: SuppliersComponent },
  { path: 'add-supplier', component: AddSupplierComponent },
  { path: 'edit-supplier/:supplierId', component: AddSupplierComponent }
];
