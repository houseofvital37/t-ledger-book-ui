import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message?:string, title?:string, buttonText?:string, buttonLink?:string},
    private dialog:MatDialogRef<SuccessModalComponent>,
    private router:Router
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.closeModal()
    },3*1000)
  }

  closeModal(){
    this.dialog.close(true);
  }

  navigateTo(){
    this.router.navigate([this.data.buttonLink]);
    this.dialog.close(true);
  }
}
