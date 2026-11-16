import { Component } from '@angular/core';
import { listOfColumns } from '../../../shared/models/listOfColumns.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LookupService } from '../../../services/lookup.service';
import { CommonService } from '../../../services/common.service';
import { CustomersService } from '../../../services/customers.service';

@Component({
  selector: 'app-add-customers',
  imports: [
    CommonModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    RouterModule,
    NzTableModule,
    NzSelectModule,
    NzMenuModule,
    NzDropDownModule

  ],
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.scss'
})
export class AddCustomersComponent {
  stationeryOrdersId!:number
  isLoading:boolean =false
  packageForm:any = new FormGroup({});
  basicDetail:any = new FormGroup({});
  siteSubscription: any;
  siteIds!: any[];
  locations: any;
  pmsAccountId!: string;
  defaultOrderRef:any;
  isSitesLoading: boolean = false;
  isLocationsLoading: boolean = false;
  // siteId:number
  // vendorLocationId:number
  listOfData: any[] = [];
  // stationeryTypes: any;
  stationerySubTypes: any;
  createdBy:string=''
  listOfColumns: listOfColumns[] = [
  //  { label: "Stationery Type", variable: 'stationeryType', isVisible: true ,},
  //  { label: "Quantity", variable: 'orderQuantity', isVisible: true ,class:'text-center font-semibold'},
  //  { label: "Amount", variable: 'orderAmount', isVisible: true ,class:'text-center font-semibold'},
  //  { label: "Tax", variable: 'orderTax', isVisible: true ,class:'text-center font-semibold'},
  //  { label: "Action", variable: 'orderTax', isVisible: true ,class:'text-center font-semibold'},

];
  stationeryOrderMasterId!: number;
  stationeryOrderDetail: any;
  siteId!: number;
  masterDetail: any;
  customerDetail: any;
  taxPercentage: any;
  cityList: any[] = [];
  countryList: any[] = [];
  customerId:number;
  
  constructor(
    private fb: FormBuilder,
    // private siteService:SitesService,
    // private vendorService:VendorService,
    // private stationaryService: StationeryService,
    // private userService:UserService,
    private lookupService: LookupService,
    private router:Router,
    private commonService: CommonService,
    private customersService: CustomersService,
    private activatedRoute:ActivatedRoute
    ) { 
      // this.createdBy = this.userService.getUserFullName()
      // this.pmsAccountId =  this.userService.getPmsAccountId()
      // this.taxPercentage = this.userService.getTaxPercentage()
      // this.defaultOrderRef = 'STS-'+this.pmsAccountId+moment(new Date()).format('YYMMDDhhmmss')
    // this.siteSubscription = this.siteService.sitesVar$.subscribe(sites=>{
    //   this.siteIds = [];
    //   if(sites.length){
    //     this.siteIds = sites
    //     }
    // });
    this.activatedRoute.params.subscribe(p=>{
      if(p['customerId']){
        this.customerId = Number(p['customerId']);
      }

    });
    

  }

  ngOnInit(): void {
    if(this.customerId){
      this.getSupplierDetail()
    }
    if(this.siteIds?.length){
    }
    this.getCities();
    this.createForm();
  }

  getCities(){
    this.lookupService.getCities().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.cityList = d.payload || [];
        // this.getCustomers()
      }  
    })  
  }
  getSupplierDetail(){
    let obj = {
      customerId:this.customerId,
      paginationEnable: false
    }
    this.customersService.getCustomers(obj).subscribe(d => {
          if (d.statusCode.toString().startsWith("20")) {
            this.customerDetail = d.payload[0];
            this.createForm()
          }
        },err => {
          if (err?.status?.toString() == "500") {
            this.commonService.errorMessage({ title: "Ops! Something went wrong. We are working on it and get it fixed soon." });
          } else {
            this.commonService.errorMessage({ title: err?.error?.status?.message || err?.error?.status?.detail || err?.message });
          }
        })
  
}
createForm(){
  this.basicDetail = this.fb.group({
    accountTitle: [this.customerDetail?.accountTitle || null,[Validators.required]],
    customerCode: [this.customerDetail?.customerCode || null,[Validators.required]],
    firstName:[this.customerDetail?.firstName || null,[Validators.required]],
    lastName:[this.customerDetail?.lastName || null],
    fatherName:[this.customerDetail?.fatherName || null],
    mobile:[this.customerDetail?.mobile || null,[Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
    mobile2:[this.customerDetail?.mobile2 || null,[Validators.minLength(11), Validators.maxLength(13)]],
    email:[this.customerDetail?.email || null],
    telephone:[this.customerDetail?.telephone || null,[Validators.minLength(11), Validators.maxLength(13)]],
    customerCategory:[this.customerDetail?.customerCategory || null,[Validators.required]],
    address:[this.customerDetail?.address || null,[Validators.required]],
    notes:[this.customerDetail?.notes || null],
    cityId:[this.customerDetail?.cityId || null,[Validators.required]]
  })
}
addCustomer() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    this.customersService.addCustomers(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New customer added successfully'});
        this.router.navigate(["/customers"]);
      }
    },err=>{
      this.isLoading = false
      if (err?.status?.toString() == "500") {
        this.commonService.errorMessage({ title: "Ops! Something went wrong. We are working on it and get it fixed soon." });
      } else {
        this.commonService.errorMessage({ title: err?.error?.status?.message || err?.error?.status?.detail || err?.message });
      }
    })
  }
}
updateCustomer() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      customerId: this.customerId,
      ...this.basicDetail.value,
    }
    this.customersService.updateCustomers(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'Supplier updated successfully'});
        this.router.navigate(["/customers"]);
      }
    },err=>{
      this.isLoading = false
      if (err?.status?.toString() == "500") {
        this.commonService.errorMessage({ title: "Ops! Something went wrong. We are working on it and get it fixed soon." });
      } else {
        this.commonService.errorMessage({ title: err?.error?.status?.message || err?.error?.status?.detail || err?.message });
      }
    })
  }
}
isSiteDisabled(): boolean {
  return this.listOfData.length > 0;
}

isLocationDisabled(): boolean {
  return this.listOfData.length > 0;
}

back(){
  history.back();
}
}
