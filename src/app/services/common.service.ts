import { Injectable } from '@angular/core';
import { SuccessModalComponent } from '../shared/components/success-modal/success-modal.component';
import { ErrorModalComponent } from '../shared/components/error-modal/error-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  childData: any[] = [];
  mainRoute!: number ;


  setChildData(data: any , route: any){
    this.childData = data;
    this.mainRoute = route;
  }


  constructor( private dialog:MatDialog) {
   }




  successMessage(data:{message?:string, title?:string, buttonText?:string, buttonLink?:string}){
    this.dialog.open(SuccessModalComponent,{
      data:data,
      minWidth:"400px",
      maxWidth:"450px",
      autoFocus:false,
    }).afterClosed().subscribe((d:any)=>{
      
    })
  }

  errorMessage(data: { message?: string, title?: string, buttonText?: string, buttonLink?: string }) {
    this.dialog.open(ErrorModalComponent, {
      data: data,
      minWidth: "400px",
      maxWidth: "450px",
      autoFocus: false,
    }).afterClosed().subscribe((d: any) => {
      
    })
  }
}
