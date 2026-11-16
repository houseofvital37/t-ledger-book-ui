import { Routes } from '@angular/router';
import { SaleOrdersComponent } from './sale-orders.component';
import { AddSaleOrderComponent } from './add-sale-order/add-sale-order.component';

export const SALE_ORDERS_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: SaleOrdersComponent },
  { path: 'add-sale-order', component: AddSaleOrderComponent },
  { path: 'edit-sale-order/:orderMasterId', component: AddSaleOrderComponent }
];
