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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ProductService } from '../../../services/product.service';
import { InstallmentRulesService } from '../../../services/installment-rules.service';
import { OrdersService } from '../../../services/orders.service';
import { createOrderDto } from '../../../constant/createOrderDto';

@Component({
  selector: 'app-add-sale-order',
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
    NzDropDownModule,
    NzCheckboxModule

  ],
  templateUrl: './add-sale-order.component.html',
  styleUrl: './add-sale-order.component.scss'
})
export class AddSaleOrderComponent {
  stationeryOrdersId!:number
  isLoading:boolean =false
  isCustomePrice: boolean = false;
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
  customerId:number;
  products: any[] = [];
  installmentRules: any[] = [];
  customers: any[] = [];
  
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
    private activatedRoute:ActivatedRoute,
    private productService: ProductService,
    private installmentRulesService: InstallmentRulesService,
    private orderService: OrdersService
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
      
    }
    
    this.getProducts();
    this.getCustomers();
    this.createForm();

    this.basicDetail.get('customePrice')?.valueChanges.subscribe(value => {
      console.log('Custome Price:', value);
      this.isCustomePrice = value;
    });
  }

  getProducts(){
    this.isLoading = true;
    this.productService.getProducts({paginationEnable: false}).subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.products = d.payload || [];
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
  }

  productChange(){
    const product = this.products.find(e => e.productId ==  this.basicDetail.get('productId')?.value);
    // if(!this.isCustomePrice){
      this.basicDetail.controls['productPrice'].setValue(product.salePrice);
    // }  
    this.basicDetail.controls['categoryInstallmentRuleId'].setValue(null);
    this.getInstallmentRules(product.productCategoryId);
  } 

  getInstallmentRules(productCategoryId:number){
    this.isLoading = true;
    this.installmentRulesService.getInstallmentRules({productCategoryId:Number(productCategoryId)}).subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.installmentRules = d.payload.categoryInstallmentRuleResponse || [];
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
  }

  getCustomers(){

    this.isLoading = true;
    this.customersService.getCustomers({paginationEnable: false}).subscribe(d=>{
     
      if(d.statusCode?.toString().startsWith("20")){
        this.customers = d.payload || [];
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
  }

  installmentRuleChange(){
    if(this.basicDetail.get('categoryInstallmentRuleId')?.value != null){
      const installmentRule = this.installmentRules.find(e => 
        e.categoryInstallmentRuleId ==  this.basicDetail.get(
          'categoryInstallmentRuleId')?.value);
      console.log(installmentRule);
      this.basicDetail.controls['percentage'].setValue(installmentRule.percentage);
      
      const productPrice = this.basicDetail.get('productPrice')?.value;
      const percentageAmount = Math.round((productPrice * installmentRule.percentage) / 100);
      console.log("Product Price: ", productPrice);
      console.log("Percentage Amount: ", percentageAmount);
      const totalFinalPrice = Math.round(Number(productPrice) + Number(percentageAmount));
      const advance = Math.round((Number(totalFinalPrice) * Number(installmentRule.advance)) / 100);
      const remainingAmount = Math.round(Number(totalFinalPrice) - Number(advance));
      const monthlyInstallment = Math.round(Number(remainingAmount) / installmentRule.totalInstallments);

      this.basicDetail.controls['totalInstallments'].setValue(installmentRule.installmentPlan);
      this.basicDetail.controls['percentage'].setValue(installmentRule.percentage);
      this.basicDetail.controls['finalPrice'].setValue(totalFinalPrice);
      this.basicDetail.controls['advance'].setValue(advance);
      this.basicDetail.controls['remainingAmount'].setValue(remainingAmount);
      this.basicDetail.controls['monthlyInstallment'].setValue(monthlyInstallment);
    }

  }

  getCities(){
    this.lookupService.getCities().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.cityList = d.payload || [];
        // this.getCustomers()
      }  
    })  
  }
createForm(){
  this.basicDetail = this.fb.group({
    productId: [null,[Validators.required]],
    customerId: [null,[Validators.required]],
    categoryInstallmentRuleId: [null,[Validators.required]],
    customePrice: [false,[Validators.required]],
    productPrice: [null,[Validators.required]],
    percentage: [null,[Validators.required]],
    advance: [null,[Validators.required]],
    finalPrice: [null,[Validators.required]],
    remainingAmount: [null,],
    totalInstallments: [null],
    monthlyInstallment: [null]

  })
}
addSaleOrder(){
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    const installmentRule = this.installmentRules.find(e => 
        e.categoryInstallmentRuleId ==  this.basicDetail.get(
          'categoryInstallmentRuleId')?.value);
    const product = this.products.find(e => e.productId ==  this.basicDetail.get('productId')?.value);
    
    let obj: createOrderDto = {
      customerId: this.basicDetail.get('customerId')?.value,
      installmentPlanId: installmentRule.installmentPlanId,
      orderDate: "2026-06-07T12:48:57.000Z",
      totalFinalPrice: Number(this.basicDetail.get('finalPrice')?.value),
      totalAdvance: Number(this.basicDetail.get('advance')?.value),
      totalRemaining: Number(this.basicDetail.get('remainingAmount')?.value),
      totalProfit: Math.round(Number(this.basicDetail.get('finalPrice')?.value) - Number(product.purchasePrice)),
      status: "Pending",
      invoiceNo: "12345",
      orderDetails:
        {
          productId: this.basicDetail.get('productId')?.value,
          quantity: 1,
          productPrice: Number(this.basicDetail.get('productPrice')?.value),
          markupAmount: Math.round((Number(this.basicDetail.get('productPrice')?.value) * Number(this.basicDetail.get('percentage')?.value)) / 100),
          markupPercentage: Number(this.basicDetail.get('percentage')?.value),
          finalPrice: Number(this.basicDetail.get('finalPrice')?.value),
          advanceAmount: Number(this.basicDetail.get('advance')?.value),
          remainingAmount: Number(this.basicDetail.get('remainingAmount')?.value),
          monthlyInstallmentAmount: Number(this.basicDetail.get('monthlyInstallment')?.value),
          profit: Math.round(Number(this.basicDetail.get('finalPrice')?.value) - Number(product.purchasePrice))
        }
    }
    this.orderService.createOrder(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New order created successfully'});
        this.router.navigate(["/sale-orders"]);
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

updateSaleOrder(){

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
