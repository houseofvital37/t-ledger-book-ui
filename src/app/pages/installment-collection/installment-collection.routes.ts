import { Routes } from '@angular/router';
import { InstallmentCollectionComponent } from './installment-collection.component';

export const INSTALLMENT_COLLECTION_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: InstallmentCollectionComponent },
  // { path: 'add-ledger', component: AddSaleOrderComponent },
  // { path: 'edit-ledger/:orderMasterId', component: AddSaleOrderComponent }
];
