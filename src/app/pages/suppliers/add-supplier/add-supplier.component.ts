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
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-add-supplier',
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
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss'
})
export class AddSupplierComponent {
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
  supplierDetail: any;
  taxPercentage: any;
  cityList: any[] = [];
  supplierId:number;
  
  constructor(
    private fb: FormBuilder,
    // private siteService:SitesService,
    // private vendorService:VendorService,
    // private stationaryService: StationeryService,
    // private userService:UserService,
    private lookupService: LookupService,
    private router:Router,
    private commonService: CommonService,
    private suppliersService: SupplierService,
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
      if(p['supplierId']){
        this.supplierId = Number(p['supplierId']);
      }

    });
    

  }

  ngOnInit(): void {
    if(this.supplierId){
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
        // this.getSuppliers()
      }  
    })  
  }
  getSupplierDetail(){
    let obj = {
      supplierId:this.supplierId,
      paginationEnable: false
    }
    this.suppliersService.getSupplier(obj).subscribe(d => {
          if (d.statusCode.toString().startsWith("20")) {
            this.supplierDetail = d.payload[0];
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
    supplierName:[this.supplierDetail?.supplierName || null,[Validators.required]],
    supplierPhone:[this.supplierDetail?.supplierPhone || null,[Validators.required, Validators.minLength(11), Validators.maxLength(13)]],
    supplierCategory:[this.supplierDetail?.supplierCategory || null,[Validators.required]],
    address:[this.supplierDetail?.address || null,[Validators.required]],
    cityId:[this.supplierDetail?.cityId || null,[Validators.required]]
  })
}
addSupplier() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    this.suppliersService.addSupplier(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New supplier added successfully'});
        this.router.navigate(["/suppliers"]);
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
updateSupplier() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      supplierId: this.supplierId,
      ...this.basicDetail.value,
    }
    this.suppliersService.updateSupplier(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'Supplier updated successfully'});
        this.router.navigate(["/suppliers"]);
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
