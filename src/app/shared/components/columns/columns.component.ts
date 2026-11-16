import { Component, Input } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-columns',
  imports: [NzCheckboxModule, MatMenuModule,CommonModule,NzIconModule],
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.scss'
})
export class ColumnsComponent {
@Input() columns!: { label: string, variable: string, isVisible: boolean, class?: string }[];
  constructor() { }

  ngOnInit(): void {
  }
}
