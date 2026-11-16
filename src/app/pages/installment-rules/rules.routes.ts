import { Routes } from '@angular/router';
import { RulesComponent } from './rules.component';
import { AddRuleComponent } from './add-rule/add-rule.component';

export const INSTALLMENT_RULES_ROUTES: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full'  },
  { path: 'logs', component: RulesComponent },
  { path: 'add-rule', component: AddRuleComponent },
  { path: 'edit-rule/:categoryInstallmentRuleId', component: AddRuleComponent }
];
