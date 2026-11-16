import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MatDialogModule } from '@angular/material/dialog';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CategoryInstallmentRuleColumns, ProductColumns} from '../columns';
import { ColumnsComponent } from '../../shared/components/columns/columns.component';
import { LookupService } from '../../services/lookup.service';
import { Pagination } from '../../constant/searchCriteria';
import { CommonService } from '../../services/common.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { ConstantFilterVariable, FilterObject, GetSelectedFilters } from '../../shared/components/filter/filter';
import { ProductService } from '../../services/product.service';
import { InstallmentRulesService } from '../../services/installment-rules.service';
@Component({
  selector: 'app-products',
  imports: [
    RouterLink,
    NzDatePickerModule,
    CommonModule,
    // IconsProviderModule,
    NzModalModule,
    NzDropDownModule,
    NzSpinModule,
    NzPaginationModule,
    NzBreadCrumbModule,
    ReactiveFormsModule,
    FormsModule,
    // MatNativeDateModule,
    // MatDatepickerModule,
    NzSelectModule,
    // NgxIntlTelInputModule,
    NzEmptyModule,
    NzDividerModule,
    NzCollapseModule,
    NzAvatarModule,
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    // SharedModule,
    NzDividerModule,
    NzInputModule,
    NzUploadModule,
    NzSpinModule,
    // HttpClientModule,
    MatDialogModule,
    NzCheckboxModule,
    NzTagModule,
    NzIconModule,
    ColumnsComponent,
    FilterComponent
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
  isLoading:boolean = false;
  installmentRules:any[] = [];
  selectedInstallmentRulesIds: number[] = []
  collapsePanel:any = {}
  // selectedOrderToShipperAssign:ORDER = undefined;
  isApiLoading!: boolean;
  errorMessage: any;
  successMessage: any;
  @Input() screenName!: string;
  actions!: any;
  columns = CategoryInstallmentRuleColumns;
  @Output() updateEvent: EventEmitter<boolean> = new EventEmitter();
  pagination: Pagination = { pagination: 'enable', numberOfElements: 0, totalElements: 0, page: 0, size: 25 };
  searchText: string = "";
  searchFilter: any = {};
  filters: FilterObject[] = GetSelectedFilters([
    ConstantFilterVariable.supplierName,                          
    ConstantFilterVariable.supplierCategory,
    ConstantFilterVariable.cityId
  ]);
  showFilter: boolean = true;
  cityList: any[] = [];
  siteSubscription:any;
  invalidOrders: any[]=[];
  validOrders:any[]=[];
  chips: any;
  constructor(
    // private matDialog: MatDialog,
    private commonService: CommonService,
    private router: Router,
    private installmentRulesService: InstallmentRulesService,
    ) {
     }

  ngOnInit(): void {
     this.getInstallmentRules();
  }

  paginationSizeChange(size:number){
    this.pagination.page = 0;
    this.pagination.size = size;
    this.getInstallmentRules();
  }

  paginationIndexChange(index:number){
    this.pagination.page = index -1;
    this.getInstallmentRules();
  }
  
  dataInvalid(order:any):boolean{
    // if(order?.customerPhone && order?.destinationCityId && order?.deliveryAddress){
    //   return false;
    // }else{
    //   return true;
    // }
    return false
  }
  getInstallmentRules(){
    this.isLoading = true;
    const search: any = {
      // paginationEnable: false,
      // page: this.pagination.page,
      // pageSize: this.pagination.size,
      // ...this.searchFilter,
    }
    this.installmentRulesService.getInstallmentRules(search).subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.installmentRules = d.payload.categoryInstallmentRuleResponse || [];
        console.log(d, "data");
        // this.pagination = {...this.pagination,...d?.pagination};
        this.isLoading = false;
      }
    },err => {
      this.isLoading = false;
      if (err?.status?.toString() == "500") {
        this.commonService.errorMessage({ title: "Ops! Something went wrong. We are working on it and get it fixed soon." });
      } else {
        this.commonService.errorMessage({ title: err?.error?.status?.message || err?.error?.status?.detail || err?.message });
      }
    })
    // this.updateEvent.emit(true);
  } 

  isValidSelected: boolean = false;
  confirmModal(orderBookIds:any[], action: string){
    // this.matDialog.open(ConfirmationModalComponent, {
    //   autoFocus: false,
    //   data: {
    //     title: 'Confirmation',
    //     desc: orderBookIds.length==1?`Are you sure you want to ${action} Order?`:`Are you sure you want to ${action} ${orderBookIds.length} Order(s) ?`,
    //     modalType: 'primary'
    //   },
    //   minWidth: "500px",
    //   maxWidth: "500px",
    //   maxHeight: "85vh",
    //   disableClose: false,
    //   hasBackdrop: true,
    //   backdropClass: 'modalBackground'
    // }).afterClosed().subscribe((response : any) => {
    //   if (response && response.event == 'submit') {
    //     if(action && action !== ''){
    //       this.performAction(orderBookIds,action);
    //     }
    //   }
    // });
  }

  onCheckClicked(checked: boolean, categoryInstallmentRuleId: number) {
    if (checked) {
      this.selectedInstallmentRulesIds.push(categoryInstallmentRuleId);
    } else {
      const idx = this.selectedInstallmentRulesIds.indexOf(categoryInstallmentRuleId);
      if (idx > -1) {
        this.selectedInstallmentRulesIds.splice(idx, 1);
      }
    }
  }

  onAllChecked(checked: boolean): void {   
    if (checked) {
      this.installmentRules.forEach(e=>{
          this.selectedInstallmentRulesIds.push(e.categoryInstallmentRuleId);
      });
    } else {
      this.selectedInstallmentRulesIds = [];
    }
  }

   onChipCancel(label:any) {
    const index = this.chips.indexOf(label);
    if (index !== -1) {
     this.chips.splice(index, 1);
    }
    const idx = this.filters.findIndex(e => e.label === label.label);
    if (idx > -1) {
      this.filters[idx].check = false;
      if (this.filters[idx].variable == ConstantFilterVariable.date) {
        this.filters[idx].value = undefined
      } else {
        this.filters[idx].value = undefined;
      }
    }
    let obj = {};
    this.filters.forEach(e=>{
      e.type!=ConstantFilterVariable.date&&e.value?obj[e.variable]=e.value:'';
      // if(e.type==ConstantFilterVariable.date && e.value?.length){
      //   obj['fromDate'] = moment(e.value[0]).format("yyyy-MM-DD");
      //   obj['toDate'] = moment(e.value[1]).format("yyyy-MM-DD");
      // }
    });
    this.applyFilter({obj:obj,chips:this.chips});
  }

  applyFilter($event:any) {
    $event.obj?this.searchFilter = $event.obj:this.searchFilter={};
    this.showFilter = false;
    this.chips= $event.chips
    this.getInstallmentRules();
  }
}

