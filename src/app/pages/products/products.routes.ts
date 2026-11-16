import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddProductsComponent } from './add-products/add-products.component';

export const PRODUCTS_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: ProductsComponent },
  { path: 'add-product', component: AddProductsComponent },
  { path: 'edit-product/:productId', component: AddProductsComponent }
];
