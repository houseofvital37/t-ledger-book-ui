import { Routes } from '@angular/router';
import { ProductCategoryComponent } from './product-category.component';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';

export const PRODUCT_CATEGORY_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: ProductCategoryComponent },
  { path: 'add-product-category', component: AddProductCategoryComponent },
  { path: 'edit-product-category/:productCategoryId', component: AddProductCategoryComponent }
];
