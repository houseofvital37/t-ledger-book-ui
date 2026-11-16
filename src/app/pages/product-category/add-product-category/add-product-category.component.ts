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
import { ProductCategoryService } from '../../../services/product-category.service';
import { Product } from '../../../constant';

@Component({
  selector: 'app-add-product-category',
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
  templateUrl: './add-product-category.component.html',
  styleUrl: './add-product-category.component.scss'
})
export class AddProductCategoryComponent {
  isLoading:boolean =false
  basicDetail:any = new FormGroup({});
  productCategoryDetails: any;
  productCategoryId:number;
  
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private commonService: CommonService,
    private productCategoryService: ProductCategoryService,
    private activatedRoute:ActivatedRoute
    ) { 
    this.activatedRoute.params.subscribe(p=>{
      if(p['productCategoryId']){
        this.productCategoryId = Number(p['productCategoryId']);
      }

    });
    

  }

  ngOnInit(): void {
    this.createForm();
    if(this.productCategoryId){
      this.getproductCategoryDetails()
    }
    
  }

  getproductCategoryDetails(){
    let obj = {
      productCategoryId:this.productCategoryId,
    }
    this.productCategoryService.getProductCategories(obj).subscribe(d => {
          if (d.statusCode.toString().startsWith("20")) {
            this.productCategoryDetails = d.payload.productCategories[0];
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

// Creates new form with empty values....
createForm(){
  this.basicDetail = this.fb.group({
    productCategory:[null,[Validators.required]],
    status:[null,[Validators.required]],
  })
}

// Set Form with values when editing categories....
setFormData() {
  if (!this.productCategoryDetails) return;

  this.basicDetail.patchValue({
    productCategory: this.productCategoryDetails.productCategory,
    status: this.productCategoryDetails.status,
  });
}

addProductCategory() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      ...this.basicDetail.value,
    }
    this.productCategoryService.addProductCategory(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'New product category added successfully'});
        this.router.navigate(["/product-category"]);
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
updateProductCategory() {
  if(this.basicDetail.invalid){
    this.basicDetail.markAllAsTouched();
    this.commonService.errorMessage({title:'Please Fill the Red Highlighted Fields'})
  }else{
    this.isLoading =true
    let obj = {
      productCategoryId: this.productCategoryId,
      ...this.basicDetail.value,
    }
    this.productCategoryService.updateProductCategory(obj).subscribe(d => {
      if (d && d.statusCode?.toString().startsWith('20')) {
        this.isLoading = false
        this.commonService.successMessage({title:'Product Category updated successfully'});
        this.router.navigate(["/product-category"]);
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

back(){
  history.back();
}
}

