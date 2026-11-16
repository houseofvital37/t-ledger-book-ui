import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ConstantFilterVariable, FilterObject } from './filter';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LookupService } from '../../../services/lookup.service';
import { CustomersService } from '../../../services/customers.service';
import moment from 'moment';
import { differenceInCalendarDays } from 'date-fns';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SupplierService } from '../../../services/supplier.service';


@Component({
  selector: 'app-filter',
  imports: [
    CommonModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule

  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{
  @ViewChild('actionMenu') trigger!: MatMenuPanel | null | any;
  @Output() onSubmitEvent = new EventEmitter<any>()
  @Input() filters: FilterObject[] = [];
  @Input() updatedChips = [];
  @Input() showFilters: boolean = false;
  chips: { label: string, value: string }[] = [];

  today = new Date();
  disabledDate = (current: Date): boolean => differenceInCalendarDays(current, this.today) > 0;
  constructor(
    private lookupService: LookupService,
    private customersService: CustomersService,
    private suppliersService: SupplierService
   ) { }

    ngOnInit(): void {
    this.filters.forEach((d) => {
      switch (d.variable) {
        case ConstantFilterVariable.cityId:
            this.getCities(d);
            break;
      }
    }
    );
  }

  getCities(filter:any) {
    this.lookupService.getCities().subscribe(d => {
      if (d.statusCode?.toString().startsWith("20")) {
        filter.options = d.payload?.map((e:any) => { return { value: e.cityId, label: e.cityName } });
      }
    });
  }

  onDateChange(result: any, field: any): void {
    field.value = result;
  }

    onChipCancel(label: string,) {
    const idx = this.filters.findIndex(e => e.label === label);
    if (idx > -1) {
      this.filters[idx].check = false;
      if (this.filters[idx].variable == ConstantFilterVariable.date) {
        this.filters[idx].value = undefined
      } else {
        this.filters[idx].value = undefined;
      }
      // if(this.filters[idx].variable == ConstantFilterVariable.siteIds){
      //     this.companyCondition = true;
      // }
      // if(this.filters[idx].variable == ConstantFilterVariable.companyIds){
      //   this.companyCondition = false;
      // }
    }
    this.onSubmit();
  }

    clear() {
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
    this.chips = [];
    this.filters.forEach((field) => {
      field.check = false;
      field.value = undefined;
    });
    this.onSubmitEvent.emit({});
  }

  checkUpdated(field: FilterObject) {
    if (field.check === false) {
      field.value = null;
    }
  }
  
  optionClick(field: string, option: any) {
    // if (field == ConstantFilterVariable.siteIds) {
    //   var filter = this.filters.find(e=>e.variable==ConstantFilterVariable.siteIds);
    //   this.isLocationsLoading = true;
    //   this.getLocations(option);
    //  }

  }

  isValid(): boolean {
    for (var field of this.filters) {
      if (field.check && !field.value) {
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    this.chips = [];
    var obj: any = {};
    var label:any
    this.filters.forEach(field => {
       if (field.type == ConstantFilterVariable.date && field.value?.length) {
        this.chips.push({ label: field.label, value: `${moment(field.value[0]).format('L')} - ${moment(field.value[1]).format('L')}` });
        if(field?.variable == "pickupDate"){
          // obj['pickupDate'] = moment(field.value[0]).format("yyyy-MM-DD");
          // obj['pickupDateTo'] = moment(field.value[1]).format("yyyy-MM-DD");
        }else if(field?.variable == "returnDate" || field?.variable == "deliveryDate" ){
          // obj['deliveryReturnDate'] = moment(field.value[0]).format("yyyy-MM-DD");
          // obj['deliveryReturnDateTo'] = moment(field.value[1]).format("yyyy-MM-DD");
        }else{
          // obj['fromDate'] = moment(field.value[0]).format("yyyy-MM-DD");
          // obj['toDate'] = moment(field.value[1]).format("yyyy-MM-DD");
        }
      } else if (field.value && field.type !== ConstantFilterVariable.date) {
        obj[field.variable] = field.value.toString().trim();
        if (field.type == 'select') {
          if(field.value.length>0){
            obj[field.variable] = field.value;
            
          label = field.options?.filter(e => field.value.includes(e.value)).map(e=> e.label.toString() ).join(", ");
          
          }else{
            label = field.options?.find(e => e.value == field.value)?.label;
          }
          this.chips.push({ label: field.label, value:  label || field.value   });
        } else {
          this.chips.push({ label: field.label, value: field.value });
        }
      }
    });
    let outputObj={
      obj:obj,
      chips:this.chips
    }
    this.onSubmitEvent.emit(outputObj);
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
  }

}