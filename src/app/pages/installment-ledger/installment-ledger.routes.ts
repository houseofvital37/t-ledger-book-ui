import { Routes } from '@angular/router';
import { InstallmentLedgerComponent } from './installment-ledger.component';

export const INSTALLMENT_LEDGER_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: InstallmentLedgerComponent },
  // { path: 'add-ledger', component: AddSaleOrderComponent },
  // { path: 'edit-ledger/:orderMasterId', component: AddSaleOrderComponent }
];
