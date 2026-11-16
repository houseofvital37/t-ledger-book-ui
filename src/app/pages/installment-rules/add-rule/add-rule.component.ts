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
import { InstallmentRulesService } from '../../../services/installment-rules.service';

@Component({
  selector: 'app-add-rule',
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
  templateUrl: './add-rule.component.html',
  styleUrl: './add-rule.component.scss'
})
export class AddRuleComponent {
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
  ruleDetail: any;
  taxPercentage: any;
  cityList: any[] = [];
  categoryInstallmentRuleId:number;
  suppliersList: any[] = [];
  productCategories: any[] = [];
  installmentPlans: any[] = [];
  
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
    private activatedRoute:ActivatedRoute,
    private installmentRulesService: InstallmentRulesService
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
      if(p['categoryInstallmentRuleId']){
        this.categoryInstallmentRuleId = Number(p['categoryInstallmentRuleId']);
      }

    });
    

  }

  ngOnInit(): void {
    this.createForm();
    this.getProductCategories();
    this.getInstallmentPlans();
    if(this.categoryInstallmentRuleId){
      this.getRuleDetail()
    }
  }

  getProductCategories(){
    this.lookupService.getProductCategories().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.productCategories = d.payload;
      }
    })
  }

  getInstallmentPlans(){
    this.lookupService.getInstallmentPlans().subscribe(d=>{
      if(d.statusCode.toString().startsWith("20")){
        this.installmentPlans = d.payload;
      }
    })
  }

  getRuleDetail(){
    this.installmentRulesService.getInstallmentRules({categoryInstallmentRuleId: this.categoryInstallmentRuleId}).subscribe(d => {
          if (d.statusCode.toString().startsWith("20")) {
            this.ruleDetail = d.payload.categoryInstallmentRuleResponse[0];
            this.setFormData();
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
    ruleName:[null,[Validators.required]],
    productCategoryId:[ null,[Validators.required]],
    installmentPlanId:[ null,[Validators.required]],
    percentage:[ null,[Validators.required]],
    advance:[ null,[Validators.required]],
  })
}

// Set Form with values when editing rules....
setFormData() {
  if (!this.categoryInstallmentRuleId) return;

  this.basicDetail.patchValue({
    ruleName: this.ruleDetail.ruleName,
    productCategoryId: this.ruleDetail.productCategoryId,
    installmentPlanId: this.ruleDetail.installmentPlanId,
    percentage: this.ruleDetail.percentage,
    advance: this.ruleDetail.advance
  });
}

addRule() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading = true
    let obj = {
      ...this.basicDetail.value,
    }
    this.installmentRulesService.addInstallmentRule(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New rule added successfully'});
        this.router.navigate(["/installment-rules"]);
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
updateRule() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    // Explicitly convert to numbers
  obj.productCategoryId = Number(obj.productCategoryId);
  obj.installmentRuleId = Number(obj.installmentRuleId);
  obj.percentage = Number(obj.percentage);
  obj.advance = Number(obj.advance);
    this.installmentRulesService.updateInstallmentRule({categoryInstallmentRuleId: this.categoryInstallmentRuleId, ...obj}).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'Rule updated successfully'});
        this.router.navigate(["/installment-rules"]);
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

