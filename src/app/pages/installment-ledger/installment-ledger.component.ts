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
import { InstallmentLedgerColumns, SaleOrdersColumns } from '../columns';
import { listOfColumns } from '../../shared/models/listOfColumns.interface';
import { ColumnsComponent } from '../../shared/components/columns/columns.component';
import { LookupService } from '../../services/lookup.service';
import { Pagination } from '../../constant/searchCriteria';
import { CustomersService } from '../../services/customers.service';
import { CommonService } from '../../services/common.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { ConstantFilterVariable, FilterObject, GetSelectedFilters } from '../../shared/components/filter/filter';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-installment-ledger',
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
  templateUrl: './installment-ledger.component.html',
  styleUrl: './installment-ledger.component.scss'
})
export class InstallmentLedgerComponent {
  isLoading:boolean = false;
  orders:any[] = [];

  customers:any[] = [];
  selectedOrdersIds: number[] = []

  siteIds: any[]=[];
  collapsePanel:any = {}
  shipperId:number = 0;
  // selectedOrderToShipperAssign:ORDER = undefined;
  isApiLoading!: boolean;
  errorMessage: any;
  successMessage: any;
  @Input() screenName!: string;
  actions!: any;
  columns = InstallmentLedgerColumns;
  @Output() updateEvent: EventEmitter<boolean> = new EventEmitter();
  pagination: Pagination = { pagination: 'enable', numberOfElements: 0, totalElements: 0, page: 0, size: 25 };
  searchText: string = "";
  searchFilter: any = {};
  filters: FilterObject[] = GetSelectedFilters([
    ConstantFilterVariable.customerName,
    ConstantFilterVariable.customerCnic,
    ConstantFilterVariable.cityId
  ]);
  showFilter: boolean = true;
  selectedOrderIds: number[] = [];
  selectedOrders: any[] = [];
  isOrderConfirmAction: boolean = false;
  cityList: any[] = [];
  siteSubscription:any;
  invalidOrders: any[]=[];
  validOrders:any[]=[];
  chips: any;
  constructor(
    // private matDialog: MatDialog,
    // private orderService: OrderService,
    private commonService: CommonService,
    // private userService: UserService,
    // private reportService: ReportService,
    private router: Router,
    // private siteService: SitesService,
    private customersService: CustomersService,
    private lookupService:LookupService,
    private orderService: OrdersService
    ) {
     }

  ngOnInit(): void {
    // this.getCities();
    this.getOrders();
  }

  paginationSizeChange(size:number){
    this.pagination.page = 0;
    this.pagination.size = size;
    this.getOrders();
  }

  paginationIndexChange(index:number){
    this.pagination.page = index -1;
    this.getOrders();
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
  getOrders(){

    this.isLoading = true;
    const search: any = {
      // ...this.pagination,
      page: 1,
      pageSize: 10,

    }
    this.orderService.getOrders(search).subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.orders = d.payload || [];
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
  getCities(){
    // this.lookupService.getCities().subscribe(d=>{
    //   if(d.statusCode.toString().startsWith("20")){
    //     this.cityList = d.payload || [];
    //     this.getCustomers()
    //   }  
    // })  
  } 


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

  performAction(orderBookIds: any[],action:string){
      this.isLoading = true;
      const selectedOrders = this.orders.filter((order: any) =>
        orderBookIds.includes(order.orderBookId)
      ).map((d: any) => {
        let obj = {
          orderBookId: d.orderBookId,
          customerName:d.customerName,
          customerPhone:d.customerPhone,
          destinationCityId:d.destinationCityId,
          deliveryAddress:d.deliveryAddress,
          orderWeight:d.orderWeight
        };
        obj['orderWeight']<0.5?obj['orderWeight']=0.5:'';
        return obj;
      });
      switch(action){
        case 'Confirm':
          // this.markConfirm(selectedOrders);
          break;
        case 'On-Hold':
          // this.markHold(selectedOrders);
          break;
        case 'Archive':
          // this.archiveOrder(selectedOrders);
          break;
        default:
          break;
      } 
  }

  areAnySelectedOrdersInvalid(): boolean {
    return this.selectedOrderIds.some(orderId => {
      const selectedOrder = this.orders.find(order => order.orderBookId === orderId);
      return !selectedOrder ||
        !selectedOrder.customerName ||
        !selectedOrder.customerPhone ||
        !selectedOrder.deliveryAddress ||
        !selectedOrder.destinationCityId
    });
  }
  onCheckClicked(checked: boolean, customerId: number) {
    if (checked) {
      this.selectedOrdersIds.push(customerId);
    } else {
      const idx = this.selectedOrdersIds.indexOf(customerId);
      if (idx > -1) {
        this.selectedOrdersIds.splice(idx, 1);
      }
    }
  }

  onAllChecked(checked: boolean): void {   
    if (checked) {
      this.orders.forEach(e=>{
          this.selectedOrdersIds.push(e.orderDetailId);
      });
    } else {
      this.selectedOrdersIds = [];
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
    this.getOrders();
  }

  bulkActionResponse(isComplete: boolean) {
    if (isComplete) {
      this.selectedOrders = [];
      this.selectedOrdersIds = [];
      // this.getOrders();
    }
    this.isOrderConfirmAction = false;
    this.getOrders();
  }

  getBadgeClass(column:string):string{ 
    return "Utils.getBadgeClass(column)";
  }

  ngOnDestroy(){
    // this.siteSubscription.unsubscribe();
  }
}
