import { Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { AddCustomersComponent } from './add-customers/add-customers.component';

export const CUSTOMERS_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: CustomersComponent },
  { path: 'add-customer', component: AddCustomersComponent },
  { path: 'edit-customer/:customerId', component: AddCustomersComponent }
];
