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
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-products',
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
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss'
})
export class AddProductsComponent {
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
  productDetail: any;
  taxPercentage: any;
  cityList: any[] = [];
  productId:number;
  suppliersList: any[] = [];
  productCategories: any[] = [];
  
  constructor(
    private fb: FormBuilder,
    // private siteService:SitesService,
    // private vendorService:VendorService,
    // private stationaryService: StationeryService,
    // private userService:UserService,
    private lookupService: LookupService,
    private router:Router,
    private commonService: CommonService,
    private productsService: ProductService,
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
      if(p['productId']){
        this.productId = Number(p['productId']);
      }

    });
    

  }

  ngOnInit(): void {
    if(this.productId){
      this.getProductDetail()
    }
    this.getSupplierList();
    this.getProductCategories();
    this.createForm();
  }

  getProductCategories(){
    this.lookupService.getProductCategories().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.productCategories = d.payload;
      }
    })
  }

  getSupplierList(){
    this.lookupService.getSuppliers().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.suppliersList = d.payload;
      }
    })
  }

  getProductDetail(){
    let obj = {
      productId:this.productId,
      paginationEnable: false
    }
    this.productsService.getProducts(obj).subscribe(d => {
          if (d.statusCode.toString().startsWith("20")) {
            this.productDetail = d.payload[0];
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
    productName:[this.productDetail?.productName || null,[Validators.required]],
    productSku:[this.productDetail?.productSku || null,[Validators.required]],
    productCategoryId:[this.productDetail?.productCategoryId || null,[Validators.required]],
    salePrice:[this.productDetail?.salePrice || null,[Validators.required]],
    purchasePrice:[this.productDetail?.purchasePrice || null,[Validators.required]],
    supplierId:[this.productDetail?.supplierId || null,[Validators.required]],
    productDetail: [this.productDetail?.productDetail || null,[Validators.required]],
  })
}
addProduct() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    this.productsService.addProduct(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New product added successfully'});
        this.router.navigate(["/products"]);
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
updateProduct() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    // Explicitly convert to numbers
  obj.salePrice = Number(obj.salePrice);
  obj.purchasePrice = Number(obj.purchasePrice);
    this.productsService.updateProduct(this.productId,obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'Product updated successfully'});
        this.router.navigate(["/products"]);
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

