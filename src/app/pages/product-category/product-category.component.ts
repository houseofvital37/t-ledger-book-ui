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
import { ProductCategoryColumns} from '../columns';
import { ColumnsComponent } from '../../shared/components/columns/columns.component';
import { LookupService } from '../../services/lookup.service';
import { Pagination } from '../../constant/searchCriteria';
import { CommonService } from '../../services/common.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { ConstantFilterVariable, FilterObject, GetSelectedFilters } from '../../shared/components/filter/filter';
import { ProductCategoryService } from '../../services/product-category.service';
@Component({
  selector: 'app-product-category',
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
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {
  isLoading:boolean = false;
  productCategories:any[] = [];
  selectedProductCategoriesIds: number[] = []
  collapsePanel:any = {}
  // selectedOrderToShipperAssign:ORDER = undefined;
  isApiLoading!: boolean;
  errorMessage: any;
  successMessage: any;
  @Input() screenName!: string;
  actions!: any;
  columns = ProductCategoryColumns;
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
    private productCategoryService: ProductCategoryService,
    private lookupService:LookupService
    ) {
     }

  ngOnInit(): void {
     this.getProductCategories();
  }

  paginationSizeChange(size:number){
    this.pagination.page = 0;
    this.pagination.size = size;
    // this.getproductCategories();
  }

  paginationIndexChange(index:number){
    this.pagination.page = index -1;
    // this.getproductCategories();
  }

  addComments(data: any) {
    // this.matDialog.open(CommentDialogComponent, {
    //   autoFocus: false,
    //   data: {
    //     title: 'Comments',
    //     desc: `Add comment`,
    //     isLostAction: false,
    //     isDamageAction: true,
    //     order: data,
    //   },
    //   minWidth: "600px",
    //   maxWidth: "700px",
    //   maxHeight: "85vh",
    //   disableClose: false,
    //   hasBackdrop: true,
    //   backdropClass: 'modalBackground'
    // }).afterClosed().subscribe(response => { })
  }
  
  dataInvalid(order:any):boolean{
    // if(order?.customerPhone && order?.destinationCityId && order?.deliveryAddress){
    //   return false;
    // }else{
    //   return true;
    // }
    return false
  }
  getProductCategories(){
    this.isLoading = true;
    const search: any = {
      // paginationEnable: false,
      // page: this.pagination.page,
      // pageSize: this.pagination.size,
      // ...this.searchFilter,
    }
    this.productCategoryService.getProductCategories().subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.productCategories = d.payload.productCategories || [];
        this.pagination = {...this.pagination,...d?.pagination};
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
  // getCities(){
  //   this.lookupService.getCities().subscribe(d=>{
  //     if(d.statusCode.toString().startsWith("20")){
  //       this.cityList = d.payload || [];
  //       this.getproductCategories()
  //     }  
  //   })  
  // } 


  viewOrder(order:any, index:any, showComments:boolean = false) {
    // this.matDialog.open(ViewDetailsComponent, {
    //   autoFocus: false,
    //   data: { ...order, index, tab: showComments? 6 : 1,isOrder:true },
    //   minWidth: "950px",
    //   maxWidth: "950px",
    //   maxHeight: "85vh",
    //   minHeight: "500px",
    //   disableClose: false,
    // }).afterClosed().subscribe(action => {
      
    // });
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

  // performAction(orderBookIds: any[],action:string){
  //     this.isLoading = true;
  //     const selectedOrders = this.orders.filter((order: any) =>
  //       orderBookIds.includes(order.orderBookId)
  //     ).map((d: any) => {
  //       let obj = {
  //         orderBookId: d.orderBookId,
  //         customerName:d.customerName,
  //         customerPhone:d.customerPhone,
  //         destinationCityId:d.destinationCityId,
  //         deliveryAddress:d.deliveryAddress,
  //         orderWeight:d.orderWeight
  //       };
  //       obj['orderWeight']<0.5?obj['orderWeight']=0.5:'';
  //       return obj;
  //     });
  //     switch(action){
  //       case 'Confirm':
  //         // this.markConfirm(selectedOrders);
  //         break;
  //       case 'On-Hold':
  //         // this.markHold(selectedOrders);
  //         break;
  //       case 'Archive':
  //         // this.archiveOrder(selectedOrders);
  //         break;
  //       default:
  //         break;
  //     } 
  // }

  // areAnySelectedOrdersInvalid(): boolean {
  //   return this.selectedOrderIds.some(orderId => {
  //     const selectedOrder = this.orders.find(order => order.orderBookId === orderId);
  //     return !selectedOrder ||
  //       !selectedOrder.customerName ||
  //       !selectedOrder.customerPhone ||
  //       !selectedOrder.deliveryAddress ||
  //       !selectedOrder.destinationCityId
  //   });
  // }
  onCheckClicked(checked: boolean, productId: number) {
    if (checked) {
      this.selectedProductCategoriesIds.push(productId);
    } else {
      const idx = this.selectedProductCategoriesIds.indexOf(productId);
      if (idx > -1) {
        this.selectedProductCategoriesIds.splice(idx, 1);
      }
    }
  }

  onAllChecked(checked: boolean): void {   
    if (checked) {
      this.productCategories.forEach(e=>{
          this.selectedProductCategoriesIds.push(e.productId);
      });
    } else {
      this.selectedProductCategoriesIds = [];
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
    // this.getproductCategories();
  }
  getBadgeClass(column:string):string{ 
    return "Utils.getBadgeClass(column)";
  }

  ngOnDestroy(){
    // this.siteSubscription.unsubscribe();
  }
}

